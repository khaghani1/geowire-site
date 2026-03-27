// /api/worldbank.js — Vercel serverless proxy for World Bank commodity prices
// Free, no API key required.
// Uses the World Bank Pink Sheet commodity price data (monthly updates).
// Also fetches FRED series for higher-frequency oil/gas prices.
// Docs: https://datahelpdesk.worldbank.org/knowledgebase/articles/898581

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  // Query params:
  //   ?commodity=oil    → single commodity
  //   ?commodities=oil,wheat,natgas  → multiple
  //   (default)         → GeoWire full commodity bundle
  const { commodity, commodities } = req.query;

  // World Bank Pink Sheet commodity indicator codes
  // https://data.worldbank.org/indicator?tab=featured
  const COMMODITIES = {
    oil:         { code: 'PCOILBRENTSPOT', label: 'Brent Crude Oil',   unit: '$/bbl',  fred: 'DCOILBRENTEU'  },
    wti:         { code: 'PCOILWTIUSDM',   label: 'WTI Crude Oil',     unit: '$/bbl',  fred: 'DCOILWTICO'    },
    natgas_eu:   { code: 'PNGASEUUSDM',    label: 'Natural Gas (EU)',   unit: '$/MMBtu',fred: null            },
    natgas_us:   { code: 'PNGASHHGBTUD',   label: 'Natural Gas (HH)',   unit: '$/MMBtu',fred: 'DHHNGSP'       },
    wheat:       { code: 'PWHEAMTUSDM',    label: 'Wheat (US HRW)',     unit: '$/mt',   fred: null            },
    corn:        { code: 'PMAIZMTUSDM',    label: 'Corn',               unit: '$/mt',   fred: null            },
    fertilizer:  { code: 'PFERTI',         label: 'Fertilizer Index',   unit: 'Index',  fred: null            },
    aluminum:    { code: 'PALUMUSDM',      label: 'Aluminum',           unit: '$/mt',   fred: null            },
    copper:      { code: 'PCOPPUSDM',      label: 'Copper',             unit: '$/mt',   fred: null            },
    gold:        { code: 'PGOLDUSDM',      label: 'Gold',               unit: '$/troy oz', fred: null         },
    shipping:    { code: 'PNRG',           label: 'Energy Index',       unit: 'Index',  fred: null            },
  };

  const WB_BASE = 'https://api.worldbank.org/v2/country/all/indicator';
  const FRED_BASE = 'https://api.stlouisfed.org/fred/series/observations';
  const FRED_KEY = process.env.FRED_KEY || '';

  // Fetch a single World Bank series — returns { value, date, previousValue }
  async function fetchWB(code) {
    try {
      const url = `${WB_BASE}/${encodeURIComponent(code)}?format=json&mrv=3&per_page=3`;
      const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!r.ok) return null;
      const [meta, data] = await r.json();
      // Filter to only rows with actual values, sorted newest first
      const valid = (data || []).filter(d => d.value !== null).sort((a, b) => b.date.localeCompare(a.date));
      if (!valid.length) return null;
      const latest = valid[0];
      const prev   = valid[1] || null;
      const pctChg = prev && prev.value ? ((latest.value - prev.value) / prev.value * 100) : null;
      return {
        value:     Math.round(parseFloat(latest.value) * 100) / 100,
        date:      latest.date,
        prevValue: prev ? Math.round(parseFloat(prev.value) * 100) / 100 : null,
        pctChange: pctChg !== null ? Math.round(pctChg * 10) / 10 : null,
        source:    'World Bank Pink Sheet',
      };
    } catch { return null; }
  }

  // Fetch from FRED as fallback/supplement (daily data, more current)
  async function fetchFRED(series) {
    if (!FRED_KEY || !series) return null;
    try {
      const url = `${FRED_BASE}?series_id=${series}&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=5`;
      const r = await fetch(url);
      if (!r.ok) return null;
      const data = await r.json();
      const obs = (data.observations || []).filter(o => o.value !== '.' && o.value !== '');
      if (!obs.length) return null;
      const latest = obs[0];
      const prev   = obs[1];
      const v1 = parseFloat(latest.value);
      const v2 = prev ? parseFloat(prev.value) : null;
      const pctChg = v2 ? ((v1 - v2) / v2 * 100) : null;
      return {
        value:     Math.round(v1 * 100) / 100,
        date:      latest.date,
        prevValue: v2 !== null ? Math.round(v2 * 100) / 100 : null,
        pctChange: pctChg !== null ? Math.round(pctChg * 100) / 100 : null,
        source:    'FRED (daily)',
      };
    } catch { return null; }
  }

  // Fetch one commodity — tries FRED first (more current), falls back to World Bank
  async function fetchCommodity(key) {
    const meta = COMMODITIES[key];
    if (!meta) return null;
    // Try FRED first if available (daily data)
    const fredData = meta.fred ? await fetchFRED(meta.fred) : null;
    // Always try World Bank too (for monthly context)
    const wbData = await fetchWB(meta.code);
    // Prefer FRED for recency, use WB for historical context
    const primary = fredData || wbData;
    return primary ? {
      label:    meta.label,
      unit:     meta.unit,
      ...primary,
      monthly:  wbData,   // keep monthly World Bank data too
    } : null;
  }

  try {
    // ── Single commodity ────────────────────────────────────────────────────────────────────
    if (commodity) {
      const key = commodity.toLowerCase();
      if (!COMMODITIES[key]) {
        res.status(400).json({ error: `Unknown commodity '${key}'. Valid: ${Object.keys(COMMODITIES).join(', ')}` });
        return;
      }
      const data = await fetchCommodity(key);
      if (!data) { res.status(502).json({ error: `Could not fetch ${key}` }); return; }
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
      res.status(200).json({ commodity: key, ...data });
      return;
    }

    // ── Multiple specific commodities ─────────────────────────────────────────────────────
    if (commodities) {
      const keys = commodities.split(',').map(k => k.trim().toLowerCase()).filter(k => COMMODITIES[k]);
      const results = {};
      await Promise.all(keys.map(async k => {
        results[k] = await fetchCommodity(k);
      }));
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
      res.status(200).json({ commodities: results, fetchedAt: new Date().toISOString() });
      return;
    }

    // ── Default: GeoWire strategic commodity bundle ──────────────────────────────────────────────
    // Focus on commodities most affected by Hormuz/Iran conflict
    const BUNDLE_KEYS = ['oil', 'wti', 'natgas_eu', 'natgas_us', 'wheat', 'fertilizer', 'aluminum'];
    const bundle = {};
    await Promise.all(BUNDLE_KEYS.map(async k => {
      bundle[k] = await fetchCommodity(k);
    }));

    // Compute a simple "commodity stress index" (0-100)
    // Based on: how much prices deviate from 12-month baselines
    // For now returns the raw bundle — scoring model can calculate stress
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    res.status(200).json({
      commodities: bundle,
      availableKeys: Object.keys(COMMODITIES),
      fetchedAt: new Date().toISOString(),
      note: 'World Bank data is monthly (lags ~4-6 weeks). FRED data is daily when FRED_KEY is set.',
    });

  } catch (err) {
    res.status(502).json({ error: 'Commodity data upstream error', detail: err.message });
  }
}

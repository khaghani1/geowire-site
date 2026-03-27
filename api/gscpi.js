// /api/gscpi.js — Vercel serverless proxy for supply chain pressure indicators
//
// Data sources (all free, no API key):
//
//  1. NY Fed GSCPI (Global Supply Chain Pressure Index)
//     Monthly index; z-score where 0 = historical norm, +1 = 1 std dev above
//     CSV: https://www.newyorkfed.org/medialibrary/media/research/national_economy/gscpi/downloads/GSCPI_current.csv
//     Docs: https://www.newyorkfed.org/research/policy/gscpi
//
//  2. Baltic Dry Index (BDI) via FRED (requires FRED_KEY) or Stooq CSV
//     Tracks global bulk shipping costs — leading indicator for trade volumes
//     Normal range: 1000–2000; >3000 = stressed; <700 = depressed
//
//  3. GeoWire Composite Supply Pressure Score (0–100)
//     Weighted composite: GSCPI (40%) + BDI (35%) + Hormuz model (25%)
//     Pass ?blockadePercent=97 to override Hormuz weight
//
// Response:
//   {
//     gscpi: { value: 2.1, date: '2026-02', stdDevs: 2.1, pressureLevel: 'HIGH' },
//     bdi:   { value: 1842, date: '2026-03-25', normalized: 0.42, trend: '+3.2%' },
//     compositeScore: 72,
//     pressureLevel: 'HIGH' | 'ELEVATED' | 'MODERATE' | 'NORMAL' | 'LOW',
//     lastUpdated: '...',
//   }

const GSCPI_CSV_URL = 'https://www.newyorkfed.org/medialibrary/media/research/national_economy/gscpi/downloads/GSCPI_current.csv';
const FRED_BASE     = 'https://api.stlouisfed.org/fred/series/observations';

const BDI_NORMAL    = 1500;
const BDI_STRESSED  = 3000;
const BDI_DEPRESSED = 700;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { blockadePercent: bpParam, detail } = req.query;
  const blockadePct = parseFloat(bpParam) || 97;
  const FRED_KEY = process.env.FRED_KEY || '';

  // ── NY Fed GSCPI ─────────────────────────────────────────────────────────────────────────
  async function fetchGSCPI() {
    try {
      const r = await fetch(GSCPI_CSV_URL, {
        headers: {
          'Accept': 'text/csv,text/plain,*/*',
          'User-Agent': 'GeoWire/1.0 (geopolitical intelligence; contact@geowire.org)',
        },
      });
      if (!r.ok) return null;
      const text = await r.text();
      const lines = text.trim().split('\n').filter(l => l.trim());
      if (lines.length < 2) return null;

      const rows = [];
      for (let i = 1; i < lines.length; i++) {
        const [dateStr, valStr] = lines[i].split(',');
        const val = parseFloat(valStr);
        if (dateStr && !isNaN(val)) {
          rows.push({ date: dateStr.trim(), value: val });
        }
      }
      if (!rows.length) return null;
      rows.sort((a, b) => b.date.localeCompare(a.date));

      const latest = rows[0];
      const prev   = rows[1] || null;
      const change = prev ? Math.round((latest.value - prev.value) * 100) / 100 : null;

      return {
        value:         Math.round(latest.value * 100) / 100,
        date:          latest.date,
        stdDevs:       Math.round(latest.value * 100) / 100,
        prevValue:     prev ? Math.round(prev.value * 100) / 100 : null,
        change,
        pressureLevel: classifyGSCPI(latest.value),
        source:        'NY Fed GSCPI',
        history:       detail === 'full' ? rows.slice(0, 24) : undefined,
      };
    } catch { return null; }
  }

  function classifyGSCPI(zscore) {
    if (zscore >= 3.0) return 'EXTREME';
    if (zscore >= 2.0) return 'HIGH';
    if (zscore >= 1.0) return 'ELEVATED';
    if (zscore >= 0.0) return 'MODERATE';
    if (zscore >= -1.0) return 'NORMAL';
    return 'LOW';
  }

  // ── Baltic Dry Index (BDI) ────────────────────────────────────────────────────────────────────
  async function fetchBDI() {
    if (FRED_KEY) {
      try {
        const url = `${FRED_BASE}?series_id=BDIYINDEX&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=10`;
        const r = await fetch(url);
        if (r.ok) {
          const data = await r.json();
          const obs = (data.observations || []).filter(o => o.value !== '.' && o.value !== '');
          if (obs.length) {
            const latest = obs[0];
            const prev   = obs[1];
            const v1 = parseFloat(latest.value);
            const v2 = prev ? parseFloat(prev.value) : null;
            const pctChg = v2 ? Math.round(((v1 - v2) / v2) * 1000) / 10 : null;
            return {
              value:      Math.round(v1),
              date:       latest.date,
              prevValue:  v2 !== null ? Math.round(v2) : null,
              pctChange:  pctChg,
              normalized: normalizeBDI(v1),
              trend:      pctChg !== null ? (pctChg > 0 ? `+${pctChg}%` : `${pctChg}%`) : null,
              source:     'FRED (BDIYINDEX)',
            };
          }
        }
      } catch { /* fall through */ }
    }

    // Fallback: Stooq free CSV for BDI
    try {
      const stooqUrl = 'https://stooq.com/q/d/l/?s=%5Ebdi&i=d';
      const r = await fetch(stooqUrl, { headers: { 'User-Agent': 'GeoWire/1.0' } });
      if (r.ok) {
        const text = await r.text();
        const lines = text.trim().split('\n').filter(l => l.trim());
        if (lines.length >= 2) {
          const lastLine = lines[lines.length - 1];
          const prevLine = lines.length >= 3 ? lines[lines.length - 2] : null;
          const parts = lastLine.split(',');
          const prevParts = prevLine ? prevLine.split(',') : null;
          const v1 = parseFloat(parts[4]);
          const v2 = prevParts ? parseFloat(prevParts[4]) : null;
          if (!isNaN(v1)) {
            const pctChg = v2 && !isNaN(v2) ? Math.round(((v1 - v2) / v2) * 1000) / 10 : null;
            return {
              value:      Math.round(v1),
              date:       parts[0],
              prevValue:  v2 && !isNaN(v2) ? Math.round(v2) : null,
              pctChange:  pctChg,
              normalized: normalizeBDI(v1),
              trend:      pctChg !== null ? (pctChg > 0 ? `+${pctChg}%` : `${pctChg}%`) : null,
              source:     'Stooq (BDI)',
            };
          }
        }
      }
    } catch { /* fall through */ }

    return null;
  }

  function normalizeBDI(bdi) {
    const clamped = Math.max(BDI_DEPRESSED, Math.min(BDI_STRESSED, bdi));
    return Math.round((clamped - BDI_DEPRESSED) / (BDI_STRESSED - BDI_DEPRESSED) * 100) / 100;
  }

  // ── Composite Supply Pressure Score ──────────────────────────────────────────────────────────
  // GSCPI (40%) + BDI (35%) + Hormuz blockade (25%)
  function computeComposite(gscpi, bdi, blockadePct) {
    const components = {};
    const gscpiScore = gscpi ? Math.max(0, Math.min(100, Math.round((gscpi.value + 2) / 6 * 100))) : 50;
    components.gscpi = { score: gscpiScore, weight: 0.40, contribution: Math.round(gscpiScore * 0.40) };
    const bdiScore = bdi ? Math.round(bdi.normalized * 100) : 50;
    components.bdi = { score: bdiScore, weight: 0.35, contribution: Math.round(bdiScore * 0.35) };
    const hormuzScore = blockadePct;
    components.hormuz = { score: hormuzScore, weight: 0.25, contribution: Math.round(hormuzScore * 0.25) };
    const composite = components.gscpi.contribution + components.bdi.contribution + components.hormuz.contribution;
    return {
      score:      Math.min(100, composite),
      level:      classifyComposite(composite),
      components,
      hormuzContribution: components.hormuz.contribution,
      dataQuality: [gscpi ? 'gscpi' : null, bdi ? 'bdi' : null, 'hormuz'].filter(Boolean),
    };
  }

  function classifyComposite(score) {
    if (score >= 80) return 'CRITICAL';
    if (score >= 65) return 'HIGH';
    if (score >= 50) return 'ELEVATED';
    if (score >= 35) return 'MODERATE';
    if (score >= 20) return 'NORMAL';
    return 'LOW';
  }

  try {
    const [gscpi, bdi] = await Promise.all([fetchGSCPI(), fetchBDI()]);
    const composite = computeComposite(gscpi, bdi, blockadePct);

    const response = {
      gscpi,
      bdi,
      compositeScore:     composite.score,
      pressureLevel:      composite.level,
      components:         composite.components,
      hormuzContribution: composite.hormuzContribution,
      hormuzInput: {
        blockadePercent: blockadePct,
        note: 'Pass ?blockadePercent=N to override (default: 97, from GeoWire Hormuz model)',
      },
      dataAvailable: { gscpi: !!gscpi, bdi: !!bdi, hormuz: true },
      interpretation: buildInterpretation(composite.score, gscpi, bdi, blockadePct),
      dataSource:  composite.dataQuality,
      lastUpdated: new Date().toISOString(),
    };

    res.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate=21600');
    res.status(200).json(response);

  } catch (err) {
    res.status(502).json({ error: 'Supply chain data upstream error', detail: err.message });
  }
}

function buildInterpretation(score, gscpi, bdi, blockadePct) {
  const parts = [];
  if (gscpi) parts.push(`NY Fed GSCPI at ${gscpi.value > 0 ? '+' : ''}${gscpi.value} std devs (${gscpi.pressureLevel.toLowerCase()})`);
  if (bdi) parts.push(`Baltic Dry Index at ${bdi.value.toLocaleString()} (${bdi.normalized > 0.6 ? 'elevated' : bdi.normalized < 0.3 ? 'depressed' : 'moderate'} shipping demand)`);
  parts.push(`Hormuz Strait ${blockadePct}% blockaded, cutting ~${Math.round(blockadePct * 0.2 * 10) / 10} Mbpd from global supply`);
  return parts.join('. ') + '.';
}

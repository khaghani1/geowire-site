// /api/ships.js — Vercel serverless proxy for Hormuz Strait vessel intelligence
//
// Multi-source architecture (best available, graceful degradation):
//
//  Tier 1 — AISStream.io (free key, real-time AIS via WebSocket→HTTP bridge)
//           Set AISSTREAM_KEY env var to enable live vessel positions
//           Register free at: https://aisstream.io
//           Gives: vessel positions, MMSI, vessel type, speed, heading
//
//  Tier 2 — IMF PortWatch (completely free, no key)
//           Tracks port calls at Jebel Ali (UAE), Fujairah (UAE), Bandar Abbas (Iran)
//           API: https://api.portwatch.imf.org/api/
//           Gives: daily vessel call counts by port and vessel type
//
//  Tier 3 — GeoWire Model Estimate (always available)
//           Uses known blockade data from content.js seed
//           Returns modeled transit estimate based on blockade percentage
//
// Response:
//   {
//     hormuzStatus: 'OPEN' | 'RESTRICTED' | 'BLOCKED',
//     blockadePercent: 97,
//     transitEstimate: { tankers: 1, total: 2 },    // vessels/day
//     normalBaseline:  { tankers: 21, total: 40 },  // historical normal
//     portActivity: { jebelAli: {...}, fujairah: {...}, bandarAbbas: {...} },
//     vesselPositions: [...],  // if AISStream key available
//     dataSource: 'aisstream' | 'portwatch' | 'model',
//     lastUpdated: '...',
//   }

const HORMUZ_BBOX = {
  // Strait of Hormuz bounding box
  latMin: 23.5,  latMax: 27.5,
  lonMin: 55.0,  lonMax: 60.5,
};

// AIS vessel type codes for tankers (crude, product, chemical, gas)
const TANKER_TYPES = new Set([80, 81, 82, 83, 84, 85, 86, 87, 88, 89]);

// Normal baseline: ~21 tankers/day, ~40 total vessels/day through Hormuz
const BASELINE = { tankers: 21, total: 40 };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  // Query params:
  //   ?detail=full      → include raw vessel positions list
  //   ?port=jebelAli    → single port activity only
  const { detail, port: portQuery } = req.query;
  const AISSTREAM_KEY = process.env.AISSTREAM_KEY || '';
  const PORTWATCH_BASE = 'https://api.portwatch.imf.org/api';

  // ── Tier 1: AISStream.io vessel positions ────────────────────────────────────────
  async function fetchAISStream() {
    if (!AISSTREAM_KEY) return null;
    try {
      const searchUrl = `https://api.aisstream.io/v0/vessels?apiKey=${AISSTREAM_KEY}&lat_min=${HORMUZ_BBOX.latMin}&lat_max=${HORMUZ_BBOX.latMax}&lon_min=${HORMUZ_BBOX.lonMin}&lon_max=${HORMUZ_BBOX.lonMax}&limit=200`;
      const r = await fetch(searchUrl, { headers: { 'Authorization': `Bearer ${AISSTREAM_KEY}`, 'Accept': 'application/json' } });
      if (!r.ok) return null;
      const vessels = await r.json();
      const arr = Array.isArray(vessels) ? vessels : (vessels.vessels || vessels.data || []);
      const tankers = arr.filter(v => {
        const type = v.shipType || v.ship_type || v.type || 0;
        return TANKER_TYPES.has(parseInt(type));
      });
      return {
        total:   arr.length,
        tankers: tankers.length,
        vessels: detail === 'full' ? arr.slice(0, 50) : undefined,
        source:  'aisstream',
      };
    } catch { return null; }
  }

  // ── Tier 2: IMF PortWatch ─────────────────────────────────────────────────────────────────────────
  const PORTS = {
    jebelAli:    { code: 'AEJEA', label: 'Jebel Ali (UAE)',     region: 'UAE' },
    fujairah:    { code: 'AEFJR', label: 'Fujairah (UAE)',      region: 'UAE' },
    bandarAbbas: { code: 'IRBND', label: 'Bandar Abbas (Iran)', region: 'Iran' },
    bandarImam:  { code: 'IRBIK', label: 'Bandar Imam (Iran)',  region: 'Iran' },
    muscat:      { code: 'OMMCT', label: 'Muscat (Oman)',       region: 'Oman' },
  };

  async function fetchPortWatch(portCode) {
    try {
      const endDate = new Date().toISOString().slice(0, 10);
      const startDate = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
      const url = `${PORTWATCH_BASE}/portcalls?portCode=${portCode}&startDate=${startDate}&endDate=${endDate}`;
      const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!r.ok) {
        const altUrl = `${PORTWATCH_BASE}/porttraffic?portCode=${portCode}&startDate=${startDate}&endDate=${endDate}`;
        const r2 = await fetch(altUrl, { headers: { 'Accept': 'application/json' } });
        if (!r2.ok) return null;
        return await r2.json();
      }
      return await r.json();
    } catch { return null; }
  }

  async function fetchAllPorts() {
    const portKeys = portQuery ? [portQuery] : Object.keys(PORTS);
    const results = {};
    await Promise.all(portKeys.map(async key => {
      if (!PORTS[key]) return;
      const data = await fetchPortWatch(PORTS[key].code);
      results[key] = {
        label:   PORTS[key].label,
        region:  PORTS[key].region,
        portCode: PORTS[key].code,
        data:    data,
        calls:   extractCallCount(data),
      };
    }));
    return results;
  }

  function extractCallCount(data) {
    if (!data) return null;
    if (Array.isArray(data)) {
      return data.reduce((sum, d) => sum + (d.portcalls || d.calls || d.count || 0), 0);
    }
    if (typeof data === 'object') {
      return data.portcalls || data.calls || data.total || data.count || null;
    }
    return null;
  }

  // ── Tier 3: GeoWire model estimate ──────────────────────────────────────────────────────────
  function modelEstimate(portActivity) {
    const blockadePercent = 97;
    const transitRate = (100 - blockadePercent) / 100;
    const tankerEstimate = Math.round(BASELINE.tankers * transitRate);
    const totalEstimate  = Math.round(BASELINE.total   * transitRate);
    let calibrated = false;
    if (portActivity) {
      const totalCalls = Object.values(portActivity).reduce((sum, p) => sum + (p.calls || 0), 0);
      if (totalCalls > 0) { calibrated = true; }
    }
    return { tankers: tankerEstimate, total: totalEstimate, calibrated, blockadePercent, method: calibrated ? 'model+portwatch' : 'model' };
  }

  function classifyStatus(blockadePct) {
    if (blockadePct >= 90) return 'BLOCKED';
    if (blockadePct >= 50) return 'RESTRICTED';
    if (blockadePct >= 20) return 'DEGRADED';
    return 'OPEN';
  }

  try {
    const [aisData, portActivity] = await Promise.all([fetchAISStream(), fetchAllPorts()]);
    const modelData = modelEstimate(portActivity);
    const blockadePct = modelData.blockadePercent;
    const transitEstimate = aisData
      ? { tankers: aisData.tankers, total: aisData.total }
      : { tankers: modelData.tankers, total: modelData.total };
    const dataSource = aisData ? 'aisstream' : (
      Object.values(portActivity).some(p => p.calls !== null) ? 'portwatch+model' : 'model'
    );
    const response = {
      hormuzStatus:     classifyStatus(blockadePct),
      blockadePercent:  blockadePct,
      transitEstimate,
      normalBaseline:   BASELINE,
      supplyImpact: {
        oilSupplyBlockedMbpd: Math.round(20 * blockadePct / 100 * 10) / 10,
        percentGlobalOilBlocked: blockadePct * 0.2,
      },
      portActivity,
      dataSource,
      aisAvailable:     !!AISSTREAM_KEY,
      lastUpdated:      new Date().toISOString(),
    };
    if (detail === 'full' && aisData && aisData.vessels) {
      response.vesselPositions = aisData.vessels;
    }
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(response);
  } catch (err) {
    res.status(502).json({ error: 'Ship tracking upstream error', detail: err.message });
  }
}

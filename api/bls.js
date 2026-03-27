// /api/bls.js — Vercel serverless proxy for BLS API
// BLS blocks browser CORS — this runs server-side.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const seriesid = req.query.seriesid || (req.body && req.body.seriesid);
  if (!seriesid) {
    res.status(400).json({ error: 'seriesid required' });
    return;
  }

  const BLS_KEY = process.env.BLS_KEY || '01eb8f88445b45529eda4971281579ba';
  const currentYear = new Date().getFullYear();
  const ids = Array.isArray(seriesid) ? seriesid : [seriesid];

  try {
    const upstream = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seriesid: ids,
        startyear: String(currentYear - 1),
        endyear: String(currentYear),
        registrationkey: BLS_KEY,
      }),
    });
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `BLS returned ${upstream.status}` });
      return;
    }
    const data = await upstream.json();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: 'BLS upstream error', detail: err.message });
  }
}

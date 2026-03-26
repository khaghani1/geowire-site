// /api/eia.js — Vercel serverless proxy for EIA (Energy Information Administration)
// Proxied server-side to avoid potential CORS issues on some browsers.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { seriesId } = req.query;
  if (!seriesId) {
    res.status(400).json({ error: 'seriesId required' });
    return;
  }

  const EIA_KEY = process.env.EIA_KEY || 'OinUeRE4Beo4k85b8U2YcWbjQCJEMIOPaHfdKOsm';
  const url = `https://api.eia.gov/v2/seriesid/${encodeURIComponent(seriesId)}?api_key=${EIA_KEY}&data[0]=value&sort[0][column]=period&sort[0][direction]=desc&length=1`;

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `EIA returned ${upstream.status}` });
      return;
    }
    const data = await upstream.json();
    // Cache 1 hour — EIA data is daily
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: 'EIA upstream error', detail: err.message });
  }
}

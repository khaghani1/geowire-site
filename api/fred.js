// /api/fred.js — Vercel serverless proxy for FRED API
// FRED blocks browser CORS — this runs server-side and relays the response.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { series_id, limit = '1', sort_order = 'desc' } = req.query;
  if (!series_id) {
    res.status(400).json({ error: 'series_id required' });
    return;
  }

  const FRED_KEY = process.env.FRED_KEY || 'f8f377edb471980ac3d88f219145c071';
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${encodeURIComponent(series_id)}&api_key=${FRED_KEY}&file_type=json&sort_order=${sort_order}&limit=${limit}`;

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `FRED returned ${upstream.status}` });
      return;
    }
    const data = await upstream.json();
    // Cache 5 minutes — FRED data doesn't change faster
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: 'FRED upstream error', detail: err.message });
  }
}

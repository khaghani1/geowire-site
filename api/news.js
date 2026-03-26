// /api/news.js — Vercel serverless proxy for NewsAPI
// NewsAPI free tier blocks production browser requests — this runs server-side.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { q = 'Iran war conflict', pageSize = '6', sortBy = 'publishedAt' } = req.query;

  const NEWS_KEY = process.env.NEWS_API_KEY || 'ff5e642fe3a74c1faba5387d8e8a2865';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&sortBy=${sortBy}&pageSize=${pageSize}&language=en&apiKey=${NEWS_KEY}`;

  try {
    const upstream = await fetch(url, {
      headers: { 'User-Agent': 'GeoWire/1.0' },
    });
    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({}));
      res.status(upstream.status).json({ error: err.message || `NewsAPI ${upstream.status}` });
      return;
    }
    const data = await upstream.json();
    // Cache 10 minutes — news freshness
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: 'NewsAPI upstream error', detail: err.message });
  }
}

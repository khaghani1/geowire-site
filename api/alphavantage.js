// /api/alphavantage.js — Vercel proxy for Alpha Vantage
// Free tier: 25 requests/day. Register at https://alphavantage.co/support/#api-key
// Handles: commodities (WTI, Brent, gold), equities (SPY, XOM), forex

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const AV_KEY = process.env.ALPHA_VANTAGE_KEY || '';
  if (!AV_KEY) {
    res.status(503).json({ error: 'Alpha Vantage key not configured. Set ALPHA_VANTAGE_KEY in Vercel env vars.' });
    return;
  }

  const { fn = 'GLOBAL_QUOTE', symbol = 'SPY', interval = 'daily' } = req.query;
  const url = `https://www.alphavantage.co/query?function=${encodeURIComponent(fn)}&symbol=${encodeURIComponent(symbol)}&interval=${interval}&apikey=${AV_KEY}`;

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `Alpha Vantage HTTP ${upstream.status}` });
      return;
    }
    const data = await upstream.json();
    if (data['Note'] || data['Information']) {
      res.status(429).json({ error: 'Alpha Vantage rate limit reached (25/day on free tier)', detail: data['Note'] || data['Information'] });
      return;
    }
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: 'Alpha Vantage upstream error', detail: err.message });
  }
}

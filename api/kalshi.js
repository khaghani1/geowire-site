// /api/kalshi.js — Vercel serverless proxy for Kalshi prediction markets
// Bypasses browser CORS; runs server-side on Vercel.
// Auth: Bearer token via KALSHI_KEY env var
// Kalshi API docs: https://trading-api.readme.io/reference/getmarkets

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const KALSHI_KEY = process.env.KALSHI_KEY || '';
  if (!KALSHI_KEY) {
    res.status(503).json({ error: 'Kalshi key not configured. Set KALSHI_KEY in Vercel env vars.' });
    return;
  }

  // Supported query params:
  //   ?ticker=KXRECSSNBER-26          → single market
  //   ?tickers=KXRECSSNBER-26,KXHORMUZ-26  → multiple markets (comma-separated)
  //   ?series=KXRECSSNBER             → all markets in a series
  const { ticker, tickers, series } = req.query;

  const BASE = 'https://api.kalshi.com/trade-api/v2';
  const headers = {
    'Authorization': `Bearer ${KALSHI_KEY}`,
    'Accept': 'application/json',
  };

  try {
    // ── Single market ────────────────────────────────────────────────────────
    if (ticker) {
      const url = `${BASE}/markets/${encodeURIComponent(ticker.toUpperCase())}`;
      const upstream = await fetch(url, { headers });
      if (!upstream.ok) {
        const body = await upstream.text();
        res.status(upstream.status).json({ error: `Kalshi API ${upstream.status}`, detail: body });
        return;
      }
      const data = await upstream.json();
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      res.status(200).json(data);
      return;
    }

    // ── Multiple markets by ticker list ──────────────────────────────────────
    if (tickers) {
      const tickerList = tickers.split(',').map(t => t.trim().toUpperCase()).filter(Boolean);
      const results = {};
      await Promise.all(
        tickerList.map(async (t) => {
          try {
            const upstream = await fetch(`${BASE}/markets/${encodeURIComponent(t)}`, { headers });
            if (upstream.ok) {
              const data = await upstream.json();
              results[t] = data.market || data;
            } else {
              results[t] = { error: `HTTP ${upstream.status}` };
            }
          } catch (err) {
            results[t] = { error: err.message };
          }
        })
      );
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      res.status(200).json({ markets: results });
      return;
    }

    // ── All markets in a series ───────────────────────────────────────────────
    if (series) {
      const url = `${BASE}/series/${encodeURIComponent(series.toUpperCase())}/markets`;
      const upstream = await fetch(url, { headers });
      if (!upstream.ok) {
        const body = await upstream.text();
        res.status(upstream.status).json({ error: `Kalshi API ${upstream.status}`, detail: body });
        return;
      }
      const data = await upstream.json();
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      res.status(200).json(data);
      return;
    }

    // ── Default: fetch GeoWire's core prediction markets ─────────────────────
    const GEOWIRE_TICKERS = [
      'KXRECSSNBER-26',       // US recession 2026
      'KXHORMUZ-26',          // Hormuz open by end of 2026 (if exists)
      'KXCEASEFIRE-MAR26',    // Ceasefire by end of March
      'KXCEASEFIRE-APR26',    // Ceasefire by end of April
    ];

    const results = {};
    await Promise.all(
      GEOWIRE_TICKERS.map(async (t) => {
        try {
          const upstream = await fetch(`${BASE}/markets/${encodeURIComponent(t)}`, { headers });
          if (upstream.ok) {
            const data = await upstream.json();
            results[t] = data.market || data;
          } else {
            // silently skip missing markets (some may not exist yet)
            results[t] = null;
          }
        } catch (err) {
          results[t] = null;
        }
      })
    );

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ markets: results });

  } catch (err) {
    res.status(502).json({ error: 'Kalshi upstream error', detail: err.message });
  }
}

// /api/polymarket.js — Vercel serverless proxy for Polymarket prediction markets
// Public API — no key required. Bypasses browser CORS.
// Docs: https://docs.polymarket.com/
// Base: https://gamma-api.polymarket.com

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  // Query params:
  //   ?q=Iran           → search events by keyword
  //   ?q=ceasefire      → ceasefire markets
  //   ?slug=some-slug   → fetch specific event by slug
  //   (default)         → return GeoWire's curated geopolitical bundle
  const { q, slug, limit = '20' } = req.query;
  const BASE = 'https://gamma-api.polymarket.com';

  // Normalise a market's YES probability from outcomePrices JSON string
  function parseYesProb(outcomePricesStr) {
    try {
      const arr = JSON.parse(outcomePricesStr);
      return Math.round(parseFloat(arr[0]) * 100);
    } catch { return null; }
  }

  // Shape a raw Polymarket market into a clean GeoWire record
  function shapeMarket(m) {
    const yesProb = parseYesProb(m.outcomePrices);
    return {
      question:      m.question,
      slug:          m.slug,
      probability:   yesProb,          // 0-100
      bestAsk:       m.bestAsk,
      lastTrade:     m.lastTradePrice,
      liquidity:     Math.round(m.liquidityNum || m.liquidity || 0),
      volume24hr:    Math.round(m.volume24hr || 0),
      active:        m.active,
      closed:        m.closed,
      endDate:       m.endDate || m.endDateIso,
    };
  }

  try {
    // ── Single event by slug ─────────────────────────────────────────────────────────
    if (slug) {
      const url = `${BASE}/events?slug=${encodeURIComponent(slug)}&limit=1`;
      const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!r.ok) { res.status(r.status).json({ error: `Polymarket API ${r.status}` }); return; }
      const events = await r.json();
      const ev = events[0];
      if (!ev) { res.status(404).json({ error: 'Event not found' }); return; }
      const result = {
        title:    ev.title,
        slug:     ev.slug,
        liquidity: ev.liquidity,
        markets:  (ev.markets || []).map(shapeMarket),
      };
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      res.status(200).json(result);
      return;
    }

    // ── Keyword search ────────────────────────────────────────────────────────────────────
    if (q) {
      const url = `${BASE}/events?q=${encodeURIComponent(q)}&active=true&closed=false&limit=${Math.min(parseInt(limit) || 20, 50)}`;
      const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!r.ok) { res.status(r.status).json({ error: `Polymarket API ${r.status}` }); return; }
      const events = await r.json();
      const result = events.map(ev => ({
        title:    ev.title,
        slug:     ev.slug,
        liquidity: ev.liquidity,
        volume24hr: ev.volume24hr,
        markets:  (ev.markets || []).map(shapeMarket),
      }));
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      res.status(200).json({ count: result.length, events: result });
      return;
    }

    // ── Default: GeoWire geopolitical bundle ──────────────────────────────────────────────
    // Search for the markets most relevant to GeoWire's intelligence themes
    const SEARCHES = [
      { key: 'iran',      query: 'Iran' },
      { key: 'ceasefire', query: 'ceasefire' },
      { key: 'hormuz',    query: 'Hormuz' },
      { key: 'oil',       query: 'oil price' },
      { key: 'recession', query: 'recession 2026' },
    ];

    const bundle = {};
    await Promise.all(
      SEARCHES.map(async ({ key, query }) => {
        try {
          const url = `${BASE}/events?q=${encodeURIComponent(query)}&active=true&closed=false&limit=5`;
          const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
          if (!r.ok) { bundle[key] = []; return; }
          const events = await r.json();
          // Only include events with meaningful liquidity (>$1k) or recent volume
          bundle[key] = events
            .filter(ev => (ev.liquidity || 0) > 1000 || (ev.volume24hr || 0) > 100)
            .slice(0, 3)
            .map(ev => ({
              title:   ev.title,
              slug:    ev.slug,
              markets: (ev.markets || []).map(shapeMarket).slice(0, 2),
            }));
        } catch {
          bundle[key] = [];
        }
      })
    );

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ bundle, fetchedAt: new Date().toISOString() });

  } catch (err) {
    res.status(502).json({ error: 'Polymarket upstream error', detail: err.message });
  }
}

// api.js — GeoWire external data fetching
// Each function: async, try/catch, silent fallback to content.js seed data.
//
// CORS NOTE: FRED, BLS, and NewsAPI all block browser cross-origin requests.
// All three are routed through Vercel serverless proxies in /api/*.js
// Keys are stored server-side in those files. Client-side keys below are
// kept only for reference / direct server-side use.

const API = (() => {

  // Keys kept here for reference — actual requests go through /api/ proxies
  const FRED_KEY  = 'f8f377edb471980ac3d88f219145c071';
  const EIA_KEY   = 'OinUeRE4Beo4k85b8U2YcWbjQCJEMIOPaHfdKOsm';
  const BLS_KEY   = '01eb8f88445b45529eda4971281579ba';

  // Local proxy routes (Vercel serverless functions)
  const PROXY_FRED  = '/api/fred';
  const PROXY_BLS   = '/api/bls';
  const PROXY_NEWS  = '/api/news';
  const PROXY_EIA   = '/api/eia';

  const COINGECKO_BASE = 'https://api.coingecko.com/api/v3/simple/price';
  const GDELT_BASE     = 'https://api.gdeltproject.org/api/v2/doc/doc';

  const FRED_SERIES = {
    treasury:         'DGS10',
    dollar:           'DTWEXBGS',
    sp500:            'SP500',
    // gold: removed — GOLDAMGBD228NLBM was deprecated by FRED. Use fetchWorldBankGold() instead.
    yieldCurve:       'T10Y2Y',
    cpi:              'CPIAUCSL',
    unemployment:     'UNRATE',
    initialClaims:    'ICSA',
    mortgageRate:     'MORTGAGE30US',
    housingStarts:    'HOUST',
    personalSavings:  'PSAVERT',
    pce:              'PCEPI',
    consumerSentiment:'UMCSENT',
    industrialProd:   'INDPRO',
    fedFundsRate:     'FEDFUNDS',
    importPrices:     'IR',
    buildingPermits:  'PERMIT',
    nonfarmPayrolls:  'PAYEMS',
    retailSales:      'RSXFS',
  };

  function _norm(value, source, label, confidence, timestamp, isLive) {
    return { value, source, label, confidence, timestamp, isLive };
  }

  // ─── FETCH FRED (via /api/fred proxy — bypasses CORS) ───────────────────────
  // _retry flag: set internally — retries once after 900ms on network failures
  // to handle Vercel serverless cold-start timeouts when multiple calls fire at once.
  async function fetchFRED(seriesId, _retry = false) {
    const key = Object.keys(FRED_SERIES).find(k => FRED_SERIES[k] === seriesId);
    const fallback = (GEOWIRE.marketData || {})[key] || {};
    try {
      const url = `${PROXY_FRED}?series_id=${encodeURIComponent(seriesId)}&limit=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`FRED proxy HTTP ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      const obs = json.observations?.[0];
      if (!obs || obs.value === '.') throw new Error('No FRED data');
      return _norm(parseFloat(obs.value), 'FRED', fallback.label || seriesId, 'confirmed', obs.date, true);
    } catch (err) {
      // Retry once on network-level failure (TypeError = "Failed to fetch")
      // This self-heals Vercel cold-start: first cold call fails, retry hits warm function.
      if (!_retry && (err.name === 'TypeError' || err.message.includes('fetch'))) {
        await new Promise(r => setTimeout(r, 900));
        return fetchFRED(seriesId, true);
      }
      console.warn(`[GeoWire] FRED fallback (${seriesId}):`, err.message);
      return _norm(fallback.value, 'FRED (cached)', fallback.label || seriesId, fallback.confidence || 'confirmed', fallback.lastUpdated, false);
    }
  }

  // ─── FETCH GOLD PRICE (via CoinGecko PAXG) ───────────────────────────────────
  // PAXG (PAX Gold) = exactly 1 troy oz of physical gold, backed 1:1.
  // Uses the same CoinGecko API as BTC/ETH — no key, no proxy, CORS-friendly.
  // Replaces deprecated FRED series GOLDAMGBD228NLBM and unreliable World Bank proxy.
  async function fetchWorldBankGold() {
    const fallback = (GEOWIRE.marketData || {}).gold || {};
    try {
      const url = `${COINGECKO_BASE}?ids=pax-gold&vs_currencies=usd`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`CoinGecko gold HTTP ${res.status}`);
      const json = await res.json();
      const price = json['pax-gold']?.usd;
      if (!price) throw new Error('No PAXG price in response');
      return _norm(price, 'CoinGecko (PAXG)', 'Gold', 'multisource', new Date().toISOString(), true);
    } catch (err) {
      console.warn('[GeoWire] Gold fallback:', err.message);
      return _norm(fallback.value, 'Gold (cached)', 'Gold', fallback.confidence || 'confirmed', fallback.lastUpdated, false);
    }
  }

  // ─── FETCH COINGECKO ─────────────────────────────────────────────────────────
  async function fetchCoinGecko() {
    try {
      const url = `${COINGECKO_BASE}?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);
      const json = await res.json();
      return {
        bitcoin:  _norm(json.bitcoin?.usd,  'CoinGecko', 'Bitcoin',  'multisource', new Date().toISOString(), true),
        ethereum: _norm(json.ethereum?.usd, 'CoinGecko', 'Ethereum', 'multisource', new Date().toISOString(), true),
        isLive: true,
      };
    } catch (err) {
      console.warn('[GeoWire] CoinGecko fallback:', err.message);
      const btc = (GEOWIRE.marketData || {}).bitcoin || {};
      return {
        bitcoin:  _norm(btc.value, 'CoinGecko (cached)', 'Bitcoin',  'multisource', btc.lastUpdated, false),
        ethereum: _norm(null,      'CoinGecko (cached)', 'Ethereum', 'multisource', null, false),
        isLive: false,
      };
    }
  }

  // ─── FETCH GDELT ─────────────────────────────────────────────────────────────
  async function fetchGDELT(query = 'Iran war ceasefire conflict') {
    try {
      const url = `${GDELT_BASE}?query=${encodeURIComponent(query)}&mode=artlist&maxrecords=6&format=json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`GDELT HTTP ${res.status}`);
      const json = await res.json();
      const articles = json.articles || [];
      if (articles.length === 0) throw new Error('No GDELT results');
      const data = articles.slice(0, 6).map(a => ({
        headline: a.title || 'No title',
        summary: a.seendate ? `Published: ${a.seendate}` : 'No summary available.',
        source: a.domain || 'Unknown',
        confidence: 'multisource',
        timestamp: a.seendate ? new Date(a.seendate.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,'$1-$2-$3T$4:$5:$6Z')).toISOString() : new Date().toISOString(),
        url: a.url || '#',
      }));
      return { data, isLive: true };
    } catch (err) {
      console.warn('[GeoWire] GDELT fallback:', err.message);
      return { data: GEOWIRE.newsCards, isLive: false };
    }
  }

  // ─── LOAD ALL MARKET DATA ─────────────────────────────────────────────────────
  async function loadMarketData() {
    try {
      const [treasury, dollar, sp500, gold, crypto] = await Promise.all([
        fetchFRED(FRED_SERIES.treasury),
        fetchFRED(FRED_SERIES.dollar),
        fetchFRED(FRED_SERIES.sp500),
        fetchWorldBankGold(),   // ← Fixed: replaces deprecated FRED GOLDAMGBD228NLBM
        fetchCoinGecko(),
      ]);
      const anyLive = [treasury, dollar, sp500, gold].some(d => d.isLive) || crypto.isLive;
      const badgeEl = document.getElementById('ticker-live-badge');
      if (badgeEl) badgeEl.innerHTML = UI.renderLiveBadge(anyLive);
      _updateTicker('ticker-treasury', treasury);
      _updateTicker('ticker-dollar', dollar);
      _updateTicker('ticker-sp500', sp500);
      _updateTicker('ticker-gold', gold);
      if (crypto.bitcoin?.value) _updateTickerRaw('ticker-bitcoin', crypto.bitcoin.value.toLocaleString(), 'USD');
    } catch (err) {
      console.warn('[GeoWire] loadMarketData error:', err.message);
    }
  }

  function _updateTicker(id, data) {
    if (!data?.value) return;
    const el = document.getElementById(id);
    if (!el) return;
    const valEl = el.querySelector('.ticker-value');
    if (valEl) valEl.innerHTML = `${data.value.toLocaleString()} <small></small>`;
  }

  function _updateTickerRaw(id, val, unit) {
    const el = document.getElementById(id);
    if (!el) return;
    const valEl = el.querySelector('.ticker-value');
    if (valEl) valEl.innerHTML = `${val} <small>${unit||''}</small>`;
  }

  // ─── LOAD NEWS ───────────────────────────────────────────────────────────────
  async function loadNews(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '<p class="loading-state">Loading intelligence feed…</p>';
    try {
      const { data, isLive } = await fetchGDELT();
      container.innerHTML = data.map(item => UI.renderNewsCard(item)).join('');
      const badge = document.getElementById('news-live-badge');
      if (badge) badge.innerHTML = UI.renderLiveBadge(isLive);
    } catch (err) {
      container.innerHTML = GEOWIRE.newsCards.map(item => UI.renderNewsCard(item)).join('');
    }
  }

  // ─── FETCH ALL RECESSION DATA ─────────────────────────────────────────────────
  async function fetchAllRecessionData() {
    const seriesKeys = Object.keys(FRED_SERIES);
    const results = {};

    const promises = seriesKeys.map(async (key) => {
      try {
        const data = await fetchFRED(FRED_SERIES[key]);
        results[key] = data;
      } catch (err) {
        console.warn(`[GeoWire] Recession FRED fallback (${key}):`, err.message);
        results[key] = null;
      }
    });

    // Also fetch key BLS series in parallel (unemployment, nonfarm payrolls)
    const blsPromises = [
      { key: 'bls_unemployment',    seriesId: 'LNS14000000' },   // Unemployment Rate
      { key: 'bls_nonfarmPayrolls', seriesId: 'CES0000000001' },  // Total Nonfarm Payrolls
      { key: 'bls_cpi',             seriesId: 'CUUR0000SA0' },    // CPI All Urban
      { key: 'bls_avgHourlyEarnings', seriesId: 'CES0500000003' }, // Average Hourly Earnings
    ].map(async ({ key, seriesId }) => {
      try {
        const data = await fetchBLS(seriesId);
        if (data) results[key] = data;
      } catch (err) {
        console.warn(`[GeoWire] BLS fallback (${key}):`, err.message);
      }
    });

    await Promise.allSettled([...promises, ...blsPromises]);
    return results;
  }

  // ─── FETCH EIA (via /api/eia proxy) ──────────────────────────────────────────
  async function fetchEIA(seriesId) {
    try {
      const url = `${PROXY_EIA}?seriesId=${encodeURIComponent(seriesId)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`EIA proxy HTTP ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      const obs = json.response?.data?.[0];
      if (!obs) throw new Error('No EIA data');
      return _norm(parseFloat(obs.value), 'EIA', seriesId, 'confirmed', obs.period, true);
    } catch (err) {
      console.warn(`[GeoWire] EIA fallback (${seriesId}):`, err.message);
      return null;
    }
  }

  // ─── FETCH NEWS API (via /api/news proxy — bypasses free-tier CORS block) ────
  async function fetchNewsAPI(query) {
    try {
      const url = `${PROXY_NEWS}?q=${encodeURIComponent(query)}&pageSize=6`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`News proxy HTTP ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      const articles = json.articles || [];
      if (!articles.length) throw new Error('No news results');
      return articles.slice(0, 6).map(a => ({
        headline: a.title || 'No title',
        summary: a.description || 'No description.',
        source: a.source?.name || 'Unknown',
        confidence: 'multisource',
        timestamp: a.publishedAt || new Date().toISOString(),
        url: a.url || '#',
      }));
    } catch (err) {
      console.warn(`[GeoWire] NewsAPI fallback (${query}):`, err.message);
      return null;
    }
  }

  // ─── FETCH BLS (via /api/bls proxy — bypasses CORS) ─────────────────────────
  async function fetchBLS(seriesId) {
    try {
      const url = `${PROXY_BLS}?seriesid=${encodeURIComponent(seriesId)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`BLS proxy HTTP ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      const series = json.Results?.series?.[0];
      if (!series?.data?.length) throw new Error('No BLS data');
      const latest = series.data[0];
      const value = parseFloat(latest.value);
      const timestamp = `${latest.year}-${String(latest.period).replace('M','').padStart(2,'0')}-01`;
      return _norm(value, 'BLS', seriesId, 'confirmed', timestamp, true);
    } catch (err) {
      console.warn(`[GeoWire] BLS fallback (${seriesId}):`, err.message);
      return null;
    }
  }

  // ─── AI EXPLAIN STUB ──────────────────────────────────────────────────────────
  // Calls an AI explanation endpoint for any GeoWire topic.
  // Currently stubbed — wire to your preferred AI provider (Anthropic, OpenAI, etc.)
  // Expected response shape: { explanation: string, sources: string[], confidence: 'high'|'medium'|'low' }
  async function fetchAIExplain(topic, context) {
    const AI_API_KEY = ''; // Set your AI provider key here
    const AI_API_URL = ''; // Set your AI provider endpoint here

    if (!AI_API_KEY || !AI_API_URL) {
      console.warn('[GeoWire] AI Explain not configured — returning stub. Set AI_API_KEY and AI_API_URL in api.js.');
      // Return a stub explanation so the UI can still render
      return {
        explanation: `This is a stub AI explanation for "${topic}". Configure AI_API_KEY and AI_API_URL in api.js to enable live explanations from your preferred AI provider.`,
        sources: ['GeoWire seed data'],
        confidence: 'low',
        stub: true,
      };
    }

    try {
      const prompt = `You are GeoWire's geopolitical intelligence analyst. Explain the following in 2-3 clear sentences for a non-expert reader.\n\nTopic: ${topic}\nContext: ${context || ''}`;
      const res = await fetch(AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AI_API_KEY}` },
        body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], max_tokens: 200 }),
      });
      if (!res.ok) throw new Error(`AI Explain HTTP ${res.status}`);
      const json = await res.json();
      const text = json.choices?.[0]?.message?.content || json.content?.[0]?.text || 'No explanation returned.';
      return { explanation: text.trim(), sources: ['AI model'], confidence: 'medium', stub: false };
    } catch (err) {
      console.warn('[GeoWire] AI Explain error:', err.message);
      return { explanation: 'Explanation temporarily unavailable.', sources: [], confidence: 'low', stub: true };
    }
  }

  // ─── FETCH EXCHANGE RATES (IRR, EUR, GBP, JPY vs USD) ────────────────────────
  // Open ExchangeRate-API — FREE, no key required, CORS supported.
  // Updates once per day. Perfect for Iranian Rial tracking.
  async function fetchExchangeRates() {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error(`ExchangeRate HTTP ${res.status}`);
      const json = await res.json();
      const rates = json.rates || {};
      return {
        IRR: rates.IRR || null,   // Iranian Rial — key for GeoWire conflict tracking
        EUR: rates.EUR || null,
        GBP: rates.GBP || null,
        JPY: rates.JPY || null,
        CNY: rates.CNY || null,
        SAR: rates.SAR || null,   // Saudi Riyal
        AED: rates.AED || null,   // UAE Dirham
        source: 'ExchangeRate-API',
        lastUpdate: json.time_last_update_utc || null,
        isLive: true,
      };
    } catch (err) {
      console.warn('[GeoWire] ExchangeRate fallback:', err.message);
      return null;
    }
  }

  // ─── FETCH ALPHA VANTAGE (via /api/alphavantage proxy) ───────────────────────
  // Requires ALPHA_VANTAGE_KEY in Vercel env vars (free at alphavantage.co).
  // Free tier: 25 requests/day. Use sparingly — call once on page load.
  async function fetchAlphaVantage(fn, symbol, interval = 'daily') {
    try {
      const url = `/api/alphavantage?fn=${encodeURIComponent(fn)}&symbol=${encodeURIComponent(symbol)}&interval=${interval}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`AV proxy HTTP ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      return json;
    } catch (err) {
      console.warn(`[GeoWire] Alpha Vantage fallback (${symbol}):`, err.message);
      return null;
    }
  }

  // ─── FETCH POLYMARKET (conflict/ceasefire prediction markets) ─────────────────
  // Free public API — no key needed. Returns market prices for GeoWire predictions.
  async function fetchPolymarket(slug) {
    try {
      const url = `https://gamma-api.polymarket.com/markets?slug=${encodeURIComponent(slug)}&limit=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Polymarket HTTP ${res.status}`);
      const json = await res.json();
      const market = Array.isArray(json) ? json[0] : (json.markets?.[0] || null);
      if (!market) throw new Error('No Polymarket data');
      return {
        slug,
        question: market.question || market.title || slug,
        probability: market.outcomePrices ? parseFloat(market.outcomePrices[0]) : null,
        volume: market.volume24hr || market.volumeNum || null,
        source: 'Polymarket',
        isLive: true,
      };
    } catch (err) {
      console.warn(`[GeoWire] Polymarket fallback (${slug}):`, err.message);
      return null;
    }
  }

  // ─── FETCH RELIEFWEB (humanitarian crisis data) ───────────────────────────────
  // Free UN API — no key required, CORS supported.
  // Returns latest humanitarian reports and situation updates for a country/crisis.
  async function fetchReliefWeb(query, limit = 5) {
    try {
      const url = 'https://api.reliefweb.int/v1/reports?appname=geowire&profile=minimal&preset=latest&slim=1';
      const body = {
        query: { value: query, operator: 'AND' },
        fields: { include: ['title', 'date', 'source', 'url_alias', 'body-html'] },
        filter: { field: 'language.code', value: 'en' },
        limit,
        sort: ['date:desc'],
      };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`ReliefWeb HTTP ${res.status}`);
      const json = await res.json();
      return (json.data || []).map(item => ({
        title: item.fields?.title || 'Untitled',
        date: item.fields?.date?.created || null,
        source: (item.fields?.source || []).map(s => s.name).join(', ') || 'UN OCHA',
        url: `https://reliefweb.int${item.fields?.url_alias || ''}`,
        summary: (item.fields?.['body-html'] || '').replace(/<[^>]+>/g, '').slice(0, 200) + '...',
      }));
    } catch (err) {
      console.warn(`[GeoWire] ReliefWeb fallback (${query}):`, err.message);
      return null;
    }
  }

  return {
    fetchFRED, fetchWorldBankGold, fetchCoinGecko, fetchGDELT,
    loadMarketData, loadNews, fetchAllRecessionData,
    fetchEIA, fetchBLS, fetchNewsAPI, fetchAIExplain,
    fetchExchangeRates, fetchAlphaVantage, fetchPolymarket, fetchReliefWeb,
    FRED_SERIES,
  };
})();

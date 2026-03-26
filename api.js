// api.js — GeoWire external data fetching
// Each function: async, try/catch, silent fallback to content.js seed data.

const API = (() => {

  const FRED_KEY  = 'f8f377edb471980ac3d88f219145c071';
  const EIA_KEY   = ''; // Register at eia.gov/developer
  const FRED_BASE = 'https://api.stlouisfed.org/fred/series/observations';
  const COINGECKO_BASE = 'https://api.coingecko.com/api/v3/simple/price';
  const GDELT_BASE     = 'https://api.gdeltproject.org/api/v2/doc/doc';

  const FRED_SERIES = {
    treasury:         'DGS10',
    dollar:           'DTWEXBGS',
    sp500:            'SP500',
    gold:             'GOLDAMGBD228NLBM',
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

  // ─── FETCH FRED ──────────────────────────────────────────────────────────────
  async function fetchFRED(seriesId) {
    const key = Object.keys(FRED_SERIES).find(k => FRED_SERIES[k] === seriesId);
    const fallback = (GEOWIRE.marketData || {})[key] || {};
    try {
      const url = `${FRED_BASE}?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`FRED HTTP ${res.status}`);
      const json = await res.json();
      const obs = json.observations?.[0];
      if (!obs || obs.value === '.') throw new Error('No FRED data');
      return _norm(parseFloat(obs.value), 'FRED', fallback.label || seriesId, 'confirmed', obs.date, true);
    } catch (err) {
      console.warn(`[GeoWire] FRED fallback (${seriesId}):`, err.message);
      return _norm(fallback.value, 'FRED (cached)', fallback.label || seriesId, fallback.confidence || 'confirmed', fallback.lastUpdated, false);
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
        fetchFRED(FRED_SERIES.gold),
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

    await Promise.allSettled(promises);
    return results;
  }

  // ─── FETCH EIA ────────────────────────────────────────────────────────────────
  async function fetchEIA(seriesId) {
    if (!EIA_KEY) {
      console.warn('[GeoWire] EIA key not set — returning null. Register at eia.gov/developer.');
      return null;
    }
    try {
      const url = `https://api.eia.gov/v2/seriesid/${encodeURIComponent(seriesId)}?api_key=${EIA_KEY}&data[0]=value&sort[0][column]=period&sort[0][direction]=desc&length=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`EIA HTTP ${res.status}`);
      const json = await res.json();
      const obs = json.response?.data?.[0];
      if (!obs) throw new Error('No EIA data');
      return _norm(parseFloat(obs.value), 'EIA', seriesId, 'confirmed', obs.period, true);
    } catch (err) {
      console.warn(`[GeoWire] EIA fallback (${seriesId}):`, err.message);
      return null;
    }
  }

  // ─── FETCH NEWS API ───────────────────────────────────────────────────────────
  async function fetchNewsAPI(query) {
    const NEWS_API_KEY = ''; // Register at newsapi.org
    if (!NEWS_API_KEY) {
      console.warn('[GeoWire] NewsAPI key not set — returning null. Register at newsapi.org.');
      return null;
    }
    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=6&apiKey=${NEWS_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`NewsAPI HTTP ${res.status}`);
      const json = await res.json();
      const articles = json.articles || [];
      if (!articles.length) throw new Error('No NewsAPI results');
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

  return { fetchFRED, fetchCoinGecko, fetchGDELT, loadMarketData, loadNews, fetchAllRecessionData, fetchEIA, fetchNewsAPI, fetchAIExplain, FRED_SERIES };
})();

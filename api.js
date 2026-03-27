// api.js — GeoWire external data fetching
// Each function: async, try/catch, silent fallback to content.js, returns { data, isLive }
// Structured for future serverless migration (just change endpoint URL)

const API = (() => {

  const FRED_KEY = 'f8f377edb471980ac3d88f219145c071';
  const EIA_KEY  = 'PLACEHOLDER_EIA_KEY'; // TODO: register at eia.gov/developer
  const FRED_BASE = 'https://api.stlouisfed.org/fred/series/observations';
  const COINGECKO_BASE = 'https://api.coingecko.com/api/v3/simple/price';
  const GDELT_BASE = 'https://api.gdeltproject.org/api/v2/doc/doc';
  const EIA_BASE  = 'https://api.eia.gov/v2/';

  // FRED series IDs used sitewide
  const FRED_SERIES = {
    treasury: 'DGS10',
    dollar:   'DTWEXBGS',
    sp500:    'SP500',
    gold:     'GOLDAMGBD228NLBM',
  };

  // ─── NORMALIZE OUTPUT ────────────────────────────────────────────────────────
  function _norm(value, source, label, confidence, timestamp, isLive) {
    return { value, source, label, confidence, timestamp, isLive };
  }

  // ─── FETCH FRED ──────────────────────────────────────────────────────────────
  // Returns latest observation for a FRED series.
  // Fallback: matching value from GEOWIRE.marketData
  async function fetchFRED(seriesId) {
    const key = Object.keys(FRED_SERIES).find(k => FRED_SERIES[k] === seriesId);
    const fallback = GEOWIRE.marketData[key] || {};
    try {
      const url = `${FRED_BASE}?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`FRED HTTP ${res.status}`);
      const json = await res.json();
      const obs = json.observations?.[0];
      if (!obs || obs.value === '.') throw new Error('No FRED data');
      const value = parseFloat(obs.value);
      return _norm(value, 'FRED', fallback.label || seriesId, 'confirmed', obs.date, true);
    } catch (err) {
      console.warn(`[GeoWire] FRED fallback (${seriesId}):`, err.message);
      return _norm(fallback.value, 'FRED (cached)', fallback.label || seriesId, fallback.confidence || 'confirmed', fallback.lastUpdated, false);
    }
  }

  // ─── FETCH COINGECKO ─────────────────────────────────────────────────────────
  // Fetches BTC and ETH prices. No API key needed.
  async function fetchCoinGecko() {
    try {
      const url = `${COINGECKO_BASE}?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);
      const json = await res.json();
      return {
        bitcoin: _norm(json.bitcoin?.usd, 'CoinGecko', 'Bitcoin', 'multisource', new Date().toISOString(), true),
        ethereum: _norm(json.ethereum?.usd, 'CoinGecko', 'Ethereum', 'multisource', new Date().toISOString(), true),
        isLive: true,
      };
    } catch (err) {
      console.warn('[GeoWire] CoinGecko fallback:', err.message);
      const btc = GEOWIRE.marketData.bitcoin;
      return {
        bitcoin: _norm(btc?.value, 'CoinGecko (cached)', 'Bitcoin', 'multisource', btc?.lastUpdated, false),
        ethereum: _norm(null, 'CoinGecko (cached)', 'Ethereum', 'multisource', null, false),
        isLive: false,
      };
    }
  }

  // ─── FETCH GDELT ─────────────────────────────────────────────────────────────
  // Returns top 6 news items matching Iran/conflict query.
  // Fallback: GEOWIRE.newsCards seed data
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
        timestamp: a.seendate ? new Date(a.seendate.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z')).toISOString() : new Date().toISOString(),
        url: a.url || '#',
      }));
      return { data, isLive: true };
    } catch (err) {
      console.warn('[GeoWire] GDELT fallback:', err.message);
      return { data: GEOWIRE.newsCards, isLive: false };
    }
  }

  // ─── FETCH EIA ───────────────────────────────────────────────────────────────
  // Fetches energy data from EIA API v2.
  // seriesId: e.g. 'PET.RBRTE.D' (Brent), 'PET.EMM_EPMRU_PTE_NUS_DPG.W' (US gas)
  // Fallback: GEOWIRE.marketData seed values
  async function fetchEIA(seriesId) {
    if (!EIA_KEY || EIA_KEY === 'PLACEHOLDER_EIA_KEY') {
      console.warn('[GeoWire] EIA API key not set — using seed data');
      const fallback = GEOWIRE.marketData.oil || {};
      return _norm(fallback.value, 'EIA (seed)', fallback.label || seriesId, 'confirmed', fallback.lastUpdated, false);
    }
    try {
      const url = `${EIA_BASE}seriesid/${seriesId}?api_key=${EIA_KEY}&out=json&num=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`EIA HTTP ${res.status}`);
      const json = await res.json();
      const series = json.response?.data?.[0];
      if (!series) throw new Error('No EIA data');
      return _norm(parseFloat(series.value), 'EIA', seriesId, 'confirmed', series.period, true);
    } catch (err) {
      console.warn(`[GeoWire] EIA fallback (${seriesId}):`, err.message);
      const fallback = GEOWIRE.marketData.oil || {};
      return _norm(fallback.value, 'EIA (cached)', fallback.label, 'confirmed', fallback.lastUpdated, false);
    }
  }

  // ─── LOAD ALL MARKET DATA ─────────────────────────────────────────────────────
  // Called from index.html to populate ticker. Fetches all sources in parallel.
  async function loadMarketData() {
    const [treasury, dollar, sp500, gold, crypto] = await Promise.all([
      fetchFRED(FRED_SERIES.treasury),
      fetchFRED(FRED_SERIES.dollar),
      fetchFRED(FRED_SERIES.sp500),
      fetchFRED(FRED_SERIES.gold),
      fetchCoinGecko(),
    ]);

    const anyLive = [treasury, dollar, sp500, gold].some(d => d.isLive) || crypto.isLive;

    // Update ticker badge
    const badgeEl = document.getElementById('ticker-live-badge');
    if (badgeEl) badgeEl.innerHTML = UI.renderLiveBadge(anyLive);

    // Update individual ticker items
    _updateTicker('ticker-treasury', treasury);
    _updateTicker('ticker-dollar',   dollar);
    _updateTicker('ticker-sp500',    sp500);
    _updateTicker('ticker-gold',     gold);
    if (crypto.bitcoin?.value) {
      _updateTickerRaw('ticker-bitcoin', crypto.bitcoin.value.toLocaleString(), 'USD', null, crypto.bitcoin.isLive);
    }
  }

  function _updateTicker(id, data) {
    if (!data?.value) return;
    const el = document.getElementById(id);
    if (!el) return;
    const valEl = el.querySelector('.ticker-value');
    if (valEl) valEl.innerHTML = `${data.value.toLocaleString()} <small></small>`;
  }

  function _updateTickerRaw(id, val, unit, change, isLive) {
    const el = document.getElementById(id);
    if (!el) return;
    const valEl = el.querySelector('.ticker-value');
    if (valEl) valEl.innerHTML = `${val} <small>${unit || ''}</small>`;
  }

  // ─── LOAD NEWS ───────────────────────────────────────────────────────────────
  // Loads news cards into a target container element.
  async function loadNews(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '<p class="loading-state">Loading intelligence feed...</p>';
    const { data, isLive } = await fetchGDELT();
    container.innerHTML = '';
    data.forEach(item => {
      container.insertAdjacentHTML('beforeend', UI.renderNewsCard(item));
    });
    // Update badge if exists
    const badge = document.getElementById('news-live-badge');
    if (badge) badge.innerHTML = UI.renderLiveBadge(isLive);
  }

  return { fetchFRED, fetchCoinGecko, fetchGDELT, fetchEIA, loadMarketData, loadNews, FRED_SERIES };
})();

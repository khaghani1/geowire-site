/**
 * GeoWire — api.js
 * Live data fetch helpers with silent fallback to seed data.
 * APIs: FRED (treasury/gold/dollar), CoinGecko (crypto), EIA (energy), GDELT (news)
 */

(function () {
  'use strict';
  const GW = window.GW;

  // ─── CONFIG ────────────────────────────────────────────────────────────────
  const FRED_KEY = 'f8f377edb471980ac3d88f219145c071';
  const FRED_BASE = 'https://api.stlouisfed.org/fred/series/observations';
  const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
  const EIA_BASE = 'https://api.eia.gov/v2';
  const GDELT_BASE = 'https://api.gdeltproject.org/api/v2/doc/doc';

  // FRED series IDs
  const FRED_SERIES = {
    gold:  'GOLDAMGBD228NLBM',   // Gold, London Fixing, AM, USD/troy oz
    dxy:   'DTWEXBGS',           // USD Broad Index
    us10y: 'DGS10',              // 10-Year Treasury Constant Maturity
    sp500: 'SP500',              // S&P 500
  };

  // Cache to avoid redundant fetches within the same session
  const _cache = {};
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  function cached(key, fn) {
    const now = Date.now();
    if (_cache[key] && now - _cache[key].ts < CACHE_TTL) {
      return Promise.resolve(_cache[key].value);
    }
    return fn().then(val => {
      _cache[key] = { value: val, ts: now };
      return val;
    });
  }

  // ─── FETCH WRAPPER ─────────────────────────────────────────────────────────

  function safeFetch(url, opts) {
    return fetch(url, opts || {})
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .catch(err => {
        console.warn('[GeoWire api.js] fetch failed:', url, err.message);
        return null;
      });
  }

  // ─── FRED ──────────────────────────────────────────────────────────────────

  function fredFetch(seriesId) {
    const url = `${FRED_BASE}?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&limit=1&sort_order=desc`;
    return cached(`fred:${seriesId}`, () =>
      safeFetch(url).then(data => {
        if (!data || !data.observations || !data.observations.length) return null;
        const obs = data.observations[0];
        const value = parseFloat(obs.value);
        return isNaN(value) ? null : { value, ts: obs.date };
      })
    );
  }

  async function fetchFREDData() {
    const results = {};
    const entries = Object.entries(FRED_SERIES);
    await Promise.all(entries.map(async ([key, seriesId]) => {
      const data = await fredFetch(seriesId);
      if (data) results[key] = data;
    }));
    return results;
  }

  // ─── COINGECKO ─────────────────────────────────────────────────────────────

  function fetchCryptoData() {
    const url = `${COINGECKO_BASE}/simple/price?ids=bitcoin&vs_currencies=usd&include_last_updated_at=true`;
    return cached('coingecko:btc', () =>
      safeFetch(url).then(data => {
        if (!data || !data.bitcoin) return null;
        return {
          btc: {
            value: data.bitcoin.usd,
            ts: new Date(data.bitcoin.last_updated_at * 1000).toISOString(),
          },
        };
      }).catch(() => null)
    );
  }

  // ─── EIA ───────────────────────────────────────────────────────────────────

  function fetchEIAData() {
    // EIA v2 petroleum prices — Weekly US regular gasoline
    // Series: EER_EPMRR_PF4_Y05SF_DPG (Regular Gasoline, US, $/gal)
    const url = `${EIA_BASE}/petroleum/pri/gnd/data/?frequency=weekly&data[0]=value&facets[duoarea][]=NUS&facets[product][]=EPM0&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=1&api_key=DEMO_KEY`;
    return cached('eia:gasoline', () =>
      safeFetch(url).then(data => {
        if (!data || !data.response || !data.response.data || !data.response.data.length) return null;
        const row = data.response.data[0];
        return {
          gas_us: {
            value: parseFloat(row.value),
            ts: row.period,
          },
        };
      }).catch(() => null)
    );
  }

  // ─── WTI/BRENT PROXY ───────────────────────────────────────────────────────
  // Use FRED's DCOILWTICO for WTI crude
  function fetchOilData() {
    return cached('fred:wti-brent', async () => {
      const wtiUrl = `${FRED_BASE}?series_id=DCOILWTICO&api_key=${FRED_KEY}&file_type=json&limit=1&sort_order=desc`;
      const brentUrl = `${FRED_BASE}?series_id=DCOILBRENTEU&api_key=${FRED_KEY}&file_type=json&limit=1&sort_order=desc`;

      const [wtiData, brentData] = await Promise.all([
        safeFetch(wtiUrl),
        safeFetch(brentUrl),
      ]);

      const result = {};

      if (wtiData && wtiData.observations && wtiData.observations.length) {
        const v = parseFloat(wtiData.observations[0].value);
        if (!isNaN(v)) result.wti = { value: v, ts: wtiData.observations[0].date };
      }

      if (brentData && brentData.observations && brentData.observations.length) {
        const v = parseFloat(brentData.observations[0].value);
        if (!isNaN(v)) result.brent = { value: v, ts: brentData.observations[0].date };
      }

      return Object.keys(result).length ? result : null;
    });
  }

  // ─── GDELT NEWS HEADLINES ──────────────────────────────────────────────────

  function fetchGDELTHeadlines(query, maxRecords) {
    query = query || 'Iran+conflict+operation';
    maxRecords = maxRecords || 10;
    const url = `${GDELT_BASE}?query=${encodeURIComponent(query)}&mode=ArtList&maxrecords=${maxRecords}&sort=DateDesc&format=json`;
    return cached(`gdelt:${query}`, () =>
      safeFetch(url).then(data => {
        if (!data || !data.articles) return [];
        return data.articles.map(a => ({
          title: a.title,
          url: a.url,
          source: a.domain,
          date: a.seendate,
          lang: a.language,
        }));
      }).catch(() => [])
    );
  }

  // ─── MERGE WITH SEED ───────────────────────────────────────────────────────

  function mergeWithSeed(liveData) {
    const merged = {};
    Object.keys(GW.seedData).forEach(key => {
      const seed = GW.seedData[key];
      const live = liveData && liveData[key];
      if (live && live.value != null) {
        merged[key] = {
          ...seed,
          value: live.value,
          ts: live.ts || seed.ts,
          isLive: true,
        };
      } else {
        merged[key] = { ...seed, isLive: false };
      }
    });
    return merged;
  }

  // ─── FETCH ALL ─────────────────────────────────────────────────────────────

  async function fetchAll() {
    const [fredData, oilData, cryptoData] = await Promise.all([
      fetchFREDData().catch(() => ({})),
      fetchOilData().catch(() => null),
      fetchCryptoData().catch(() => null),
    ]);

    const combined = {
      ...fredData,
      ...(oilData || {}),
      ...(cryptoData || {}),
    };

    return mergeWithSeed(combined);
  }

  // ─── IS ANY LIVE ───────────────────────────────────────────────────────────

  function isAnyLive(mergedData) {
    return Object.values(mergedData).some(d => d.isLive);
  }

  // ─── EXPORT ────────────────────────────────────────────────────────────────
  GW.api = {
    fetchAll,
    fetchFREDData,
    fetchOilData,
    fetchCryptoData,
    fetchEIAData,
    fetchGDELTHeadlines,
    mergeWithSeed,
    isAnyLive,
    FRED_KEY,
  };

  window.GW = GW;
})();

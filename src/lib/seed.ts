
// Pre-war baselines (Feb 27, 2026 closing prices) — VERIFIED
export const BASELINE = {
  brent: 68, wti: 64, dubai: 65, urals: 42,
  us_gas: 2.98, ca_gas: 4.20, diesel: 3.50,
  henry_hub: 2.80, jkm: 13.8, ttf: 11.6,
  urea: 320, dap: 520,
  wheat: 5.40, corn: 4.20, soybeans: 10.20,
  gold: 5226, silver: 84, copper: 4.10,
  sp500: 6879, nasdaq: 22668, dow: 48978,
  treasury_10y: 4.20, treasury_2y: 3.95,
  dxy: 101.3,
  btc: 65500, eth: 2500,
  vlcc_day: 35000, baltic_dry: 1450,
  hormuz_oil_flow: 20, hormuz_lng_flow: 5.2,
  vix: 18,
  spr: 415.4,
  war_start: '2026-02-28',
};

// Seed current data (March 22, 2026 — Day 24) — VERIFIED against live sources
export const SEED_LATEST: Array<{
  id: string; value: number;
  baseline: number; label: string; unit: string; category: string; source: string;
}> = [
  // Energy - Oil (Brent: CNBC $112.11, WTI: Investing.com $98.48)
  { id: 'oil.brent', value: 112, baseline: 68, label: 'Brent Crude', unit: '$/bbl', category: 'energy', source: 'Bloomberg' },
  { id: 'oil.wti', value: 98, baseline: 64, label: 'WTI Crude', unit: '$/bbl', category: 'energy', source: 'Bloomberg' },
  { id: 'oil.dubai', value: 135, baseline: 65, label: 'Dubai Crude', unit: '$/bbl', category: 'energy', source: 'Bloomberg' },
  { id: 'oil.urals', value: 57, baseline: 42, label: 'Urals Crude', unit: '$/bbl', category: 'energy', source: 'Reuters' },
  // Energy - Gas (AAA: $3.88 national, $5.34 CA)
  { id: 'gas.national', value: 3.88, baseline: 2.98, label: 'US Gas Avg', unit: '$/gal', category: 'energy', source: 'AAA' },
  { id: 'gas.california', value: 5.34, baseline: 4.20, label: 'CA Gas', unit: '$/gal', category: 'energy', source: 'AAA' },
  { id: 'gas.diesel', value: 5.19, baseline: 3.50, label: 'US Diesel', unit: '$/gal', category: 'energy', source: 'AAA' },
  { id: 'gas.henry_hub', value: 4.85, baseline: 2.80, label: 'Henry Hub NG', unit: '$/MMBtu', category: 'energy', source: 'NYMEX' },
  // Fertilizer (DTN: urea retail $674, futures $618)
  { id: 'fert.urea', value: 620, baseline: 320, label: 'Urea', unit: '$/ton', category: 'commodity', source: 'CBOT' },
  { id: 'fert.dap', value: 780, baseline: 520, label: 'DAP', unit: '$/ton', category: 'commodity', source: 'World Bank' },
  // Food (CBOT: wheat ~$6.17-6.20, corn volatile)
  { id: 'food.wheat', value: 6.20, baseline: 5.40, label: 'Wheat', unit: '$/bu', category: 'commodity', source: 'CBOT' },
  { id: 'food.corn', value: 5.10, baseline: 4.20, label: 'Corn', unit: '$/bu', category: 'commodity', source: 'CBOT' },
  { id: 'food.soybeans', value: 12.40, baseline: 10.20, label: 'Soybeans', unit: '$/bu', category: 'commodity', source: 'CBOT' },
  // Metals (Gold: $4,494 COMEX, Silver: $69.66)
  { id: 'metal.gold', value: 4494, baseline: 5226, label: 'Gold', unit: '$/oz', category: 'metal', source: 'COMEX' },
  { id: 'metal.silver', value: 70, baseline: 84, label: 'Silver', unit: '$/oz', category: 'metal', source: 'COMEX' },
  { id: 'metal.copper', value: 4.85, baseline: 4.10, label: 'Copper', unit: '$/lb', category: 'metal', source: 'COMEX' },
  // Markets (S&P: 6,506 Yahoo, Nasdaq: 21,648, Dow: 45,577, VIX: 26.78)
  { id: 'market.sp500', value: 6506, baseline: 6879, label: 'S&P 500', unit: '', category: 'market', source: 'Yahoo Finance' },
  { id: 'market.nasdaq', value: 21648, baseline: 22668, label: 'Nasdaq', unit: '', category: 'market', source: 'Yahoo Finance' },
  { id: 'market.dow', value: 45577, baseline: 48978, label: 'Dow Jones', unit: '', category: 'market', source: 'Yahoo Finance' },
  { id: 'market.vix', value: 27, baseline: 18, label: 'VIX', unit: '', category: 'market', source: 'CBOE' },
  // Rates & FX (10Y: 4.39% FRED, DXY: 99.5 Yahoo)
  { id: 'rate.10y', value: 4.39, baseline: 4.20, label: '10Y Treasury', unit: '%', category: 'rate', source: 'FRED' },
  { id: 'rate.2y', value: 4.15, baseline: 3.95, label: '2Y Treasury', unit: '%', category: 'rate', source: 'FRED' },
  { id: 'fx.dxy', value: 99.5, baseline: 101.3, label: 'Dollar Index', unit: '', category: 'fx', source: 'ICE' },
  // Crypto (BTC: $68,951, ETH: $2,082)
  { id: 'crypto.btc', value: 68951, baseline: 65500, label: 'Bitcoin', unit: '$', category: 'crypto', source: 'CoinGecko' },
  { id: 'crypto.eth', value: 2082, baseline: 2500, label: 'Ethereum', unit: '$', category: 'crypto', source: 'CoinGecko' },
  // Shipping
  { id: 'ship.vlcc', value: 85000, baseline: 35000, label: 'VLCC Day Rate', unit: '$', category: 'shipping', source: 'Clarkson' },
  { id: 'ship.baltic', value: 1680, baseline: 1450, label: 'Baltic Dry', unit: '', category: 'shipping', source: 'Baltic Exchange' },
  // Hormuz (CNBC: trickle, ~21 tankers since war began)
  { id: 'hormuz.oil', value: 0.6, baseline: 20, label: 'Oil Flow', unit: 'M bbl/d', category: 'hormuz', source: 'Kpler' },
  { id: 'hormuz.lng', value: 0.3, baseline: 5.2, label: 'LNG Flow', unit: 'Bcf/d', category: 'hormuz', source: 'Kpler' },
  // SPR
  { id: 'spr.level', value: 395, baseline: 415.4, label: 'US SPR Level', unit: 'M bbl', category: 'energy', source: 'EIA' },
];

// Text/complex metrics
export const SEED_METRICS: Array<{ key: string; value: string; label: string; category: string; source: string }> = [
  // War stats
  { key: 'war.day', value: '23', label: 'Day of War', category: 'war', source: 'Calculated' },
  { key: 'war.targets', value: '8000', label: 'US Targets Struck', category: 'war', source: 'CENTCOM' },
  { key: 'war.us.kia', value: '13', label: 'US KIA', category: 'war', source: 'CENTCOM' },
  { key: 'war.us.wounded', value: '140', label: 'US Wounded', category: 'war', source: 'CENTCOM' },
  { key: 'war.cost.daily', value: '1.75', label: 'Daily Cost ($B)', category: 'war', source: 'Pentagon est.' },
  { key: 'war.cost.total', value: '40.25', label: 'Total Cost ($B)', category: 'war', source: 'Calculated' },
  { key: 'war.budget.request', value: '200', label: 'Pentagon Budget Ask ($B)', category: 'war', source: 'Pentagon' },
  { key: 'war.ultimatum', value: '48hr power plant strike threat - Mar 21', label: 'Active Ultimatum', category: 'war', source: 'Truth Social' },
  { key: 'war.basij.killed', value: '4500', label: 'Basij/IRGC Killed', category: 'war', source: 'IDF est' },
  // Humanitarian
  { key: 'iran.dead.hrana', value: '3220', label: 'Deaths (HRANA)', category: 'humanitarian', source: 'HRANA' },
  { key: 'iran.dead.hengaw', value: '5900', label: 'Deaths (Hengaw)', category: 'humanitarian', source: 'Hengaw' },
  { key: 'iran.dead.govt', value: '1500', label: 'Deaths (Iran Govt)', category: 'humanitarian', source: 'Health Min' },
  { key: 'iran.dead.aljazeera', value: '1444', label: 'Deaths (AJ Tracker)', category: 'humanitarian', source: 'Al Jazeera' },
  { key: 'iran.dead.civilian', value: '1398', label: 'Civilian Dead', category: 'humanitarian', source: 'HRANA' },
  { key: 'iran.dead.children', value: '210', label: 'Children Dead', category: 'humanitarian', source: 'HRANA' },
  { key: 'iran.wounded', value: '12000', label: 'Wounded', category: 'humanitarian', source: 'Red Crescent' },
  { key: 'iran.displaced', value: '3200000', label: 'Displaced', category: 'humanitarian', source: 'UNHCR' },
  { key: 'iran.internet.pct', value: '1', label: 'Internet %', category: 'humanitarian', source: 'NetBlocks' },
  { key: 'iran.arrests', value: '195', label: 'Wartime Arrests', category: 'humanitarian', source: 'HRANA' },
  { key: 'iran.executions', value: '3', label: 'Protest Executions', category: 'humanitarian', source: 'HRANA' },
  // Hormuz text metrics
  { key: 'hormuz.tankers', value: '150', label: 'Tankers Stranded', category: 'hormuz', source: 'MarineTraffic' },
  { key: 'hormuz.insurance', value: 'WITHDRAWN', label: 'Insurance Status', category: 'hormuz', source: 'Lloyds' },
  { key: 'hormuz.transit.cost', value: '2000000', label: 'Transit Fee ($)', category: 'hormuz', source: 'Reuters' },
  { key: 'qatar.lng.lost.pct', value: '17', label: 'Qatar LNG Lost %', category: 'gcc', source: 'QatarEnergy' },
  // Geopolitical
  { key: 'geo.russia', value: 'Urals above benchmark, +$10B/2wk, sanctions lifted', category: 'geopolitical', label: 'Russia Position', source: 'Multiple' },
  { key: 'geo.china', value: '108 days reserves, ships transiting with Iranian permission', category: 'geopolitical', label: 'China Position', source: 'CNBC' },
  // IEA
  { key: 'iea.release', value: '400', label: 'IEA SPR Release (M bbl)', category: 'energy', source: 'IEA' },
];


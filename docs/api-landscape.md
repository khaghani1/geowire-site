# GeoWire API Landscape — Complete Intelligence Stack
*Last updated: 2026-03-26 | Status: Active conflict, Hormuz 97% closed*

---

## STATUS SUMMARY: What We Have vs. What We Need

| Category | Have | Need | Priority |
|---|---|---|---|
| Macro / US Economy | ✅ FRED, BLS, AlphaVantage | — | Done |
| Energy prices | ✅ EIA | Ship tracking, cargo flows | HIGH |
| News | ✅ NewsAPI | Real-time Reuters/AP | MEDIUM |
| Prediction markets | ✅ Kalshi (just deployed) | Polymarket | MEDIUM |
| Ship tracking (Hormuz) | ❌ None | AIS / MarineTraffic | CRITICAL |
| Freight rates | ❌ None | Baltic Exchange, Freightos | HIGH |
| Supply chain signals | ❌ None | PMI, port congestion | HIGH |
| Humanitarian | ⏳ ReliefWeb (pending) | — | MEDIUM |
| Commodity spot prices | Partial (EIA for oil) | LME metals, ag commodities | MEDIUM |
| Geopolitical event data | ❌ None | GDELT, ACLED | MEDIUM |

---

## 1. SHIP TRACKING — THE HORMUZ QUESTION

**Why this matters:** The Hormuz Strait closure is the single biggest supply factor driving GeoWire's recession model. AIS (Automatic Identification System) data tells us how many tankers are actually transiting vs. anchored/diverted.

### Option A: MarineTraffic
- **URL:** https://www.marinetraffic.com/en/ais-api
- **What it gives:** Real-time vessel positions, voyage data, port calls, Hormuz transit counts
- **Free tier:** Very limited (1,000 calls/month). Enough for daily snapshots.
- **Paid:** From $50/month for basic AIS. $500+/month for full fleet tracking.
- **Best endpoint:** `getVesselsInArea` — pass a bounding box around the Strait of Hormuz (lat: 25.5–27.5, lon: 55.5–57.5) to count active tankers
- **Register:** https://www.marinetraffic.com/en/users/login (API key in account settings)
- **GeoWire use:** Query daily, store last 7 days, show "vessels in transit" vs. pre-war baseline (21M bbl/day = ~15 VLCCs/day)

### Option B: VesselFinder
- **URL:** https://www.vesselfinder.com/api
- **Free tier:** 500 req/month
- **Similar to MarineTraffic but cheaper.** $30/month for 10K calls.

### Option C: AISHub (Free)
- **URL:** https://www.aishub.net/api
- **Free** with attribution. Data can be 15–30 min delayed.
- **Best free option** for Hormuz vessel count snapshots.
- **Register:** https://www.aishub.net/join-us

### Option D: Kpler (What content.js already cites)
- **Enterprise only** — $50K+/year. Data provider for Bloomberg/Reuters.
- **Not practical** for GeoWire at this stage. Keep citing for sourcing; don't integrate.

### Option E: Datalastic (Recommended for GeoWire)
- **URL:** https://datalastic.com/api/
- **Free tier:** 100 req/month
- **Paid:** $29/month for 10K calls
- **Key endpoint:** `/api/v0/vessel/find-in-zone` — Hormuz zone query
- **Register:** https://datalastic.com/

**Recommendation:** Start with **AISHub** (free) for Hormuz vessel count. If traffic grows, upgrade to **Datalastic** ($29/mo).

---

## 2. FREIGHT RATES

**Why this matters:** War risk premiums, rerouting costs, and container rate spikes are direct inputs to the `supplyLogistics` factor in the recession model.

### Baltic Exchange Indices
- **What:** The gold standard for dry bulk (BDI) and tanker (BDTI) freight rates
- **Free access:** Index values are published daily on https://www.balticexchange.com/en/index.html
- **API:** No public API. Data licensed to Bloomberg/Reuters.
- **Alternative:** **Quandl/Nasdaq Data Link** has historical BDI — `CHRIS/BLTBDI`
  - Free tier: 50 calls/day
  - URL: https://data.nasdaq.com/data/CHRIS/BLTBDI

### Freightos Baltic Index (FBX)
- **What:** Container shipping rates (Shanghai→LA, Shanghai→Rotterdam, etc.)
- **Free:** Weekly index published at https://fbx.freightos.com/
- **API:** No public API, but Freightos has a developer program
- **Alternative:** World Container Index from Drewry — https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry

### Xeneta / Spot Rates
- **Enterprise only** but publishes weekly reports. Scrape-friendly.

**Recommendation:** Use **Nasdaq Data Link** for BDI (free, 50 calls/day). Manually update FBX weekly from Freightos public data.

---

## 3. SUPPLY CHAIN SIGNALS

### PMI (Purchasing Managers' Index)
- **Best source:** ISM Manufacturing PMI — free monthly
- **API:** No dedicated API. FRED has it: `series_id=MANEMP` and `NAPM` (ISM PMI)
- **Direct:** https://www.ismworld.org/supply-management-news-and-reports/reports/ism-report-on-business/
- **Already covered:** BLS + FRED proxies already built. Add `NAPM` to FRED series list.

### Port Congestion
- **Marine Traffic** (see above) — vessels at anchor near major ports
- **Port of LA/LB:** https://www.portoflosangeles.org/business/statistics — free monthly stats
- **Alternative:** **Project44** / **FourKites** — enterprise supply chain visibility. Not practical.

### Global Supply Chain Pressure Index (GSCPI)
- **Source:** New York Fed — free!
- **URL:** https://www.newyorkfed.org/research/policy/gscpi
- **Data file:** CSV downloadable at https://www.newyorkfed.org/medialibrary/research/interactives/gscpi/downloads/gscpi_data.xlsx
- **Update frequency:** Monthly
- **GeoWire integration:** Fetch the CSV monthly, use latest value as input to `supplyLogistics` factor score

---

## 4. COMMODITY PRICES (Beyond Oil)

### World Bank Commodity Prices
- **URL:** https://www.worldbank.org/en/research/commodity-markets
- **API:** https://api.worldbank.org/v2/en/indicator/ — free, no key required
- **Key commodities:** Wheat (PWHEAMT), Natural gas (PNGASEU for EU), Fertilizer (PNRG)
- **Example:** `https://api.worldbank.org/v2/en/indicator/PWHEAMT?downloadformat=json`
- **Already buildable** with the existing proxy pattern, no new key needed

### LME Metals (Copper, Aluminum, etc.)
- **LME official:** Enterprise only
- **Free alternative:** **Metals-API** — https://metals-api.com/
  - Free tier: 100 req/month. No key for basic access.
  - Covers: Gold, Silver, Copper, Aluminum, Nickel
- **Alternative:** **Yahoo Finance** via existing AlphaVantage proxy (`COPPER`, `ALUMINUM` futures)

### Agricultural Commodities (CME)
- **Already covered:** AlphaVantage can fetch `WHEAT`, `CORN`, `SOYBN` via `GLOBAL_QUOTE`
- **Add to existing AlphaVantage proxy calls**

---

## 5. GEOPOLITICAL EVENT DATA

### GDELT Project (Free)
- **What:** Real-time news event database. 15-minute updates. Covers conflict events, diplomatic signals, protests.
- **URL:** https://www.gdeltproject.org/
- **API:** https://api.gdeltproject.org/api/v2/doc/doc — free, no key!
- **Key query for GeoWire:** Events near Iran, ceasefire mentions, Hormuz mentions
- **Example:** `https://api.gdeltproject.org/api/v2/doc/doc?query=Hormuz&mode=artlist&maxrecords=10&format=json`
- **GeoWire integration:** Feed into `globalSpillovers` and `outsideBox` factor scores

### ACLED (Armed Conflict Location & Event Data)
- **What:** Structured conflict event data — battles, airstrikes, protests, civilian targeting
- **Free tier:** Academic/non-commercial use. Apply at https://acleddata.com/register/
- **API:** REST API with `event_type=Air/drone strike` filter for Iran
- **Update frequency:** Daily
- **GeoWire use:** Count daily airstrike events as input to conflict intensity score

### ReliefWeb (Pending approval)
- **Status:** Application submitted for appname `geowire-disasters-x7k2`
- **Proxy:** `/api/reliefweb.js` already built
- **Action:** Monitor email for approval (~1 business day from submission)

---

## 6. PREDICTION MARKETS (Beyond Kalshi)

### Polymarket
- **What:** Crypto-based prediction market. Often has markets Kalshi doesn't (more geopolitical focus).
- **API:** https://docs.polymarket.com/#introduction — public, no key required!
- **Key endpoint:** `GET https://gamma-api.polymarket.com/markets?closed=false&limit=100`
- **Key markets to track:**
  - Hormuz open by [date]
  - Ceasefire by [date]
  - Iran leadership change
  - Oil above $X by [date]
- **Proxy needed:** Add `/api/polymarket.js` — no auth required, just CORS bypass
- **Priority: HIGH** — Polymarket often leads Kalshi on geopolitical events

### Metaculus
- **What:** Aggregated forecasting platform. Good for longer-term structural questions.
- **API:** Free — https://www.metaculus.com/api2/
- **Key questions:** Recession probability, conflict duration
- **Lower priority** than Polymarket for GeoWire's use case

---

## 7. FINANCIAL MARKET SIGNALS (Enhancing Existing)

### VIX / Fear & Greed
- **Already have:** AlphaVantage for SPY/VIX-proxy
- **Add:** CNN Fear & Greed API — https://fear-and-greed-index.p.rapidapi.com/v1/fgi
  - RapidAPI: Free tier 100 calls/month
  - Single number 0–100 — good for recession model `marketSignals`

### Credit Spreads (IG/HY)
- **FRED has this:** `BAMLH0A0HYM2` (HY OAS), `BAMLC0A0CM` (IG OAS)
- **Already covered** by existing FRED proxy — just add to `corporateCredit.fredSeries`

### Dollar Index (DXY)
- **FRED:** `DTWEXBGS` — already available via FRED proxy

---

## 8. ENERGY — ENHANCING BEYOND EIA

### Uranium / Nuclear
- **UxC Uranium** — enterprise only
- **Alternative:** World Nuclear Association weekly spot price at https://www.world-nuclear.org/

### LNG Spot Prices (Crucial for TTF / EU gas crisis)
- **EIA publishes LNG spot:** https://www.eia.gov/dnav/ng/ng_pri_sum_dcu_nus_m.htm
- **Already covered** via EIA proxy — add LNG series IDs

### OPEC Production Data
- **OPEC Monthly Oil Market Report** — free PDF, not a clean API
- **Alternative:** EIA Short-Term Energy Outlook — `https://api.eia.gov/v2/steo/data/` (already have EIA key)

---

## 9. HUMANITARIAN & CONFLICT HEALTH

### WHO Health Emergencies
- **URL:** https://www.who.int/emergencies/disease-outbreak-news
- **No API** — scraping only. Low priority.

### OCHA/ReliefWeb
- **Already:** `/api/reliefweb.js` built, pending `geowire-disasters-x7k2` appname approval

### HRANA (Iran Human Rights Activist News Agency)
- **No API** — monitor https://hrana.org/en/ manually or via NewsAPI

---

## PRIORITY ACTION LIST

### Immediate (This Week)
1. ✅ **Kalshi proxy** — deployed, KALSHI_KEY set
2. 🔄 **Polymarket proxy** — no key needed, just `/api/polymarket.js`
3. 🔄 **GSCPI data** — NY Fed CSV, monthly update, directly feeds `supplyLogistics`
4. 🔄 **World Bank commodities** — no key, feeds wheat/fertilizer/natgas scores

### Near-term (This Month)
5. ⏳ **ReliefWeb** — waiting on appname approval
6. 📋 **AISHub registration** — free Hormuz ship counter
7. 📋 **GDELT** — no key, geopolitical event feed for `globalSpillovers`
8. 📋 **Nasdaq Data Link** — BDI freight rates (free tier)

### Future (If Traffic Grows)
9. 💰 **Datalastic** ($29/mo) — real-time Hormuz AIS
10. 💰 **MarineTraffic** ($50/mo) — full ship tracking with historical
11. 💰 **ACLED** (free academic) — structured conflict events

---

## API KEY STATUS

| API | Key | Status | Notes |
|---|---|---|---|
| FRED | `process.env.FRED_KEY` | ✅ Active | Federal Reserve data |
| BLS | `process.env.BLS_KEY` | ✅ Active | Labor statistics |
| EIA | `process.env.EIA_KEY` | ✅ Active | Energy data |
| NewsAPI | `process.env.NEWS_KEY` | ✅ Active | 1000 req/day |
| AlphaVantage | `process.env.ALPHA_VANTAGE_KEY` | ✅ Active | 25 req/day |
| Kalshi | `process.env.KALSHI_KEY` | ✅ Active | Deploying now |
| Polymarket | None needed | 🔄 Build proxy | Public API |
| World Bank | None needed | 🔄 Build proxy | Public API |
| GDELT | None needed | 🔄 Build proxy | Public API |
| AISHub | Register free | 📋 To do | Ship tracking |
| ReliefWeb | `geowire-disasters-x7k2` | ⏳ Pending | ~1 day approval |
| Nasdaq Data Link | Register free | 📋 To do | BDI freight |

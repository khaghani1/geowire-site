// content.js — GeoWire single source of truth
// All seed data lives here. Pages read this; nothing hardcoded elsewhere.

const GEOWIRE = {

  // ─── SITE META ──────────────────────────────────────────────────────────────
  siteMeta: {
    title: 'GeoWire — Global Intelligence Platform',
    description: 'Real-time geopolitical intelligence tracking the US-Iran conflict, global energy markets, and crisis analytics.',
    ogImage: 'https://geowire.org/og-default.png',
    twitterHandle: '@Geowire_org',
    baseUrl: 'https://geowire.org',
    warStartDate: '2026-02-28',
    warName: 'Operation Epic Fury',
  },

  // ─── NAVIGATION ─────────────────────────────────────────────────────────────
  navigationItems: [
    { label: 'Recession',    farsiLabel: 'رکود',          href: 'recession.html',   icon: '📉' },
    { label: 'Macro',        farsiLabel: 'کلان',          href: 'macro.html',       icon: '📊' },
    { label: 'Predictions',  farsiLabel: 'پیش‌بینی',      href: 'predictions.html', icon: '🔮' },
    { label: 'Dashboard',    farsiLabel: 'داشبورد',       href: 'index.html',       icon: '📊' },
    { label: 'Energy',       farsiLabel: 'انرژی',          href: 'energy.html',      icon: '⚡' },
    { label: 'Countries',    farsiLabel: 'کشورها',         href: 'countries.html',   icon: '🌍' },
    { label: 'Scenarios',    farsiLabel: 'سناریوها',       href: 'scenarios.html',   icon: '🔮' },
    { label: 'Trade',        farsiLabel: 'تجارت',          href: 'trade.html',       icon: '🚢' },
    { label: 'US Impact',    farsiLabel: 'تأثیر آمریکا',  href: 'us-impact.html',   icon: '🇺🇸' },
    { label: 'Humanitarian', farsiLabel: 'بشردوستانه',     href: 'humanitarian.html',icon: '🏥' },
    { label: 'Geopolitical', farsiLabel: 'ژئوپلیتیک',     href: 'geopolitical.html',icon: '🗺️' },
    { label: 'Analysis',     farsiLabel: 'تحلیل',          href: 'analysis.html',    icon: '📝' },
  ],

  // ─── CONFIDENCE LEVELS ──────────────────────────────────────────────────────
  confidenceLevels: {
    confirmed:    { label: 'Confirmed',      emoji: '🟢', color: '#00ff88', description: 'Official source + 2 independent sources' },
    multisource:  { label: 'Multi-source',   emoji: '🟡', color: '#ffb800', description: '2+ sources, not official' },
    singlesource: { label: 'Single-source',  emoji: '🟠', color: '#ff8c00', description: 'One outlet only' },
    inferred:     { label: 'Model-inferred', emoji: '⚫', color: '#7a7a7a', description: 'AI/analyst estimate, not sourced' },
    disputed:     { label: 'Disputed',       emoji: '⚠️', color: '#ff3b3b', description: 'Conflicting claims' },
  },

  // ─── FARSI LABELS ───────────────────────────────────────────────────────────
  farsiLabels: {
    siteTitle: 'جیووایر — پلتفرم اطلاعات جهانی',
    homepageHeadline: 'تعارض ایران و آمریکا — روز ۲۵',
    navItems: {
      'Dashboard': 'داشبورد', 'Energy': 'انرژی', 'Countries': 'کشورها',
      'Scenarios': 'سناریوها', 'Trade': 'تجارت', 'US Impact': 'تأثیر آمریکا',
      'Humanitarian': 'بشردوستانه', 'Geopolitical': 'ژئوپلیتیک', 'Analysis': 'تحلیل',
    },
    tickerLabels: {
      oil: 'نفت خام', gold: 'طلا', treasury: 'اوراق خزانه ۱۰ ساله',
      dollar: 'شاخص دلار', bitcoin: 'بیت‌کوین', warCost: 'هزینه جنگ',
    },
  },

  // ─── MARKET DATA ────────────────────────────────────────────────────────────
  marketData: {
    oil:      { label: 'Brent Crude',         value: 101.15, preWar: 68.20,  unit: '$/bbl',    change: +33.9,  source: 'Bloomberg',      confidence: 'multisource',  lastUpdated: '2026-03-25T06:00Z' },
    wti:      { label: 'WTI Crude',           value: 90.22,  preWar: 64.10,  unit: '$/bbl',    change: +28.9,  source: 'CME/Bloomberg',   confidence: 'multisource',  lastUpdated: '2026-03-25T06:00Z' },
    gold:     { label: 'Gold',                value: 4412.0, preWar: 3200.0, unit: '$/oz',     change: +37.9,  source: 'FRED/CME',        confidence: 'confirmed',    lastUpdated: '2026-03-25T06:00Z' },
    treasury: { label: '10Y Treasury',        value: 4.39,   preWar: 4.20,   unit: '%',        change: +0.19,  source: 'FRED',            confidence: 'confirmed',    lastUpdated: '2026-03-25T06:00Z' },
    dollar:   { label: 'Dollar Index',        value: 99.15,  preWar: 104.2,  unit: 'DXY',      change: -4.8,   source: 'FRED',            confidence: 'confirmed',    lastUpdated: '2026-03-25T06:00Z' },
    sp500:    { label: 'S&P 500',             value: 6581,   preWar: 5990,   unit: 'pts',      change: +9.7,   source: 'Bloomberg',       confidence: 'confirmed',    lastUpdated: '2026-03-25T06:00Z' },
    vix:      { label: 'VIX',                value: 26.15,  preWar: 18.0,   unit: 'idx',      change: +45.3,  source: 'CBOE',            confidence: 'confirmed',    lastUpdated: '2026-03-25T06:00Z' },
    bitcoin:  { label: 'Bitcoin',             value: 87420,  preWar: 95000,  unit: 'USD',      change: -8.0,   source: 'CoinGecko',       confidence: 'multisource',  lastUpdated: '2026-03-25T08:00Z' },
    natgas:   { label: 'Nat Gas (Henry Hub)', value: 5.20,   preWar: 2.65,   unit: '$/MMBtu',  change: +96.2,  source: 'EIA',             confidence: 'confirmed',    lastUpdated: '2026-03-25T06:00Z' },
    usgas:    { label: 'US Avg Gas',          value: 3.88,   preWar: 2.98,   unit: '$/gal',    change: +30.2,  source: 'AAA/EIA',         confidence: 'confirmed',    lastUpdated: '2026-03-25T06:00Z' },
    ttf:      { label: 'TTF Gas (EU)',        value: 32.0,   preWar: 11.6,   unit: '€/MWh',    change: +175.9, source: 'ICE',             confidence: 'multisource',  lastUpdated: '2026-03-25T06:00Z' },
    wheat:    { label: 'Wheat',               value: 5.92,   preWar: 5.50,   unit: '$/bu',     change: +7.6,   source: 'CME',             confidence: 'multisource',  lastUpdated: '2026-03-25T06:00Z' },
    hormuz:      { label: 'Hormuz Flow',         value: 0.6,    preWar: 21.0,   unit: 'M bbl/d',  change: -97.1,  source: 'Kpler',           confidence: 'singlesource', lastUpdated: '2026-03-25T08:00Z', status: 'CLOSED' },
    mortgage30:  { label: '30Y Mortgage',        value: 6.43,   preWar: 6.10,   unit: '%',        change: +5.4,   source: 'MBA/FRED',         confidence: 'confirmed',    lastUpdated: '2026-03-25T06:00Z' },
    helium:      { label: 'Helium Spot',         value: 200,    preWar: 100,    unit: 'idx',      change: +100.0, source: 'Gasworld',         confidence: 'singlesource', lastUpdated: '2026-03-20T00:00Z', status: 'CRISIS' },
    fertilizerN: { label: 'Nitrogen Fert.',      value: 200,    preWar: 100,    unit: 'idx',      change: +100.0, source: 'Morningstar/Reuters',confidence: 'inferred',   lastUpdated: '2026-03-20T00:00Z' },
  },

  // ─── RECESSION DATA ──────────────────────────────────────────────────────
  recessionData: {
    probability: 42,
    momentum: 'RISING',
    confidence: 'MEDIUM',
    lastUpdated: '2026-03-25T12:00Z',

    factorScores: {
      ratesLiquidity:  { score: 65, status: 'DETERIORATING', topDriver: '2s10s yield curve inverted at -0.15%. Real yields rising.',                           weight: 0.15, fredSeries: ['DGS10','T10Y2Y','FEDFUNDS'] },
      inflation:       { score: 58, status: 'DETERIORATING', topDriver: 'Import prices +1.3% MoM — double forecast. Shelter sticky.',                         weight: 0.12, fredSeries: ['CPIAUCSL','PCEPI','IR'] },
      laborMarket:     { score: 35, status: 'STABLE',        topDriver: 'Initial claims rising but still historically low.',                                   weight: 0.15, fredSeries: ['UNRATE','ICSA','PAYEMS'] },
      consumerHealth:  { score: 52, status: 'DETERIORATING', topDriver: 'Mortgage apps -10%. Rates at 6.43%. Savings rate falling.',                          weight: 0.12, fredSeries: ['MORTGAGE30US','RSXFS','PSAVERT'] },
      corporateCredit: { score: 48, status: 'ELEVATED',      topDriver: 'Credit spreads widening post-war. Lending standards tightening.',                    weight: 0.10, fredSeries: [] },
      housing:         { score: 55, status: 'DETERIORATING', topDriver: 'Builder confidence falling. Starts declining. Permits weak.',                        weight: 0.10, fredSeries: ['HOUST','PERMIT','MORTGAGE30US'] },
      supplyLogistics: { score: 78, status: 'STRESS',        topDriver: 'Hormuz 97% closed. Shipping insurance suspended. Freight +40%.',                    weight: 0.08, fredSeries: [] },
      globalSpillovers:{ score: 62, status: 'DETERIORATING', topDriver: 'ECB cut postponed. China energy emergency. EM FX stress.',                           weight: 0.08, fredSeries: [] },
      marketSignals:   { score: 45, status: 'ELEVATED',      topDriver: 'Defensive rotation underway. VIX at 26. Breadth narrowing.',                        weight: 0.05, fredSeries: ['SP500'] },
      outsideBox:      { score: 55, status: 'ELEVATED',      topDriver: 'Google Trends "layoffs" spiking. Job posting decay accelerating.',                   weight: 0.05, fredSeries: [] },
    },

    whatChangedToday: [
      { time: '11:30 UTC', factor: 'Inflation',  change: 'Import prices +1.3% MoM — double the forecast', impact: 'NEGATIVE', source: 'BLS' },
      { time: '10:15 UTC', factor: 'Housing',    change: 'Mortgage rates hit 6.43% — highest since Oct 2025', impact: 'NEGATIVE', source: 'MBA' },
      { time: '09:00 UTC', factor: 'Diplomatic', change: 'Iran rejects 15-point ceasefire plan outright', impact: 'NEGATIVE', source: 'Reuters/AP' },
      { time: '08:30 UTC', factor: 'Energy',     change: 'Brent drops to $101 on reports of partial Hormuz flow', impact: 'POSITIVE', source: 'Bloomberg' },
      { time: '07:00 UTC', factor: 'Predictions',change: 'Kalshi recession odds cross 36% — highest since November', impact: 'NEGATIVE', source: 'Kalshi' },
    ],

    historicalComparisons: [
      { event: '1973 Oil Crisis',      oilChange: '+300%', recessionLag: '6 months',              similarity: 72, notes: 'OPEC embargo. Stagflation followed.' },
      { event: '1979 Iran Revolution', oilChange: '+150%', recessionLag: '12 months',             similarity: 85, notes: 'Most similar precedent. Iran supply shock + global recession.' },
      { event: '2022 Ukraine War',     oilChange: '+60%',  recessionLag: 'Avoided (SPR release)', similarity: 58, notes: 'SPR and rate hikes prevented recession. Different this time — Hormuz is physical blockage.' },
    ],

    divergences: [
      { title: 'Our model vs Kalshi',    ours: '42% recession probability', market: 'Kalshi at 36%',     thesis: 'Market may be underpricing oil persistence and supply-chain stress.' },
      { title: 'Ceasefire timing',       ours: '85%+ by Dec 31',            market: 'Polymarket at 78%', thesis: 'We think Trump political incentive + oil pain makes deal very likely by year-end.' },
      { title: 'Oil price vs duration',  ours: '$130+ if 3 months',          market: 'Brent at $101',     thesis: 'Market pricing quick resolution. Goldman target $130 if Hormuz stays closed.' },
    ],

    kalshiOdds: {
      recession2026:    36,
      ceasefireMar31:   12,
      ceasefireApr30:   44,
      ceasefireJun30:   63,
      ceasefireDec31:   78,
      oilAbove100EndMar:41,
      source: 'Kalshi/Polymarket',
      lastUpdated: '2026-03-25',
    },
  },

  // ─── TIMELINE EVENTS ────────────────────────────────────────────────────────
  timelineEvents: [
    { date: '2026-02-28', type: 'military',     text: 'Operation Epic Fury begins. US strikes 150+ targets across Iran in coordinated air campaign.',          source: 'CENTCOM',           confidence: 'confirmed'    },
    { date: '2026-02-28', type: 'military',     text: 'Iran retaliates — ballistic missiles strike UAE, Bahrain, and Qatar US bases. 13 US KIA.',             source: 'Reuters',           confidence: 'multisource'  },
    { date: '2026-02-28', type: 'economic',     text: 'Strait of Hormuz flow collapses 97%. Brent crude surges to $112/bbl within 48 hours.',                 source: 'Kpler/Bloomberg',   confidence: 'multisource'  },
    { date: '2026-03-01', type: 'economic',     text: "Lloyd's suspends war risk coverage for Hormuz transit. Global shipping insurance crisis begins.",       source: "Lloyd's of London", confidence: 'confirmed'    },
    { date: '2026-03-01', type: 'diplomatic',   text: 'UN Security Council emergency session. China/Russia veto ceasefire resolution.',                       source: 'UN',                confidence: 'confirmed'    },
    { date: '2026-03-02', type: 'military',     text: 'Israel strikes IRGC command nodes. 70+ Iranian officials eliminated in first week.',                   source: 'GeoWire',           confidence: 'inferred'     },
    { date: '2026-03-05', type: 'humanitarian', text: 'NetBlocks: Iran internet connectivity at 1% of normal. Civilian communications collapse.',             source: 'NetBlocks',         confidence: 'confirmed'    },
    { date: '2026-03-08', type: 'diplomatic',   text: 'Witkoff/Kushner back-channel confirmed by three officials. 5-day ceasefire window discussed.',         source: 'WSJ',               confidence: 'singlesource' },
    { date: '2026-03-12', type: 'political',    text: 'Ghalibaf emerges as last functional voice of Iranian state after IRGC leadership decimated.',          source: 'GeoWire',           confidence: 'inferred'     },
    { date: '2026-03-15', type: 'economic',     text: 'S&P 500 rises 9.7% from pre-war on defense/energy rally. Fed signals rate review.',                   source: 'Bloomberg',         confidence: 'confirmed'    },
    { date: '2026-03-18', type: 'humanitarian', text: 'HRANA: 3,220 Iranian dead. UN estimates 820,000+ internally displaced in Tehran region.',              source: 'HRANA/UN',          confidence: 'singlesource' },
    { date: '2026-03-20', type: 'military',     text: 'Houthis launch 22 drones targeting US carrier group. All intercepted. No casualties.',                 source: 'CENTCOM',           confidence: 'confirmed'    },
    { date: '2026-03-22', type: 'diplomatic',   text: 'Oman offers ceasefire mediation. Iran signals openness via back-channel. No official statement.',      source: 'Reuters',           confidence: 'multisource'  },
    { date: '2026-03-25', type: 'military',     text: 'Day 26: Operation Epic Fury — sustained air campaign continues. Hormuz blockade holds.',               source: 'CENTCOM',           confidence: 'confirmed'    },
  ],

  // ─── NEWS CARDS ─────────────────────────────────────────────────────────────
  newsCards: [
    { headline: 'Witkoff Confirms Back-Channel With Iran, 5-Day Window Still Open',         summary: 'US envoy says ceasefire negotiations ongoing via Oman, but no terms agreed. Iranian side has not publicly acknowledged.',                                     source: 'WSJ',           confidence: 'singlesource', timestamp: '2026-03-25T07:30Z', url: '#' },
    { headline: 'Brent Crude at $101 as Hormuz Blockade Enters Day 26',                     summary: 'Oil markets remain in supply shock. OPEC emergency meeting called for next week. Goldman Sachs raises 3-month target to $130.',                              source: 'Bloomberg',     confidence: 'multisource',  timestamp: '2026-03-25T06:15Z', url: '#' },
    { headline: 'Ghalibaf Addresses Nation: "Iran Will Not Surrender"',                     summary: 'Parliament speaker, now the most senior functional official, delivered televised address vowing continued resistance. State TV broadcast partially disrupted.', source: 'Press TV/BBC',  confidence: 'multisource',  timestamp: '2026-03-25T05:00Z', url: '#' },
    { headline: 'UN: 820,000 Displaced in Tehran Metropolitan Region',                      summary: 'Humanitarian agencies unable to access conflict zones. WFP requests emergency corridor access. Iran has not responded.',                                      source: 'OCHA/UN',       confidence: 'confirmed',    timestamp: '2026-03-24T18:00Z', url: '#' },
    { headline: 'Fed Emergency Meeting: Rate Cut Being Considered Amid War Shock',           summary: 'Federal Reserve governors in unscheduled session. Two governors cited "war-induced supply shock" as basis for review. No decision announced.',               source: 'Reuters',       confidence: 'multisource',  timestamp: '2026-03-24T15:45Z', url: '#' },
    { headline: 'India Activates Emergency Oil Reserve Protocol as Imports Collapse',        summary: "India imported 1.2M bbl/day from Gulf before conflict. Emergency reserves released at 200K bbl/day. Government urges conservation.",                        source: 'Economic Times',confidence: 'multisource',  timestamp: '2026-03-24T12:00Z', url: '#' },
  ],

  // ─── ARTICLES ───────────────────────────────────────────────────────────────
  articles: [
    { title: 'Ghalibaf: The Last Man Standing', slug: 'ghalibaf-last-man-standing', subtitle: "How Iran's parliament speaker became the last functional voice of a collapsing state", summary: "After 70+ officials were eliminated, Mohammad Bagher Ghalibaf has emerged as Iran's de facto state voice — with major implications for ceasefire negotiations.", category: 'Geopolitical', date: '2026-03-24', readTime: 4, confidence: 'inferred',     source: 'GeoWire Intelligence Desk', featured: true,  link: 'article-ghalibaf.html' },
    { title: 'The Hormuz Paradox: Why Closing the Strait Hurt Iran Most',           slug: 'hormuz-paradox',         subtitle: "A strategic analysis of Iran's self-defeating economic weapon",          summary: "The near-shutdown of the Strait of Hormuz has devastated global oil markets — but the blowback on Iran's already-sanctioned economy may prove more severe.", category: 'Economic',    date: '2026-03-22', readTime: 6, confidence: 'inferred',     source: 'GeoWire Intelligence Desk', featured: false, link: '#' },
    { title: 'Operation Epic Fury: A Military Assessment',                          slug: 'epic-fury-assessment',   subtitle: 'What the first 25 days reveal about US strike doctrine',               summary: 'An analytical review of targeting priorities, munitions deployment, and the strategic logic behind the US air campaign against Iran.',                         category: 'Military',    date: '2026-03-20', readTime: 7, confidence: 'multisource',  source: 'GeoWire Intelligence Desk', featured: false, link: '#' },
    { title: "India's Energy Emergency: When the Lifeline Breaks",                  slug: 'india-energy-emergency', subtitle: 'How the Gulf crisis is reshaping South Asian energy security',          summary: "India's dependence on Gulf crude is creating a cascading energy emergency that threatens industrial output and consumer prices across 1.4 billion people.",   category: 'Energy',      date: '2026-03-19', readTime: 5, confidence: 'multisource',  source: 'GeoWire Intelligence Desk', featured: false, link: '#' },
    { title: 'The Ceasefire Map: What All Sides Actually Want',                     slug: 'ceasefire-map',          subtitle: 'Red lines, back-channels, and what a deal would require',              summary: 'Using public statements and leaked back-channel details, GeoWire maps the distance between US, Iranian, and Israeli positions.',                              category: 'Diplomatic',  date: '2026-03-17', readTime: 8, confidence: 'singlesource', source: 'GeoWire Intelligence Desk', featured: false, link: '#' },
    { title: 'تهران در محاصره: گزارش از داخل [Farsi Intel]',                      slug: 'tehran-under-siege-fa',  subtitle: 'گزارش از منابع فارسی‌زبان داخلی',                                       summary: 'گزارشی از وضعیت ارتباطات، جابجایی جمعیت، و اخبار منابع داخلی از منطقه تهران.',                                                                              category: 'Farsi Intel', date: '2026-03-23', readTime: 5, confidence: 'singlesource', source: 'GeoWire / منابع داخلی',    featured: false, link: '#' },
  ],

  // ─── COUNTRIES ──────────────────────────────────────────────────────────────
  countries: [
    { id: 'iran',   name: 'Iran',          flag: '🇮🇷', threatLevel: 'critical', keyLeader: 'Ghalibaf (de facto)', latestAction: 'Sustained air defense operations. Civilian infrastructure heavily damaged.', source: 'CENTCOM/HRANA',  confidence: 'multisource'  },
    { id: 'usa',    name: 'United States', flag: '🇺🇸', threatLevel: 'active',   keyLeader: 'SecDef Austin',       latestAction: 'Air campaign Day 26. Congressional authorization debate ongoing.',          source: 'DoD/Reuters',    confidence: 'confirmed'    },
    { id: 'israel', name: 'Israel',        flag: '🇮🇱', threatLevel: 'elevated', keyLeader: 'Netanyahu',           latestAction: 'Coordinating strikes on IRGC command nodes. Northern border remains tense.', source: 'IDF/Reuters',    confidence: 'multisource'  },
    { id: 'qatar',  name: 'Qatar',         flag: '🇶🇦', threatLevel: 'elevated', keyLeader: 'Emir Al Thani',       latestAction: 'Al Udeid Air Base (US) operational. Qatari civilian airspace partially closed.',source: 'CENTCOM',       confidence: 'confirmed'    },
    { id: 'saudi',  name: 'Saudi Arabia',  flag: '🇸🇦', threatLevel: 'moderate', keyLeader: 'MBS',                 latestAction: 'Emergency OPEC+ session called. Air defense on full alert.',                  source: 'Aramco/Reuters', confidence: 'multisource'  },
    { id: 'uae',    name: 'UAE',           flag: '🇦🇪', threatLevel: 'elevated', keyLeader: 'MBZ',                 latestAction: 'Two UAE bases struck on Day 1. Repairs underway. Dubai flights normalized.',  source: 'UAE Ministry',   confidence: 'confirmed'    },
    { id: 'oman',   name: 'Oman',          flag: '🇴🇲', threatLevel: 'stable',   keyLeader: 'Sultan Haitham',      latestAction: 'Offering ceasefire mediation. Maintaining diplomatic channels with both sides.',source: 'Reuters',       confidence: 'multisource'  },
    { id: 'china',  name: 'China',         flag: '🇨🇳', threatLevel: 'stable',   keyLeader: 'Xi Jinping',          latestAction: 'Vetoed UN ceasefire. Emergency oil reserve release. Accelerating Iran talks.',source: 'Xinhua/Reuters', confidence: 'confirmed'    },
    { id: 'russia', name: 'Russia',        flag: '🇷🇺', threatLevel: 'stable',   keyLeader: 'Putin',               latestAction: 'Vetoed UN ceasefire. Supplying Iran with S-400 spare parts via Azerbaijan.',  source: 'Kommersant',     confidence: 'singlesource' },
  ],

  // ─── SCENARIOS ──────────────────────────────────────────────────────────────
  scenarios: [
    { type: 'best',  title: 'Ceasefire Within 10 Days',           probability: 22, timeframe: 'Days 26–35',  confidence: 'inferred', summary: 'Oman-mediated talks produce 72-hour humanitarian ceasefire, leading to structured negotiations. Hormuz partially reopens within 2 weeks.',                keyPoints: ['Witkoff/Ghalibaf back-channel produces framework','Iran agrees to inspection regime for nuclear sites','Hormuz partial reopening (40%) within 14 days','Oil retraces to $85–90/bbl'],                                               keyRisks: ['IRGC hardliners reject any deal','Israeli strike on nuclear facility disrupts talks'],     source: 'GeoWire Analysis' },
    { type: 'base',  title: 'Protracted Low-Intensity Conflict',  probability: 51, timeframe: 'Months 2–4',  confidence: 'inferred', summary: 'Conflict continues at current tempo. No ceasefire. Hormuz remains near-closed. Global economy absorbs shock but pressure builds.',                        keyPoints: ['Sustained US air campaign, no ground invasion','Hormuz stays at 5–15% capacity','Oil stabilizes $100–120 range','Ghalibaf consolidates power, explores back-channels'],                           keyRisks: ['Domestic US political pressure mounts','India/Pakistan energy crisis escalates'],            source: 'GeoWire Analysis' },
    { type: 'worst', title: 'Regional Escalation / Ground Phase', probability: 27, timeframe: 'Days 30–60',  confidence: 'inferred', summary: 'Conflict expands to ground phase or proxy actors trigger broader regional war. Hormuz fully closed 60+ days. Oil above $150.',                            keyPoints: ['Ground incursion into southern Iran','Hezbollah opens full northern front vs. Israel','Chinese naval assets position near Hormuz','Oil exceeds $150/bbl'],                                          keyRisks: ['Nuclear dimension emerges','Chinese economic ultimatum to US'],                               source: 'GeoWire Analysis' },
  ],

  // ─── WAR COST ────────────────────────────────────────────────────────────────
  warCost: {
    startDate: '2026-02-28T00:00:00Z',
    dailyCostUSD: 1750000000,
    perSecond: 20255,
    source: 'CSIS estimate',
    confidence: 'inferred',
    note: 'Estimate includes US military operations, proxy costs, and direct economic disruption. Not official.',
  },

  // ─── TRADE DATA ─────────────────────────────────────────────────────────────
  tradeData: {
    hormuzFlow: { current: 3, normal: 100, unit: '%', source: 'Kpler', confidence: 'singlesource', note: '97% flow reduction. ~21M bbl/day normally transits Hormuz.' },
    shippingRoutes: [
      { route: 'Strait of Hormuz',       status: 'CLOSED (97%)',        risk: 'critical', source: 'Kpler',          confidence: 'singlesource' },
      { route: 'Suez Canal',              status: 'Disrupted (40%)',     risk: 'elevated', source: 'Suez Authority', confidence: 'confirmed'    },
      { route: 'Cape of Good Hope alt',   status: 'Active (+$800K/voy)', risk: 'moderate', source: 'Clarksons',      confidence: 'multisource'  },
      { route: 'Red Sea / Bab el-Mandeb', status: 'Elevated risk',       risk: 'elevated', source: 'UKMTO',          confidence: 'confirmed'    },
    ],
    commodityChains: [
      { commodity: 'Crude Oil',         exposure: 'Critical', detail: '21M bbl/day normally via Hormuz. Global supply down 20%.',            source: 'IEA',      confidence: 'confirmed'   },
      { commodity: 'LNG (Qatar)',        exposure: 'Critical', detail: 'Qatar exports 80M tonnes/yr via Hormuz. Redirecting to LNG tankers.',source: 'Kpler',    confidence: 'multisource' },
      { commodity: 'Container Shipping', exposure: 'High',     detail: 'Rerouting via Cape adds 14+ days transit time.',                    source: 'Clarksons',confidence: 'multisource' },
      { commodity: 'Petrochemicals',     exposure: 'High',     detail: 'Iran = 5% of global supply. Substitute supply tight.',              source: 'ICIS',     confidence: 'multisource' },
      { commodity: 'Fertilizers',        exposure: 'Elevated', detail: 'Iran exports 2M+ tonnes/yr. Agricultural impact lag 3–6 months.',   source: 'FAO',      confidence: 'confirmed'   },
    ],
    insuranceStatus: { provider: "Lloyd's of London", status: 'War risk suspended for Hormuz transit', premium: 'N/A (suspended)', source: "Lloyd's", confidence: 'confirmed', date: '2026-03-01' },
  },

  // ─── US IMPACT DATA ─────────────────────────────────────────────────────────
  usImpactData: {
    gasPrices:        { current: 3.88, preWar: 2.98, unit: '$/gal', change: +30.2, source: 'AAA/EIA',       confidence: 'confirmed' },
    militaryCost:     { daily: 1750, total: 43800, unit: '$M',       source: 'CSIS estimate',                confidence: 'inferred',  note: 'Estimated. DoD has not released official figures.' },
    economicExposure: { gdpImpact: -0.8, unit: '% GDP drag est.',    source: 'Goldman Sachs',               confidence: 'inferred'   },
    sectors: [
      { name: 'Airlines',           impact: 'High',     detail: 'Jet fuel +48%. Route disruptions via Gulf.',            source: 'IATA',      confidence: 'multisource' },
      { name: 'Trucking/Logistics', impact: 'High',     detail: 'Diesel +38%. Supply chain delays compounding.',         source: 'ATA',       confidence: 'multisource' },
      { name: 'Agriculture',        impact: 'Elevated', detail: 'Fertilizer costs +22%. Harvest margin pressure.',       source: 'USDA',      confidence: 'confirmed'   },
      { name: 'Consumer Goods',     impact: 'Elevated', detail: 'Import cost inflation 6–12% on Gulf-routed goods.',     source: 'NRF',       confidence: 'inferred'    },
      { name: 'Defense/Energy',     impact: 'Positive', detail: 'Defense stocks +18%, US domestic E&P up 31%.',          source: 'Bloomberg', confidence: 'multisource' },
    ],
  },

  // ─── HUMANITARIAN DATA ──────────────────────────────────────────────────────
  humanitarianData: {
    iranianDead:     { value: 3220,   source: 'HRANA',     confidence: 'singlesource', note: 'Human Rights Activists News Agency. Access limited, likely undercount.' },
    usKIA:           { value: 13,     source: 'CENTCOM',   confidence: 'confirmed',    note: 'Official DoD figure. 47 wounded.' },
    civilianDead:    { value: 1840,   source: 'HRANA/MSF', confidence: 'singlesource', note: 'Estimate. Conflict zone access severely restricted.' },
    idpCount:        { value: 820000, source: 'OCHA/UN',   confidence: 'confirmed',    note: 'Internally displaced. Tehran metropolitan region.' },
    refugeeFlow:     { value: 45000,  source: 'UNHCR',     confidence: 'multisource',  note: 'Fled to Turkey, Azerbaijan, Iraq. 72hr snapshot.' },
    internetFreedom: { value: 1,      source: 'NetBlocks', confidence: 'confirmed',    note: 'Iran internet at ~1% of normal capacity.' },
    infrastructureDamage: [
      { site: 'Tehran power grid', status: 'Partial (40%)',  source: 'IAEA monitoring', confidence: 'multisource'  },
      { site: 'Natanz facility',   status: 'Destroyed',      source: 'IAEA/ISS',        confidence: 'multisource'  },
      { site: 'Bandar Abbas port', status: 'Operational',    source: 'Kpler',           confidence: 'confirmed'    },
      { site: 'Isfahan refinery',  status: 'Damaged (60%)',  source: 'Rystad Energy',   confidence: 'singlesource' },
    ],
  },

  // ─── ALLIANCES DATA ─────────────────────────────────────────────────────────
  alliancesData: [
    { country: 'Israel',          flag: '🇮🇱', alignment: 'US-coalition',    supports: ['US air campaign','Strike ops'],    opposes: ['Iran nuclear'],       notes: 'Active strike partner — IAF 340+ sorties.' },
    { country: 'UK',              flag: '🇬🇧', alignment: 'US-coalition',    supports: ['Intel sharing','HMS QE support'],  opposes: ['Iranian aggression'], notes: 'HMS Queen Elizabeth support group deployed.' },
    { country: 'Saudi Arabia',    flag: '🇸🇦', alignment: 'US-tacit',        supports: ['Oil output','Airspace'],           opposes: ['Iranian hegemony'],   notes: 'Boosting output +0.8Mbpd; tacit cooperation.' },
    { country: 'UAE',             flag: '🇦🇪', alignment: 'US-tacit',        supports: ['Base access','Logistics'],         opposes: ['IRGC operations'],    notes: 'Struck Day 1 but maintaining US cooperation.' },
    { country: 'Qatar',           flag: '🇶🇦', alignment: 'US-coalition',    supports: ['Al Udeid Air Base'],               opposes: ['Regional escalation'],'notes': 'Largest US air base in Middle East.' },
    { country: 'Iran',            flag: '🇮🇷', alignment: 'opposing',        supports: ['Resistance axis'],                 opposes: ['US/Israel'],          notes: 'Primary belligerent — under aerial bombardment.' },
    { country: 'Hezbollah',       flag: '🏴',  alignment: 'opposing',        supports: ['Iran solidarity'],                 opposes: ['US/Israel'],          notes: 'Low-intensity northern front — watching Fordow.' },
    { country: 'Houthis (Yemen)', flag: '🇾🇪', alignment: 'opposing',        supports: ['Drone campaign'],                  opposes: ['US/Israel'],          notes: '22 drones launched Day 20. All intercepted.' },
    { country: 'Russia',          flag: '🇷🇺', alignment: 'Iran-economic',   supports: ['UN veto','Military supplies'],      opposes: ['US unilateralism'],   notes: 'UNSC veto + S-400 spare parts via Azerbaijan.' },
    { country: 'China',           flag: '🇨🇳', alignment: 'neutral-watching',supports: ['UN veto','Counter-sanctions'],      opposes: ['US dominance'],       notes: 'UNSC veto. $4.2B BRI rerouting announced.' },
    { country: 'India',           flag: '🇮🇳', alignment: 'neutral-watching',supports: ['UN ceasefire calls'],               opposes: ['No side'],            notes: 'Energy emergency. Abstained in UNSC.' },
    { country: 'Turkey',          flag: '🇹🇷', alignment: 'neutral-watching',supports: ['Ceasefire mediation'],              opposes: ['No side'],            notes: '340K+ refugees. NATO non-participant.' },
    { country: 'Oman',            flag: '🇴🇲', alignment: 'neutral-mediator',supports: ['Mediation channel'],                opposes: ['Escalation'],         notes: 'Key back-channel broker — US/Iran talks.' },
  ],

  // ─── NARRATIVE FRAMES ───────────────────────────────────────────────────────
  narrativeFrames: [
    { perspective: 'US / CENTCOM',     flag: '🇺🇸', framing: 'Defensive strike against existential nuclear threat',    points: ['Iran was weeks from nuclear breakout','Legal under self-defense (UNSC 1540)','13 US KIA vs. thousands prevented'],                               omissions: 'Does not address civilian casualty estimates or long-term regional stability.', confidence: 'inferred' },
    { perspective: 'Iranian State',    flag: '🇮🇷', framing: 'Illegal aggression against a sovereign nation',          points: ['JCPOA betrayal by US in 2018 caused this','No nuclear weapons program — IAEA compliance','Civilian deaths are war crimes'],                   omissions: 'Does not acknowledge proxy war operations (Houthis, Hezbollah).',              confidence: 'inferred' },
    { perspective: 'Israeli Govt',     flag: '🇮🇱', framing: 'Existential threat neutralized — finally',              points: ['Iran funded Hamas/Hezbollah for 30+ years','Nuclear Iran = second Holocaust risk','October 7: Iran directed attack'],                          omissions: 'Downplays civilian impact in Iran. Does not address power vacuum risk.',        confidence: 'inferred' },
    { perspective: 'Gulf States',      flag: '🇸🇦', framing: 'Iranian hegemony check — but at enormous cost',         points: ['Iran destabilized region via proxies','IRGC must be neutralized','Hormuz closure is economic catastrophe for all'],                          omissions: 'Gulf states privately opposed to ground invasion.',                            confidence: 'inferred' },
    { perspective: 'China / Russia',   flag: '🇨🇳', framing: 'US unilateralism destroying international order',       points: ['US bypassed UN Security Council','Illegal under international law','Dollar weaponization reveals need for multipolar system'],              omissions: 'Neither nation critical of their own veto blocking ceasefire.',                confidence: 'inferred' },
    { perspective: 'Western Press',    flag: '📰',  framing: 'Necessary but costly — outcome deeply uncertain',       points: ['Strike may have delayed nuclear program 5–10 years','No exit strategy visible','Ceasefire negotiations critical for global stability'],     omissions: 'Often underweights Farsi-language sources and regional perspectives.',         confidence: 'inferred' },
  ],

  // ─── EXPOSURE FACTORS ───────────────────────────────────────────────────────
  exposureFactors: {
    gasMultiplier:    { US: 0.35, UK: 0.22, EU: 0.20, India: 0.28, Pakistan: 0.42, Japan: 0.18, Other: 0.25 },
    groceryMultiplier:{ US: 0.07, UK: 0.06, EU: 0.05, India: 0.09, Pakistan: 0.12, Japan: 0.05, Other: 0.08 },
    stockExposure:    { US: 'High — direct market exposure. Energy stocks volatile.', UK: 'Medium — FTSE 100 energy-heavy.', EU: 'Medium', India: 'Low-Medium', Pakistan: 'Low', Japan: 'Medium', Other: 'Varies' },
    logisticsExposure:{ US: 'High', UK: 'High', EU: 'High', India: 'Critical', Pakistan: 'Critical', Japan: 'High', Other: 'Medium' },
  },

  // ─── KALSHI MODULE ───────────────────────────────────────────────────────────
  kalshiModuleData: {
    ceasefireWithin30Days: { value: 28, unit: '%', source: 'DEMO — Kalshi (not live)', confidence: 'inferred', note: 'Market-implied probability. Not a GeoWire forecast.' },
    hormuzReopenWithin60:  { value: 44, unit: '%', source: 'DEMO — Polymarket (not live)', confidence: 'inferred', note: 'Market-implied probability.' },
    oilAbove130:           { value: 31, unit: '%', source: 'DEMO — Kalshi (not live)', confidence: 'inferred', note: 'Market-implied probability.' },
    usGroundInvasion:      { value: 8,  unit: '%', source: 'DEMO — Polymarket (not live)', confidence: 'inferred', note: 'Market-implied probability.' },
  },

  // ─── UPDATE LOG ─────────────────────────────────────────────────────────────
  updateLog: [
    { timestamp: '2026-03-25T08:00Z', category: 'Diplomatic',   item: 'Oman ceasefire offer',     change: 'New → Ghalibaf signals openness via back-channel',                   source: 'Reuters',   confidence: 'multisource' },
    { timestamp: '2026-03-25T06:00Z', category: 'Market',       item: 'Brent Crude',              change: '$109.80 → $101.15 (Hormuz partial flow reported)',                   source: 'Bloomberg', confidence: 'multisource' },
    { timestamp: '2026-03-24T18:00Z', category: 'Humanitarian', item: 'IDP count',                change: '780,000 → 820,000 (+5.1%)',                                          source: 'OCHA',      confidence: 'confirmed'   },
    { timestamp: '2026-03-24T12:00Z', category: 'Political',    item: 'Ghalibaf status',          change: 'Elevated from "official" → "de facto state leader"',                 source: 'GeoWire',   confidence: 'inferred'    },
    { timestamp: '2026-03-22T09:00Z', category: 'Military',     item: 'Houthi drone attack',      change: '22 drones vs. USS Gerald R. Ford. All intercepted.',                 source: 'CENTCOM',   confidence: 'confirmed'   },
    { timestamp: '2026-03-21T15:00Z', category: 'Market',       item: 'S&P 500',                  change: 'Enters bull territory +9.7% from pre-war (defense/energy rally)',    source: 'Bloomberg', confidence: 'confirmed'   },
    { timestamp: '2026-03-20T10:00Z', category: 'Military',     item: 'Iran air defense claims',  change: 'IRGC reports 3 coalition aircraft downed. CENTCOM denies.',           source: 'Disputed',  confidence: 'disputed'    },
    { timestamp: '2026-03-19T14:00Z', category: 'Energy',       item: 'EU emergency reserves',    change: 'IEA triggers 60-day emergency release — 1.2M bbl/day',               source: 'IEA',       confidence: 'confirmed'   },
  ],

};

// Make available globally
if (typeof window !== 'undefined') window.GEOWIRE = GEOWIRE;
if (typeof module !== 'undefined') module.exports = GEOWIRE;

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
    ceasefireWithin30Days: { value: 28, unit: '%', source: 'Polymarket', confidence: 'inferred', note: 'Market-implied probability. Not a GeoWire forecast.' },
    hormuzReopenWithin60:  { value: 44, unit: '%', source: 'Polymarket', confidence: 'inferred', note: 'Market-implied probability.' },
    oilAbove130:           { value: 31, unit: '%', source: 'Kalshi',     confidence: 'inferred', note: 'Market-implied probability.' },
    usGroundInvasion:      { value: 8,  unit: '%', source: 'Polymarket', confidence: 'inferred', note: 'Market-implied probability.' },
  },

  // ─── PREDICTIONS DATA ────────────────────────────────────────────────────────
  predictionsData: {
    lastUpdated: '2026-03-26T06:00Z',
    disclaimer: 'All probabilities sourced from Polymarket/Kalshi prediction markets. GeoWire does not endorse these forecasts — they represent the aggregate of market participants. Prediction market data is illustrative and may be delayed. Not financial or geopolitical advice.',
    ceasefireTimeline: [
      { label: 'Within 14 days',  probability: 12 },
      { label: 'Within 30 days',  probability: 28 },
      { label: 'Within 60 days',  probability: 51 },
      { label: 'Within 90 days',  probability: 65 },
      { label: 'Within 180 days', probability: 79 },
    ],
    markets: [
      {
        id: 'ceasefire30',
        title: 'Iran-US ceasefire declared within 30 days',
        probability: 28,
        source: 'Polymarket',
        volume: '$4.2M',
        trend: 'RISING',
        trendDelta: '+6pp this week',
        category: 'DIPLOMATIC',
        geowireEdge: 'Oman back-channel confirmed active. Ghalibaf signaled openness Mar 25. GeoWire model: 32% — slightly above market.',
        watchFor: 'Oman foreign minister travel; IRGC official statements',
        lastTraded: '2026-03-26T05:30Z',
      },
      {
        id: 'hormuz60',
        title: 'Strait of Hormuz fully reopens within 60 days',
        probability: 44,
        source: 'Polymarket',
        volume: '$8.7M',
        trend: 'RISING',
        trendDelta: '+12pp this week',
        category: 'MILITARY',
        geowireEdge: "Insurance market diverging — Lloyd's still suspended. Physical reopening ≠ commercial reopening. GeoWire model: 38% — below market (insurance gap ignored).",
        watchFor: "Lloyd's war risk reinstatement; VLCC transit attempt; CENTCOM operations pause",
        lastTraded: '2026-03-26T05:45Z',
      },
      {
        id: 'oil130apr',
        title: 'Brent crude above $130/bbl before end of April',
        probability: 31,
        source: 'Kalshi',
        volume: '$2.1M',
        trend: 'FALLING',
        trendDelta: '-5pp this week',
        category: 'MARKET',
        geowireEdge: 'IEA 60-day release + Saudi spare capacity damping spike risk. SPR political pressure rising. GeoWire model: 27% — aligned with market.',
        watchFor: 'Saudi Aramco production announcements; IEA emergency release pace',
        lastTraded: '2026-03-26T04:00Z',
      },
      {
        id: 'usground',
        title: 'US deploys ground forces inside Iran',
        probability: 8,
        source: 'Polymarket',
        volume: '$1.3M',
        trend: 'STABLE',
        trendDelta: '+1pp this week',
        category: 'MILITARY',
        geowireEdge: 'Congressional authorization not sought. JCS assessed as requiring 200K+ troops. Politically non-starter absent IRGC strike on US soil. GeoWire agrees: 8–10%.',
        watchFor: 'AUMF language; CENTCOM force buildup beyond 65K; Khamenei health',
        lastTraded: '2026-03-25T18:00Z',
      },
      {
        id: 'regimechange',
        title: 'Iranian government transition before end of 2026',
        probability: 19,
        source: 'Polymarket',
        volume: '$3.4M',
        trend: 'RISING',
        trendDelta: '+7pp since war start',
        category: 'POLITICAL',
        geowireEdge: 'Internal protests resurging (Mahsa anniversary + economic pain). IRGC loyalty fractures reported. Ghalibaf leading but not consolidated. GeoWire model: 22% — above market.',
        watchFor: 'Protest size in Tehran/Isfahan; IRGC internal communications leaks; Khamenei public appearances',
        lastTraded: '2026-03-26T02:00Z',
      },
      {
        id: 'saudijoin',
        title: 'Saudi Arabia joins active hostilities',
        probability: 12,
        source: 'Kalshi',
        volume: '$0.9M',
        trend: 'STABLE',
        trendDelta: '0pp this week',
        category: 'REGIONAL',
        geowireEdge: "MBS has strong economic incentive to stay neutral — Hormuz closure hurts Iran AND raises Saudi oil revenue. Vision 2030 at risk if Riyadh attacked. GeoWire model: 9% — below market.",
        watchFor: 'Houthi attack on Saudi facilities; US-Saudi defense consultations; MBS public statements',
        lastTraded: '2026-03-25T14:00Z',
      },
      {
        id: 'recession2026',
        title: 'US recession declared (NBER) before end of 2026',
        probability: 38,
        source: 'Kalshi',
        volume: '$6.1M',
        trend: 'RISING',
        trendDelta: '+14pp since war start',
        category: 'ECONOMIC',
        geowireEdge: 'GeoWire recession model: 42% — above market. Market missing supply-chain second-order effects (helium→chips→AI capex). Labor market still holding; this is the swing factor.',
        watchFor: '2 consecutive negative GDP quarters; NBER real-time tracker; NFP consecutive misses',
        lastTraded: '2026-03-26T05:00Z',
      },
    ],
    insiderWatch: [
      { ticker: 'RTX',  name: 'Raytheon Technologies', filingDate: '2026-03-18', insider: 'CFO Christopher Calio',  action: 'BUY',  shares: 50000, value: '$5.8M', note: 'Largest open-market purchase since 2019. Filed 2 days after war start.' },
      { ticker: 'LMT',  name: 'Lockheed Martin',        filingDate: '2026-03-19', insider: 'CEO James Taiclet',      action: 'BUY',  shares: 12000, value: '$6.1M', note: 'Form 4 filed. No 10b5-1 plan — discretionary buy.' },
      { ticker: 'ENPH', name: 'Enphase Energy',          filingDate: '2026-03-20', insider: 'Director Paul Nahi',     action: 'SELL', shares: 30000, value: '$2.1M', note: 'Pre-arranged 10b5-1. Energy transition narrative accelerating.' },
      { ticker: 'SLB',  name: 'SLB (Schlumberger)',      filingDate: '2026-03-21', insider: 'CEO Olivier Le Peuch',   action: 'BUY',  shares: 25000, value: '$1.4M', note: 'Oilfield services demand spike expected. CEO adding.' },
      { ticker: 'XOM',  name: 'ExxonMobil',              filingDate: '2026-03-22', insider: 'Board Director',         action: 'BUY',  shares: 15000, value: '$2.1M', note: '$140+ oil scenario makes upstream highly profitable.' },
    ],
  },

  // ─── COMMODITY CASCADE ───────────────────────────────────────────────────────
  commodityCascade: [
    { name: 'Crude Oil (Brent)', currentPrice: '$101/bbl', preWarPrice: '$68/bbl', percentChange: +48.5, disruptionScore: 58, status: 'DISRUPTED',  hormuzExposure: 'Direct — 21M bbl/day transit', substitutability: 'Low (2–3yr to reroute)', bufferDays: 90,  demandElasticity: 0.10, downstreamEffect: 'Gasoline, diesel, jet fuel, plastics, chemicals', source: 'Bloomberg/Kpler',         confidence: 'multisource'  },
    { name: 'LNG (Qatar/TTF)',  currentPrice: '€50/MWh',  preWarPrice: '€32/MWh', percentChange: +57.0, disruptionScore: 46, status: 'DISRUPTED',  hormuzExposure: 'Critical — 80M t/yr via Hormuz', substitutability: 'Low-Medium',        bufferDays: 45,  demandElasticity: 0.15, downstreamEffect: 'EU power generation, heating, industrial', source: 'ICE/Bloomberg',           confidence: 'multisource'  },
    { name: 'Helium',           currentPrice: 'idx 200',  preWarPrice: 'idx 100', percentChange: +100,  disruptionScore: 92, status: 'CRITICAL',   hormuzExposure: 'Indirect — Qatar Ras Laffan OFFLINE', substitutability: 'NONE (zero substitutes)', bufferDays: 45, demandElasticity: 0.02, downstreamEffect: 'Semiconductor fabs, MRI machines, AI chip production, NASA/space', source: 'Gasworld/Linde filings', confidence: 'singlesource' },
    { name: 'Nitrogen Fert.',   currentPrice: '~2× spot', preWarPrice: 'base',    percentChange: +100,  disruptionScore: 46, status: 'DISRUPTED',  hormuzExposure: 'Moderate — Iran 2M+ t/yr offline', substitutability: 'Low-Medium (6mo lag)', bufferDays: 60, demandElasticity: 0.08, downstreamEffect: 'Global agriculture — 3–6 month lag to food prices', source: 'Morningstar/Reuters',     confidence: 'inferred'     },
    { name: 'Phosphate',        currentPrice: '+50%',     preWarPrice: 'base',    percentChange: +50,   disruptionScore: 40, status: 'ELEVATED',   hormuzExposure: 'Moderate — Jordan/Morocco rerouting', substitutability: 'Low',              bufferDays: 75,  demandElasticity: 0.08, downstreamEffect: 'Fertilizer chain, food security', source: 'World Bank/CRU',          confidence: 'inferred'     },
    { name: 'Sulphur',          currentPrice: '+30%',     preWarPrice: 'base',    percentChange: +30,   disruptionScore: 38, status: 'ELEVATED',   hormuzExposure: 'Moderate',                            substitutability: 'Low-Medium',        bufferDays: 90,  demandElasticity: 0.10, downstreamEffect: 'Fertilizer production, pharmaceuticals', source: 'ICIS/Argus',              confidence: 'inferred'     },
    { name: 'Ammonia',          currentPrice: '+40%',     preWarPrice: 'base',    percentChange: +40,   disruptionScore: 40, status: 'ELEVATED',   hormuzExposure: 'High — feedstock natural gas',        substitutability: 'Low',              bufferDays: 60,  demandElasticity: 0.08, downstreamEffect: 'Fertilizers, refrigeration, industrial chemicals', source: 'Green Markets/ICIS',      confidence: 'inferred'     },
    { name: 'Bromine',          currentPrice: '+25%',     preWarPrice: 'base',    percentChange: +25,   disruptionScore: 35, status: 'ELEVATED',   hormuzExposure: 'Indirect — 66% from Israel/Jordan',   substitutability: 'Very Low',         bufferDays: 60,  demandElasticity: 0.05, downstreamEffect: 'Chip etching, flame retardants, pharmaceuticals', source: 'Albemarle/ICL filings',   confidence: 'singlesource' },
    { name: 'Shipping (War Risk)', currentPrice: '+40% war premium', preWarPrice: 'base', percentChange: +40, disruptionScore: 55, status: 'DISRUPTED', hormuzExposure: 'Full — transit suspended', substitutability: 'Cape reroute (+14d)',  bufferDays: 0,   demandElasticity: 0.20, downstreamEffect: 'All imported goods, supply chain lead times, inflation', source: "Lloyd's/Clarksons",      confidence: 'confirmed'    },
    { name: 'Defense Stocks',   currentPrice: '+18%',     preWarPrice: 'base',    percentChange: +18,   disruptionScore: 10, status: 'POSITIVE',   hormuzExposure: 'Inverse — conflict drives demand',   substitutability: 'N/A',              bufferDays: null, demandElasticity: null, downstreamEffect: 'RTX, LMT, NOC outperforming. JPM upgraded sector.',  source: 'Bloomberg/JPM',           confidence: 'multisource'  },
    { name: 'Gold',             currentPrice: '$4,100/oz',preWarPrice: '$3,200/oz',percentChange: -8.8,  disruptionScore: 30, status: 'VOLATILE',   hormuzExposure: 'Safe haven flows offsetting war sell-off', substitutability: 'N/A',           bufferDays: null, demandElasticity: null, downstreamEffect: 'Flight-to-safety demand vs. risk-off selling tension', source: 'FRED/CME',               confidence: 'confirmed'    },
    { name: 'Bitcoin',          currentPrice: '$87,420',  preWarPrice: '$95,000', percentChange: -8.0,  disruptionScore: 25, status: 'VOLATILE',   hormuzExposure: 'Indirect — risk sentiment, energy cost for mining', substitutability: 'N/A', bufferDays: null, demandElasticity: null, downstreamEffect: 'Risk-off pressure; miners facing higher energy costs', source: 'CoinGecko',              confidence: 'multisource'  },
  ],

  // ─── HELIUM CRISIS ───────────────────────────────────────────────────────────
  heliumCrisis: {
    keyFacts: {
      offlineShare: 33,
      bufferDays: 45,
      substituteExists: false,
      priceChange: +100,
      atRiskInvestment: 650,
      source: 'Gasworld / Linde / Air Products filings',
      confidence: 'singlesource',
      lastUpdated: '2026-03-20T00:00Z',
    },
    supplyChain: [
      { stage: 'Qatar Ras Laffan',              status: 'OFFLINE',      severity: 'critical',     detail: '33% of global helium supply. Force majeure declared Mar 4. Linde, Air Products contracts suspended.', icon: '🇶🇦' },
      { stage: 'Strait of Hormuz',              status: 'BLOCKED',      severity: 'critical',     detail: 'Primary export route. 97% closed. No tanker transits since Day 3 of conflict.',                       icon: '🚫' },
      { stage: 'Distributors (Linde / Air Liquide / Iwatani)', status: 'RATIONING', severity: 'high', detail: 'Emergency allocation protocols active. Priority: medical (MRI). JPM upgraded Linde +15% YTD on shortage premium.', icon: '🏭' },
      { stage: 'Samsung / SK Hynix Fabs',       status: 'MONITORING',   severity: 'elevated',     detail: '65% of fab helium sourced from Qatar. 45-day buffer. Alternative sourcing from US/Algeria underway.', icon: '💻' },
      { stage: 'AI Chip Production',            status: 'AT RISK',      severity: 'elevated',     detail: 'No helium substitute exists for chip lithography cooling. TSMC, Intel, Samsung all exposed.',           icon: '🤖' },
      { stage: 'Data Centers',                  status: 'WATCHING',     severity: 'moderate',     detail: '$650B in AI infrastructure investments at risk if fab output drops >20%. Cloud capacity expansion delays likely.', icon: '🌐' },
      { stage: 'Consumer Goods',                status: 'DELAYED',      severity: 'low',          detail: 'Party balloons, airships trivial. Real concern is MRI scanner production and scientific instruments.',    icon: '👤' },
    ],
  },

  // ─── GOLDMAN SCENARIOS ───────────────────────────────────────────────────────
  goldmanScenarios: {
    preWarBrent: 68,
    source: 'Goldman Sachs Research (March 2026)',
    confidence: 'singlesource',
    scenarios: [
      { label: 'Full closure, no offset',               closurePct: 100, pipelineOffset: 0,   sprRelease: 0,   oilPremium: 15 },
      { label: 'Full closure + pipeline reroute',        closurePct: 100, pipelineOffset: 4.2, sprRelease: 0,   oilPremium: 12 },
      { label: 'Full closure + pipeline + SPR',          closurePct: 100, pipelineOffset: 4.2, sprRelease: 2.0, oilPremium: 10 },
      { label: '50% closure (partial Hormuz flow)',      closurePct: 50,  pipelineOffset: 2.0, sprRelease: 0,   oilPremium: 4  },
      { label: '25% closure (near-normal)',              closurePct: 25,  pipelineOffset: 1.0, sprRelease: 0,   oilPremium: 1  },
    ],
  },

  // ─── FACTOR DETAILS ──────────────────────────────────────────────────────────
  factorDetails: {
    ratesLiquidity: {
      name: 'Rates & Liquidity',
      description: 'The policy and funding backdrop. When liquidity tightens, the entire system gets more fragile.',
      metrics: [
        { label: '10Y Treasury Yield', value: '4.39%',     preWar: '4.20%',      change: '+19bp',             series: 'DGS10',           source: 'FRED',         trend: 'RISING'        },
        { label: '2s10s Yield Curve',  value: '-0.15%',    preWar: '-0.10%',     change: 'Deeper inversion',  series: 'T10Y2Y',          source: 'FRED',         trend: 'DETERIORATING' },
        { label: 'Fed Funds Rate',     value: '4.50%',     preWar: '4.50%',      change: 'Unchanged',         series: 'FEDFUNDS',        source: 'FRED',         trend: 'STABLE'        },
        { label: 'Dollar Index',       value: '99.15',     preWar: '104.2',      change: '-4.8%',             series: 'DTWEXBGS',        source: 'FRED',         trend: 'FALLING'       },
      ],
      secondOrderEffects: [
        'Inverted curve → banks reduce lending → credit tightens → business investment falls',
        'Rising real yields → higher mortgage rates → housing affordability drops → construction slows',
        'Dollar weakness → import prices rise → inflation stickier → Fed boxed in on cuts',
      ],
      watchItems: ['Fed emergency meeting outcome', 'Treasury auction demand', 'Financial conditions index'],
    },
    inflation: {
      name: 'Inflation Internals',
      description: 'Energy shock flowing through to import prices, freight, and food. Will it embed or fade with oil?',
      metrics: [
        { label: 'CPI (Annual)',       value: '3.1%',      preWar: '2.8%',       change: '+0.3pp',            series: 'CPIAUCSL',        source: 'BLS',          trend: 'RISING'        },
        { label: 'PCE (Core)',         value: '2.8%',      preWar: '2.6%',       change: '+0.2pp',            series: 'PCEPI',           source: 'BEA',          trend: 'RISING'        },
        { label: 'Import Prices MoM',  value: '+1.3%',     preWar: '+0.6%',      change: '2x forecast',       series: 'IR',              source: 'BLS',          trend: 'DETERIORATING' },
        { label: 'Oil Pass-Through',   value: 'Active',    preWar: 'Contained',  change: '2-3mo CPI lag',     series: null,              source: 'GeoWire',      trend: 'DETERIORATING' },
      ],
      secondOrderEffects: [
        'Oil +48% → gas +30% → transport costs → consumer goods → CPI in 2-3 months',
        'Fertilizer +100% → crop costs → food prices → grocery bills → lower-income impact',
        "Import surge → Fed can't cut → financial conditions tight → recession risk elevated",
      ],
      watchItems: ['Next CPI print', 'Shelter/rent deceleration', 'Wage vs inflation gap'],
    },
    laborMarket: {
      name: 'Labor Market',
      description: 'Last shoe to drop in recession. Still resilient but leading indicators softening.',
      metrics: [
        { label: 'Unemployment',       value: '4.2%',      preWar: '4.1%',       change: '+0.1pp',            series: 'UNRATE',          source: 'BLS',          trend: 'STABLE'        },
        { label: 'Initial Claims',     value: '225K',      preWar: '210K',       change: '+15K',              series: 'ICSA',            source: 'DOL',          trend: 'RISING'        },
        { label: 'Nonfarm Payrolls',   value: '+150K',     preWar: '+180K',      change: 'Slowing',           series: 'PAYEMS',          source: 'BLS',          trend: 'DETERIORATING' },
        { label: 'Avg Weekly Hours',   value: '34.2',      preWar: '34.4',       change: '-0.2hr',            series: null,              source: 'BLS',          trend: 'DETERIORATING' },
      ],
      secondOrderEffects: [
        'Hours cut before layoffs → early warning already appearing in data',
        'Claims rising but below 300K threshold → not yet recessionary but trending',
        'Oil >$100 for 3+ months → energy-sector layoffs → claims spike risk',
      ],
      watchItems: ['Weekly claims trajectory', 'Next NFP print', 'JOLTS openings', 'Temp staffing'],
    },
    consumerHealth: {
      name: 'Consumer Health',
      description: 'Consumer = 70% of GDP. Mortgage rates 6.43%, gas up 30%, savings depleting.',
      metrics: [
        { label: '30Y Mortgage',       value: '6.43%',     preWar: '6.10%',      change: '+33bp',             series: 'MORTGAGE30US',    source: 'MBA',          trend: 'RISING'        },
        { label: 'Retail Sales MoM',   value: '+0.2%',     preWar: '+0.4%',      change: 'Slowing',           series: 'RSXFS',           source: 'Census',       trend: 'DETERIORATING' },
        { label: 'Savings Rate',       value: '4.1%',      preWar: '4.6%',       change: '-0.5pp',            series: 'PSAVERT',         source: 'BEA',          trend: 'FALLING'        },
        { label: 'US Avg Gas',         value: '$3.88/gal', preWar: '$2.98',      change: '+30%',              series: null,              source: 'AAA',          trend: 'DETERIORATING' },
      ],
      secondOrderEffects: [
        'Gas +30% = ~$90/mo extra per household → discretionary spending cuts',
        'Mortgage spike → worst affordability since 2006 → home sales freeze',
        'Savings falling → less buffer → next economic shock hits harder',
      ],
      watchItems: ['Consumer confidence', 'Card delinquencies', 'Mortgage purchase apps'],
    },
    corporateCredit: {
      name: 'Corporate & Credit',
      description: 'Spreads widening, lending tightening post-war. Credit cracks amplify everything.',
      metrics: [
        { label: 'IG Spread',          value: '1.45%',     preWar: '1.20%',      change: '+25bp',             series: null,              source: 'Bloomberg',    trend: 'DETERIORATING' },
        { label: 'HY Spread',          value: '4.20%',     preWar: '3.50%',      change: '+70bp',             series: null,              source: 'Bloomberg',    trend: 'DETERIORATING' },
        { label: 'Lending Standards',  value: 'Tightening',preWar: 'Easing',     change: 'Reversed',          series: null,              source: 'Fed SLOOS',    trend: 'DETERIORATING' },
        { label: 'Earnings Revisions', value: 'Negative',  preWar: 'Mixed',      change: 'Down',              series: null,              source: 'FactSet',      trend: 'DETERIORATING' },
      ],
      secondOrderEffects: [
        'Wider spreads → higher borrowing costs → capex deferred → hiring freezes',
        'Tight lending → SMB credit squeeze → small business layoffs',
        'Energy cost shock → margin compression → Q2 earnings miss risk',
      ],
      watchItems: ['Q1 earnings (April)', 'CRE defaults', 'Private credit stress'],
    },
    housing: {
      name: 'Housing & Construction',
      description: 'Housing leads most cycle turns. Builder confidence falling, starts declining, rates at 6.43%.',
      metrics: [
        { label: 'Housing Starts',     value: '1.35M',     preWar: '1.42M',      change: '-4.9%',             series: 'HOUST',           source: 'Census',       trend: 'DETERIORATING' },
        { label: 'Building Permits',   value: '1.38M',     preWar: '1.45M',      change: '-4.8%',             series: 'PERMIT',          source: 'Census',       trend: 'DETERIORATING' },
        { label: 'Mortgage Rate',      value: '6.43%',     preWar: '6.10%',      change: '+33bp',             series: 'MORTGAGE30US',    source: 'MBA',          trend: 'RISING'        },
        { label: 'Mortgage Apps',      value: '-10% WoW',  preWar: 'Stable',     change: 'Sharp decline',     series: null,              source: 'MBA',          trend: 'DETERIORATING' },
      ],
      secondOrderEffects: [
        'Higher rates → fewer buyers → prices plateau → negative wealth effect on homeowners',
        'Starts declining → construction job losses (3-6 month lag)',
        'Multifamily oversupply → rent deceleration → helps CPI but hurts landlords',
      ],
      watchItems: ['NAHB builder confidence', 'Existing home sales', 'Regional price divergence'],
    },
    supplyLogistics: {
      name: 'Supply & Logistics',
      description: 'Physical economy under extreme stress. Hormuz closure is the largest maritime disruption in history.',
      metrics: [
        { label: 'Hormuz Flow',        value: '3% normal', preWar: '100%',       change: '-97%',              series: null,              source: 'Kpler',        trend: 'STRESS'        },
        { label: 'Insurance',          value: 'SUSPENDED', preWar: 'Available',  change: "By Lloyd's",        series: null,              source: "Lloyd's",      trend: 'STRESS'        },
        { label: 'Rerouting Cost',     value: '+$800K/voy',preWar: 'Direct',     change: '+14 days via Cape', series: null,              source: 'Clarksons',    trend: 'DISRUPTED'     },
        { label: 'Freight Index',      value: '+40%',      preWar: 'Normal',     change: 'Elevated',          series: null,              source: 'Baltic Exch',  trend: 'DETERIORATING' },
      ],
      secondOrderEffects: [
        'Hormuz closure → 20% global oil offline → price shock → inflation → recession',
        "Insurance suspended → vessels won't transit → restoring flow takes weeks even after ceasefire",
        'Cape rerouting → +14 days → inventory delays → just-in-time manufacturing disruption',
      ],
      watchItems: ['Hormuz coalition operations', 'Insurance market signals', 'Port congestion'],
    },
    globalSpillovers: {
      name: 'Global Spillovers',
      description: 'Conflict spreading through energy dependency, trade routes, and financial conditions worldwide.',
      metrics: [
        { label: 'ECB Rate',           value: 'Cut postponed',preWar:'Cut expected', change: 'Reversed',       series: null,              source: 'ECB',          trend: 'DETERIORATING' },
        { label: 'China Oil',          value: 'Emergency',  preWar: 'Normal',     change: 'Reserve release',   series: null,              source: 'Bloomberg',    trend: 'STRESS'        },
        { label: 'India Energy',       value: 'Crisis protocol',preWar:'Normal',  change: 'Imports collapsed', series: null,              source: 'Econ Times',   trend: 'STRESS'        },
        { label: 'EM FX',              value: 'Elevated stress',preWar:'Stable',  change: 'Oil importers weak',series: null,              source: 'Bloomberg',    trend: 'DETERIORATING' },
      ],
      secondOrderEffects: [
        "ECB can't cut → Europe weakens → less US export demand → US GDP drag",
        'China slowdown → commodity demand softens → but supply constrained → stagflation risk',
        'India/Pakistan energy emergency → regional instability → complexity for US exit',
      ],
      watchItems: ['ECB next meeting', 'China PMI', 'India fuel rationing', 'Pakistan stability'],
    },
    marketSignals: {
      name: 'Market-Implied Stress',
      description: 'Markets sending mixed signals — defense/energy rally masking narrowing breadth. VIX elevated, not panic.',
      metrics: [
        { label: 'S&P 500',            value: '6,581',     preWar: '5,990',      change: '+9.7%',             series: 'SP500',           source: 'Bloomberg',    trend: 'MIXED'         },
        { label: 'VIX',                value: '26.15',     preWar: '18.0',       change: '+45%',              series: null,              source: 'CBOE',         trend: 'ELEVATED'      },
        { label: 'Breadth',            value: 'Narrowing', preWar: 'Broad',      change: '2 sectors only',    series: null,              source: 'Bloomberg',    trend: 'DETERIORATING' },
        { label: 'Gold',               value: '$4,412',    preWar: '$3,200',     change: '+37.9%',            series: 'GOLDAMGBD228NLBM',source: 'FRED',         trend: 'VOLATILE'      },
      ],
      secondOrderEffects: [
        'S&P rally sector-concentrated (defense/energy) → masks broad underlying weakness',
        'VIX 26 = uncertainty not panic → watch for spike above 35 as recession signal',
        'Copper/gold ratio declining → classic leading recession indicator',
      ],
      watchItems: ['Breadth divergence', 'Credit vs equity divergence', 'Small vs large cap spread'],
    },
    outsideBox: {
      name: 'Alternative Signals',
      description: 'Off-consensus indicators leading official data by weeks. Google Trends, job postings, mobility all flashing yellow.',
      metrics: [
        { label: 'Google "layoffs"',   value: 'Spiking',   preWar: 'Normal',     change: '+120% volume',      series: null,              source: 'Google Trends',trend: 'DETERIORATING' },
        { label: 'Job Posting Decay',  value: '-8% MoM',   preWar: '-2% MoM',    change: 'Accelerating',      series: null,              source: 'Indeed',       trend: 'DETERIORATING' },
        { label: 'Bankruptcy Search',  value: '+45%',      preWar: 'Normal',     change: 'Spiking',           series: null,              source: 'Google Trends',trend: 'DETERIORATING' },
        { label: 'Electricity Load',   value: '-3%',       preWar: 'Normal',     change: 'Industrial soft',   series: null,              source: 'EIA',          trend: 'DETERIORATING' },
      ],
      secondOrderEffects: [
        'Layoff searches spike 4-8 weeks before official unemployment data → early warning',
        'Job posting decay → hiring freeze spreading → initial claims rise with lag',
        'Electricity declining → industrial production weakening → manufacturing recession risk',
      ],
      watchItems: ['Google Trends momentum', 'Indeed index', 'OpenTable/TSA throughput'],
    },
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

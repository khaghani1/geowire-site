// content.js — GeoWire single source of truth
// All seed data lives here. Pages read this; nothing hardcoded elsewhere.
// Architect for future Supabase migration: each array maps to a future table.

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
    { label: 'Dashboard',    farsiLabel: 'داشبورد',    href: 'index.html',           icon: '📊' },
    { label: 'Energy',       farsiLabel: 'انرژی',      href: 'energy.html',          icon: '⚡' },
    { label: 'Countries',    farsiLabel: 'کشورها',     href: 'countries.html',       icon: '🌍' },
    { label: 'Scenarios',    farsiLabel: 'سناریوها',   href: 'scenarios.html',       icon: '🔮' },
    { label: 'Trade',        farsiLabel: 'تجارت',      href: 'trade.html',           icon: '🚢' },
    { label: 'US Impact',    farsiLabel: 'تأثیر آمریکا', href: 'us-impact.html',    icon: '🇺🇸' },
    { label: 'Humanitarian', farsiLabel: 'بشردوستانه', href: 'humanitarian.html',    icon: '🏥' },
    { label: 'Geopolitical', farsiLabel: 'ژئوپلیتیک', href: 'geopolitical.html',    icon: '🗺️' },
    { label: 'Analysis',     farsiLabel: 'تحلیل',      href: 'analysis.html',        icon: '📝' },
  ],

  // ─── CONFIDENCE LEVELS ──────────────────────────────────────────────────────
  confidenceLevels: {
    confirmed:     { label: 'Confirmed',     emoji: '🟢', color: '#00ff88', description: 'Official source + 2 independent sources' },
    multisource:   { label: 'Multi-source',  emoji: '🟡', color: '#ffb800', description: '2+ sources, not official' },
    singlesource:  { label: 'Single-source', emoji: '🟠', color: '#ff8c00', description: 'One outlet only' },
    inferred:      { label: 'Model-inferred',emoji: '⚫', color: '#7a7a7a', description: 'AI/analyst estimate, not sourced' },
    disputed:      { label: 'Disputed',      emoji: '⚠️', color: '#ff3b3b', description: 'Conflicting claims' },
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
    oil:       { label: 'Brent Crude',       value: 112.40, preWar: 68.20, unit: '$/bbl', change: +64.8, source: 'Bloomberg',    confidence: 'multisource',  lastUpdated: '2026-03-24T06:00Z' },
    gold:      { label: 'Gold',              value: 3240.0, preWar: 2680.0, unit: '$/oz', change: +20.9, source: 'FRED/CME',     confidence: 'confirmed',    lastUpdated: '2026-03-24T06:00Z' },
    treasury:  { label: '10Y Treasury',      value: 4.43,   preWar: 4.20,  unit: '%',    change: +0.23, source: 'FRED',          confidence: 'confirmed',    lastUpdated: '2026-03-24T06:00Z' },
    dollar:    { label: 'Dollar Index',      value: 99.15,  preWar: 104.2, unit: 'DXY',  change: -4.8,  source: 'FRED',          confidence: 'confirmed',    lastUpdated: '2026-03-24T06:00Z' },
    sp500:     { label: 'S&P 500',           value: 4812,   preWar: 5480,  unit: 'pts',  change: -12.2, source: 'FRED',          confidence: 'confirmed',    lastUpdated: '2026-03-24T06:00Z' },
    bitcoin:   { label: 'Bitcoin',           value: 70716,  preWar: 95000, unit: 'USD',  change: -25.6, source: 'CoinGecko',     confidence: 'multisource',  lastUpdated: '2026-03-24T08:00Z' },
    natgas:    { label: 'Nat Gas (Henry Hub)',value: 3.88,   preWar: 2.65,  unit: '$/MMBtu',change:+46.4,source: 'EIA',           confidence: 'confirmed',    lastUpdated: '2026-03-24T06:00Z' },
    usgas:     { label: 'US Avg Gas Price',  value: 4.42,   preWar: 3.28,  unit: '$/gal',change: +34.8, source: 'EIA',           confidence: 'confirmed',    lastUpdated: '2026-03-24T06:00Z' },
  },

  // ─── TIMELINE EVENTS ────────────────────────────────────────────────────────
  timelineEvents: [
    { date: '2026-02-28', type: 'military',   text: 'Operation Epic Fury begins. US strikes 150+ targets across Iran in coordinated air campaign.', source: 'CENTCOM', confidence: 'confirmed' },
    { date: '2026-02-28', type: 'military',   text: 'Iran retaliates — ballistic missiles strike UAE, Bahrain, and Qatar US bases. 13 US KIA.', source: 'Reuters', confidence: 'multisource' },
    { date: '2026-02-28', type: 'economic',   text: 'Strait of Hormuz flow collapses 97%. Brent crude surges to $112/bbl within 48 hours.', source: 'Kpler/Bloomberg', confidence: 'multisource' },
    { date: '2026-03-01', type: 'economic',   text: "Lloyd's suspends war risk coverage for Hormuz transit. Global shipping insurance crisis begins.", source: "Lloyd's of London", confidence: 'confirmed' },
    { date: '2026-03-01', type: 'diplomatic', text: 'UN Security Council emergency session. China/Russia veto ceasefire resolution.', source: 'UN', confidence: 'confirmed' },
    { date: '2026-03-02', type: 'military',   text: 'Israel strikes IRGC command nodes. 70+ Iranian officials eliminated in first week.', source: 'GeoWire', confidence: 'inferred' },
    { date: '2026-03-05', type: 'humanitarian',text: 'NetBlocks: Iran internet connectivity at 1% of normal. Civilian communications collapse.', source: 'NetBlocks', confidence: 'confirmed' },
    { date: '2026-03-08', type: 'diplomatic', text: 'Witkoff/Kushner back-channel confirmed by three officials. 5-day ceasefire window discussed.', source: 'WSJ', confidence: 'singlesource' },
    { date: '2026-03-12', type: 'political',  text: 'Ghalibaf emerges as last functional voice of Iranian state after IRGC leadership decimated.', source: 'GeoWire', confidence: 'inferred' },
    { date: '2026-03-15', type: 'economic',   text: 'S&P 500 enters correction (-12.2% from pre-war). Fed signals emergency rate review.', source: 'Bloomberg', confidence: 'confirmed' },
    { date: '2026-03-18', type: 'humanitarian',text: 'HRANA: 3,220 Iranian dead. UN estimates 800,000+ internally displaced in Tehran region.', source: 'HRANA/UN', confidence: 'singlesource' },
    { date: '2026-03-20', type: 'military',   text: 'Houthis launch 22 drones targeting US carrier group. All intercepted. No casualties.', source: 'CENTCOM', confidence: 'confirmed' },
    { date: '2026-03-22', type: 'diplomatic', text: 'Oman offers ceasefire mediation. Iran signals openness via back-channel. No official statement.', source: 'Reuters', confidence: 'multisource' },
    { date: '2026-03-24', type: 'military',   text: 'Day 25: Operation Epic Fury — sustained air campaign. Hormuz blockade continues.', source: 'CENTCOM', confidence: 'confirmed' },
  ],

  // ─── NEWS CARDS (GDELT fallback) ────────────────────────────────────────────
  newsCards: [
    { headline: 'Witkoff Confirms Back-Channel With Iran, 5-Day Window Still Open', summary: 'US envoy says ceasefire negotiations ongoing via Oman, but no terms agreed. Iranian side has not publicly acknowledged.', source: 'WSJ', confidence: 'singlesource', timestamp: '2026-03-24T07:30Z', url: '#' },
    { headline: 'Brent Crude Holds Above $112 as Hormuz Blockade Enters Day 25', summary: 'Oil markets remain in supply shock. OPEC emergency meeting called for next week. Goldman Sachs raises 3-month target to $130.', source: 'Bloomberg', confidence: 'multisource', timestamp: '2026-03-24T06:15Z', url: '#' },
    { headline: 'Ghalibaf Addresses Nation: "Iran Will Not Surrender"', summary: 'Parliament speaker, now the most senior functional official, delivered televised address vowing continued resistance. State TV broadcast partially disrupted.', source: 'Press TV / BBC Monitoring', confidence: 'multisource', timestamp: '2026-03-24T05:00Z', url: '#' },
    { headline: 'UN: 800,000 Displaced in Tehran Metropolitan Region', summary: 'Humanitarian agencies unable to access conflict zones. WFP requests emergency corridor access. Iran has not responded.', source: 'OCHA/UN', confidence: 'confirmed', timestamp: '2026-03-23T18:00Z', url: '#' },
    { headline: 'Fed Emergency Meeting: Rate Cut Being Considered Amid War Shock', summary: 'Federal Reserve governors in unscheduled session. Two governors cited "war-induced supply shock" as basis for review. No decision announced.', source: 'Reuters', confidence: 'multisource', timestamp: '2026-03-23T15:45Z', url: '#' },
    { headline: 'India Activates Emergency Oil Reserve Protocol as Imports Collapse', summary: 'India imported 1.2M bbl/day from Gulf before conflict. Emergency reserves released at 200K bbl/day. Government urges conservation.', source: 'Economic Times', confidence: 'multisource', timestamp: '2026-03-23T12:00Z', url: '#' },
  ],

  // ─── ARTICLES ───────────────────────────────────────────────────────────────
  articles: [
    { title: 'Ghalibaf: The Last Man Standing', slug: 'ghalibaf-last-man-standing', subtitle: "How Iran's parliament speaker became the last functional voice of a collapsing state", summary: "After 70+ officials were eliminated in targeted strikes, Mohammad Bagher Ghalibaf has emerged as Iran's de facto state voice — a development with major implications for ceasefire negotiations.", category: 'Geopolitical', date: '2026-03-24', readTime: 4, confidence: 'inferred', source: 'GeoWire Intelligence Desk', featured: true, link: 'article-ghalibaf.html' },
    { title: 'The Hormuz Paradox: Why Closing the Strait Hurt Iran Most', slug: 'hormuz-paradox', subtitle: 'A strategic analysis of Iran\'s self-defeating economic weapon', summary: 'The near-shutdown of the Strait of Hormuz has devastated global oil markets — but the blowback on Iran\'s already-sanctioned economy may prove more severe than intended.', category: 'Economic', date: '2026-03-22', readTime: 6, confidence: 'inferred', source: 'GeoWire Intelligence Desk', featured: false, link: '#' },
    { title: 'Operation Epic Fury: A Military Assessment', slug: 'epic-fury-assessment', subtitle: 'What the first 25 days reveal about US strike doctrine', summary: 'An analytical review of targeting priorities, munitions deployment, and the strategic logic behind the US air campaign against Iran.', category: 'Military', date: '2026-03-20', readTime: 7, confidence: 'multisource', source: 'GeoWire Intelligence Desk', featured: false, link: '#' },
    { title: "India's Energy Emergency: When the Lifeline Breaks", slug: 'india-energy-emergency', subtitle: 'How the Gulf crisis is reshaping South Asian energy security', summary: "India's dependence on Gulf crude is creating a cascading energy emergency that threatens industrial output and consumer prices across 1.4 billion people.", category: 'Energy', date: '2026-03-19', readTime: 5, confidence: 'multisource', source: 'GeoWire Intelligence Desk', featured: false, link: '#' },
    { title: 'The Ceasefire Map: What All Sides Actually Want', slug: 'ceasefire-map', subtitle: 'A breakdown of red lines, back-channels, and what a deal would require', summary: 'Using public statements and leaked back-channel details, GeoWire maps the distance between US, Iranian, and Israeli positions.', category: 'Diplomatic', date: '2026-03-17', readTime: 8, confidence: 'singlesource', source: 'GeoWire Intelligence Desk', featured: false, link: '#' },
    { title: 'تهران در محاصره: گزارش از داخل [Farsi Intel]', slug: 'tehran-under-siege-fa', subtitle: 'گزارش از منابع فارسی‌زبان داخلی', summary: 'گزارشی از وضعیت ارتباطات، جابجایی جمعیت، و اخبار منابع داخلی از منطقه تهران.', category: 'Farsi Intel', date: '2026-03-23', readTime: 5, confidence: 'singlesource', source: 'GeoWire / منابع داخلی', featured: false, link: '#' },
  ],

  // ─── COUNTRIES ──────────────────────────────────────────────────────────────
  countries: [
    { id: 'iran',   name: 'Iran',         flag: '🇮🇷', threatLevel: 'critical',  keyLeader: 'Ghalibaf (de facto)', latestAction: 'Sustained air defense operations. Civilian infrastructure heavily damaged.',                 source: 'CENTCOM/HRANA', confidence: 'multisource' },
    { id: 'usa',    name: 'United States', flag: '🇺🇸', threatLevel: 'active',    keyLeader: 'SecDef Austin',       latestAction: 'Air campaign Day 25. Congressional authorization debate ongoing.',                             source: 'DoD/Reuters',   confidence: 'confirmed' },
    { id: 'israel', name: 'Israel',        flag: '🇮🇱', threatLevel: 'elevated',  keyLeader: 'Netanyahu',           latestAction: 'Coordinating strikes on IRGC command nodes. Northern border remains tense.',                  source: 'IDF/Reuters',   confidence: 'multisource' },
    { id: 'qatar',  name: 'Qatar',         flag: '🇶🇦', threatLevel: 'elevated',  keyLeader: 'Emir Al Thani',       latestAction: 'Al Udeid Air Base (US) operational. Qatari civilian airspace partially closed.',              source: 'CENTCOM',       confidence: 'confirmed' },
    { id: 'saudi',  name: 'Saudi Arabia',  flag: '🇸🇦', threatLevel: 'moderate',  keyLeader: 'MBS',                 latestAction: 'Emergency OPEC+ session called. Air defense on full alert. Aramco production unchanged.',    source: 'Aramco/Reuters',confidence: 'multisource' },
    { id: 'uae',    name: 'UAE',           flag: '🇦🇪', threatLevel: 'elevated',  keyLeader: 'MBZ',                 latestAction: 'Two UAE bases struck on Day 1. Repairs underway. Dubai flights disrupted 72hrs.',             source: 'UAE Ministry',  confidence: 'confirmed' },
    { id: 'oman',   name: 'Oman',          flag: '🇴🇲', threatLevel: 'stable',    keyLeader: 'Sultan Haitham',      latestAction: 'Offering ceasefire mediation. Maintaining diplomatic channels with both sides.',               source: 'Reuters',       confidence: 'multisource' },
    { id: 'china',  name: 'China',         flag: '🇨🇳', threatLevel: 'stable',    keyLeader: 'Xi Jinping',          latestAction: 'Vetoed UN ceasefire. Emergency oil reserve release. Accelerating Iran investment talks.',      source: 'Xinhua/Reuters',confidence: 'confirmed' },
    { id: 'russia', name: 'Russia',        flag: '🇷🇺', threatLevel: 'stable',    keyLeader: 'Putin',               latestAction: 'Vetoed UN ceasefire. Supplying Iran with S-400 spare parts via Azerbaijan corridor.',          source: 'Kommersant',    confidence: 'singlesource' },
  ],

  // ─── SCENARIOS ──────────────────────────────────────────────────────────────
  scenarios: [
    { type: 'best', title: 'Ceasefire Within 10 Days', probability: 22, timeframe: 'Days 26–35', confidence: 'inferred', summary: 'Oman-mediated talks produce 72-hour humanitarian ceasefire, leading to structured negotiations. Hormuz partially reopens within 2 weeks.', keyPoints: ['Witkoff/Ghalibaf back-channel produces framework', 'Iran agrees to inspection regime for nuclear sites', 'Hormuz partial reopening (40%) within 14 days', 'Oil retraces to $85–90/bbl'], keyRisks: ['IRGC hardliners reject any deal', 'Israeli strike on nuclear facility disrupts talks', 'US Congress demands harder terms'], source: 'GeoWire Analysis' },
    { type: 'base', title: 'Protracted Low-Intensity Conflict', probability: 51, timeframe: 'Months 2–4', confidence: 'inferred', summary: 'Conflict continues at current tempo. No ceasefire. Hormuz remains near-closed. Global economy absorbs shock but pressure builds.', keyPoints: ['Sustained US air campaign, no ground invasion', 'Hormuz stays at 5–15% capacity', 'Oil stabilizes $100–120 range', 'Ghalibaf consolidates power, explores back-channels', 'Proxy war via Houthis/Hezbollah continues'], keyRisks: ['Domestic US political pressure mounts', 'India/Pakistan energy crisis escalates', 'Israel expands operation scope'], source: 'GeoWire Analysis' },
    { type: 'worst', title: 'Regional Escalation / Ground Phase', probability: 27, timeframe: 'Days 30–60', confidence: 'inferred', summary: 'Conflict expands to ground phase or proxy actors trigger broader regional war. Hormuz fully closed for 60+ days. Oil above $150.', keyPoints: ['Ground incursion into southern Iran or Iran-Iraq border', 'Hezbollah opens full northern front vs. Israel', 'Chinese naval assets position near Hormuz', 'Oil exceeds $150/bbl, triggering global recession signals', 'Currency crises in Pakistan, Egypt, Sri Lanka'], keyRisks: ['Nuclear dimension emerges (tactical)', 'Chinese economic ultimatum to US', 'US carrier group targeted successfully'], source: 'GeoWire Analysis' },
  ],

  // ─── ALLIANCES DATA ─────────────────────────────────────────────────────────
  alliancesData: [
    { country: 'China',       flag: '🇨🇳', alignment: 'Iran-aligned',   supports: ['Iran (diplomatic)', 'Russia (UN veto)'], opposes: ['US sanctions', 'Hormuz military presence'], notes: 'Economic interest over military. Quietly accelerating Iran investment.' },
    { country: 'Russia',      flag: '🇷🇺', alignment: 'Iran-aligned',   supports: ['Iran (military equipment)', 'UN veto bloc'], opposes: ['US unilateral action', 'NATO expansion narrative'], notes: 'Supplying spare parts via back routes. Benefits from oil price surge.' },
    { country: 'Qatar',       flag: '🇶🇦', alignment: 'US-aligned',     supports: ['Al Udeid Air Base access'], opposes: ['Iranian aggression'], notes: 'Hosts largest US air base. Under threat but maintaining cooperation.' },
    { country: 'Saudi Arabia',flag: '🇸🇦', alignment: 'US-aligned',     supports: ['Oil stability narrative', 'Sunni coalition'], opposes: ['Iranian hegemony', 'Houthi proxies'], notes: 'Benefiting from oil price but fearing regional destabilization.' },
    { country: 'UAE',         flag: '🇦🇪', alignment: 'US-aligned',     supports: ['US bases', 'sanctions coalition'], opposes: ['Iranian strikes'], notes: 'Struck on Day 1. Strengthening missile defense.' },
    { country: 'Turkey',      flag: '🇹🇷', alignment: 'Neutral',        supports: ['Ceasefire mediation', 'humanitarian corridors'], opposes: ['Neither side publicly'], notes: 'Balancing NATO membership with Iran trade relationships.' },
    { country: 'India',       flag: '🇮🇳', alignment: 'Strategic abstain', supports: ['UN ceasefire calls'], opposes: ['Unilateral military action'], notes: 'Energy emergency forces engagement with both sides. Abstained in UNSC.' },
    { country: 'Houthis (Yemen)', flag: '🇾🇪', alignment: 'Iran proxy', supports: ['Drone campaign vs. US carriers'], opposes: ['US/Israel'], notes: '22 drones launched Day 20. All intercepted. Provides Iran with second front.' },
  ],

  // ─── HUMANITARIAN DATA ──────────────────────────────────────────────────────
  humanitarianData: {
    iranianDead:      { value: 3220,  source: 'HRANA',        confidence: 'singlesource', note: 'Human Rights Activists News Agency. Access limited, likely undercount.' },
    usKIA:            { value: 13,    source: 'CENTCOM',       confidence: 'confirmed',    note: 'Official DoD figure. 47 wounded.' },
    civilianDead:     { value: 1840,  source: 'HRANA/MSF',    confidence: 'singlesource', note: 'Estimate. Conflict zone access severely restricted.' },
    idpCount:         { value: 820000,source: 'OCHA/UN',      confidence: 'confirmed',    note: 'Internally displaced. Tehran metropolitan region.' },
    refugeeFlow:      { value: 45000, source: 'UNHCR',        confidence: 'multisource',  note: 'Fled to Turkey, Azerbaijan, Iraq. 72hr snapshot.' },
    internetFreedom:  { value: 1,     source: 'NetBlocks',    confidence: 'confirmed',    note: 'Iran internet at ~1% of normal capacity. Confirmed by NetBlocks monitoring.' },
    infrastructureDamage: [
      { site: 'Tehran power grid',    status: 'Partial (40%)', source: 'IAEA monitoring', confidence: 'multisource' },
      { site: 'Natanz facility',      status: 'Destroyed',     source: 'IAEA/ISS',        confidence: 'multisource' },
      { site: 'Bandar Abbas port',    status: 'Operational',   source: 'Kpler',           confidence: 'confirmed' },
      { site: 'Isfahan refinery',     status: 'Damaged (60%)', source: 'Rystad Energy',   confidence: 'singlesource' },
    ],
  },

  // ─── TRADE DATA ─────────────────────────────────────────────────────────────
  tradeData: {
    hormuzFlow: { current: 3, normal: 100, unit: '%', source: 'Kpler', confidence: 'singlesource', note: '97% flow reduction. ~21M bbl/day normally transits Hormuz.' },
    shippingRoutes: [
      { route: 'Strait of Hormuz',     status: 'CLOSED (97%)',   risk: 'critical',  source: 'Kpler',         confidence: 'singlesource' },
      { route: 'Suez Canal',           status: 'Disrupted (40%)',risk: 'elevated',  source: 'Suez Authority',confidence: 'confirmed' },
      { route: 'Cape of Good Hope alt',status: 'Active (+$800K/voyage)', risk: 'moderate', source: 'Clarksons', confidence: 'multisource' },
      { route: 'Red Sea / Bab el-Mandeb',status:'Elevated risk', risk: 'elevated',  source: 'UKMTO',         confidence: 'confirmed' },
    ],
    commodityChains: [
      { commodity: 'Crude Oil',        exposure: 'Critical',  detail: '21M bbl/day normally via Hormuz. Global supply down 20%.', source: 'IEA',        confidence: 'confirmed' },
      { commodity: 'LNG (Qatar)',       exposure: 'Critical',  detail: 'Qatar exports 80M tonnes/yr via Hormuz. Redirecting to LNG tankers.', source: 'Kpler',    confidence: 'multisource' },
      { commodity: 'Container Shipping',exposure: 'High',     detail: 'Rerouting via Cape adds 14+ days transit time.', source: 'Clarksons',  confidence: 'multisource' },
      { commodity: 'Petrochemicals',   exposure: 'High',      detail: 'Iran = 5% of global supply. Substitute supply tight.', source: 'ICIS',      confidence: 'multisource' },
      { commodity: 'Fertilizers',      exposure: 'Elevated',  detail: 'Iran exports 2M+ tonnes/yr. Agricultural impact lag 3–6 months.', source: 'FAO',    confidence: 'confirmed' },
    ],
    insuranceStatus: { provider: "Lloyd's of London", status: 'War risk suspended for Hormuz transit', premium: 'N/A (suspended)', source: "Lloyd's", confidence: 'confirmed', date: '2026-03-01' },
  },

  // ─── US IMPACT DATA ─────────────────────────────────────────────────────────
  usImpactData: {
    gasPrices:       { current: 4.42, preWar: 3.28, unit: '$/gal', change: +34.8, source: 'EIA', confidence: 'confirmed' },
    militaryCost:    { daily: 250,  total: 6250,  unit: '$M',    source: 'CSIS estimate', confidence: 'inferred', note: 'Estimated. DoD has not released official figures.' },
    economicExposure:{ gdpImpact: -0.8, unit: '% GDP drag est.', source: 'Goldman Sachs', confidence: 'inferred' },
    sectors: [
      { name: 'Airlines',         impact: 'High',     detail: 'Jet fuel +48%. Route disruptions via Gulf.', source: 'IATA', confidence: 'multisource' },
      { name: 'Trucking/Logistics',impact: 'High',    detail: 'Diesel +38%. Supply chain delays compounding.', source: 'ATA', confidence: 'multisource' },
      { name: 'Agriculture',      impact: 'Elevated', detail: 'Fertilizer costs +22%. Harvest margin pressure.', source: 'USDA', confidence: 'confirmed' },
      { name: 'Consumer Goods',   impact: 'Elevated', detail: 'Import cost inflation 6–12% on Gulf-routed goods.', source: 'NRF', confidence: 'inferred' },
      { name: 'Defense/Energy',   impact: 'Positive', detail: 'Defense stocks +18%, US domestic E&P up 31%.', source: 'Bloomberg', confidence: 'multisource' },
    ],
  },

  // ─── NARRATIVE FRAMES ───────────────────────────────────────────────────────
  narrativeFrames: [
    { perspective: 'US / CENTCOM',    flag: '🇺🇸', framing: 'Defensive strike against existential nuclear threat', points: ['Iran was weeks from nuclear breakout', 'Strike was legal under self-defense (UNSC 1540)', '13 US KIA vs. thousands prevented', 'Coalition of Gulf partners supports action'], omissions: 'Does not address civilian casualty estimates or long-term regional stability costs.', confidence: 'inferred' },
    { perspective: 'Iranian State',   flag: '🇮🇷', framing: 'Illegal aggression against a sovereign nation', points: ['JCPOA betrayal by US in 2018 caused this', 'No nuclear weapons program — IAEA confirmed compliance', 'Civilian deaths are war crimes under Geneva', 'Resistance will prevail — 1980 war lasted 8 years'], omissions: 'Does not acknowledge human rights context or proxy war operations (Houthis, Hezbollah).', confidence: 'inferred' },
    { perspective: 'Israeli Government',flag:'🇮🇱', framing: 'Existential threat neutralized — finally', points: ['Iran has funded Hamas/Hezbollah for 30+ years', 'Nuclear Iran = second Holocaust risk', 'October 7 context: Iran directed attack', 'Israel has right and obligation to defend itself'], omissions: 'Downplays civilian impact in Iran. Does not address regional power vacuum risk.', confidence: 'inferred' },
    { perspective: 'Gulf States',     flag: '🇸🇦', framing: 'Iranian hegemony check — but at enormous cost', points: ['Iran destabilized the region for decades via proxies', 'Houthis and IRGC must be neutralized', 'But Hormuz closure is economic catastrophe for all', 'Need ceasefire to reopen trade — fast'], omissions: 'Gulf states privately opposed to ground invasion. Divided internally on pace of conflict.', confidence: 'inferred' },
    { perspective: 'China / Russia',  flag: '🇨🇳', framing: 'US unilateralism destroying international order', points: ['US bypassed UN Security Council', 'Illegal under international law — no UNSC resolution', 'Iran had legal nuclear energy rights', 'Dollar weaponization reveals need for multipolar system'], omissions: 'Neither nation critical of their own veto that blocked ceasefire. Ignores Iran proxy warfare history.', confidence: 'inferred' },
    { perspective: 'Western Press',   flag: '📰', framing: 'Necessary but costly — outcome deeply uncertain', points: ['Strike may have delayed nuclear program 5–10 years', 'Civilian cost and humanitarian law questions remain', 'No exit strategy visible', 'Ceasefire negotiations critical for global stability'], omissions: 'Often underweights Farsi-language sources. Regional perspective underrepresented in Western outlets.', confidence: 'inferred' },
  ],

  // ─── EXPOSURE FACTORS ───────────────────────────────────────────────────────
  exposureFactors: {
    gasMultiplier:      { US: 0.35, UK: 0.22, EU: 0.20, India: 0.28, Pakistan: 0.42, Japan: 0.18, Other: 0.25 },
    groceryMultiplier:  { US: 0.07, UK: 0.06, EU: 0.05, India: 0.09, Pakistan: 0.12, Japan: 0.05, Other: 0.08 },
    stockExposure:      { US: 'High — direct market exposure. Energy stocks volatile.', UK: 'Medium — FTSE 100 energy-heavy.', EU: 'Medium', India: 'Low-Medium', Pakistan: 'Low', Japan: 'Medium — import-heavy economy.', Other: 'Varies' },
    logisticsExposure:  { US: 'High', UK: 'High', EU: 'High', India: 'Critical', Pakistan: 'Critical', Japan: 'High', Other: 'Medium' },
  },

  // ─── KALSHI MODULE (placeholder) ────────────────────────────────────────────
  kalshiModuleData: {
    ceasefireWithin30Days: { value: 28, unit: '%', source: 'DEMO — Kalshi (not live)', confidence: 'inferred', note: 'Market-implied probability. Not a GeoWire forecast.' },
    hormuzReopenWithin60:  { value: 44, unit: '%', source: 'DEMO — Polymarket (not live)', confidence: 'inferred', note: 'Market-implied probability. Not a GeoWire forecast.' },
    oilAbove130:           { value: 31, unit: '%', source: 'DEMO — Kalshi (not live)', confidence: 'inferred', note: 'Market-implied probability. Not a GeoWire forecast.' },
    usGroundInvasion:      { value: 8,  unit: '%', source: 'DEMO — Polymarket (not live)', confidence: 'inferred', note: 'Market-implied probability. Not a GeoWire forecast.' },
  },

  // ─── WAR COST ────────────────────────────────────────────────────────────────
  warCost: {
    startDate: '2026-02-28T00:00:00Z',
    dailyCostUSD: 1750000000,   // $1.75B/day estimate
    perSecond: 20255,            // $20,255/sec
    source: 'CSIS estimate',
    confidence: 'inferred',
    note: 'Estimate includes US military operations, proxy costs, and direct economic disruption. Not official.',
  },

  // ─── UPDATE LOG (for what-changed.html) ─────────────────────────────────────
  updateLog: [
    { timestamp: '2026-03-24T08:00Z', category: 'Diplomatic', item: 'Oman ceasefire offer', change: 'New → Ghalibaf signals openness via back-channel', source: 'Reuters', confidence: 'multisource' },
    { timestamp: '2026-03-24T06:00Z', category: 'Market',     item: 'Brent Crude', change: '$109.80 → $112.40 (+2.4%)', source: 'Bloomberg', confidence: 'multisource' },
    { timestamp: '2026-03-23T18:00Z', category: 'Humanitarian',item: 'IDP count', change: '780,000 → 820,000 (+5.1%)', source: 'OCHA', confidence: 'confirmed' },
    { timestamp: '2026-03-23T12:00Z', category: 'Political',  item: 'Ghalibaf status', change: 'Elevated from "official" → "de facto state leader"', source: 'GeoWire', confidence: 'inferred' },
    { timestamp: '2026-03-22T09:00Z', category: 'Military',   item: 'Houthi drone attack', change: '22 drones launched vs. USS Gerald R. Ford. All intercepted.', source: 'CENTCOM', confidence: 'confirmed' },
    { timestamp: '2026-03-21T15:00Z', category: 'Market',     item: 'S&P 500', change: '4880 → 4812 (-1.4%) — entering correction territory', source: 'Bloomberg', confidence: 'confirmed' },
  ],

};

// Make available globally
if (typeof window !== 'undefined') window.GEOWIRE = GEOWIRE;
if (typeof module !== 'undefined') module.exports = GEOWIRE;

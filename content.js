/**
 * GeoWire — content.js
 * Single source of truth for all seed data, metadata, and data structures.
 * Phase 1 · Operation Epic Fury · Day 25 · Seed date: 2026-02-28
 */

const GW = window.GW || {};

// ─── SITE META ───────────────────────────────────────────────────────────────
GW.meta = {
  siteName: 'GeoWire',
  tagline: 'Signal Through the Noise',
  conflictName: 'Operation Epic Fury',
  conflictStart: '2026-02-28',   // Day 1
  seedDay: 25,
  adsenseId: 'ca-pub-5068519853957013',
  lang: { default: 'en', farsiKey: 'geowire-lang' },
};

// ─── CONFIDENCE RAIL ─────────────────────────────────────────────────────────
GW.confidence = {
  confirmed:    { icon: '🟢', label: 'Confirmed',      labelFa: 'تأیید‌شده' },
  multi:        { icon: '🟡', label: 'Multi-source',   labelFa: 'چند منبع' },
  single:       { icon: '🟠', label: 'Single-source',  labelFa: 'یک منبع' },
  inferred:     { icon: '⚫', label: 'Model-inferred', labelFa: 'برآورد مدل' },
  disputed:     { icon: '⚠️', label: 'Disputed',       labelFa: 'مورد اختلاف' },
};

// ─── NAV SECTIONS ────────────────────────────────────────────────────────────
GW.nav = [
  { id: 'energy',      label: 'Energy',       labelFa: 'انرژی',         href: 'energy.html' },
  { id: 'countries',   label: 'Countries',    labelFa: 'کشورها',        href: 'countries.html' },
  { id: 'scenarios',   label: 'Scenarios',    labelFa: 'سناریوها',      href: 'scenarios.html' },
  { id: 'trade',       label: 'Trade',        labelFa: 'تجارت',         href: 'trade.html' },
  { id: 'us-impact',   label: 'US Impact',    labelFa: 'تأثیر آمریکا', href: 'us-impact.html' },
  { id: 'humanitarian',label: 'Humanitarian', labelFa: 'بشردوستانه',    href: 'humanitarian.html' },
  { id: 'geopolitical',label: 'Geopolitical', labelFa: 'ژئوپلیتیک',    href: 'geopolitical.html' },
  { id: 'analysis',    label: 'Analysis',     labelFa: 'تحلیل',         href: 'analysis.html' },
];

// ─── SEED ARTICLES ───────────────────────────────────────────────────────────
GW.articles = [
  {
    id: 'epic-fury-day25-update',
    section: 'geopolitical',
    title: 'Operation Epic Fury — Day 25 Sitrep',
    titleFa: 'عملیات اپیک فیوری — گزارش روز ۲۵',
    date: '2026-03-24',
    confidence: 'multi',
    tags: ['operation-epic-fury', 'sitrep', 'iran', 'us-military'],
    summary: 'US-led coalition forces continue precision strikes against hardened nuclear and missile infrastructure. Iran has not signaled intent to negotiate. Regional allies remain on high alert.',
    summaryFa: 'نیروهای ائتلاف به رهبری آمریکا به حملات دقیق علیه زیرساخت‌های هسته‌ای و موشکی ادامه می‌دهند.',
    body: `Day 25 of Operation Epic Fury brings continued coalition air operations over western and central Iran. CENTCOM confirmed strikes on three additional hardened bunker complexes near Fordow and Isfahan overnight. No civilian casualties reported by coalition sources; Iranian state media claims otherwise.\n\nDiplomatic channels remain frozen. The UN Security Council convened an emergency session but reached no resolution, with Russia and China vetoing a US-UK-France ceasefire framework draft.\n\nIran's IRGC Aerospace Force has launched intermittent drone salvos toward Gulf shipping lanes; four USV (Unmanned Surface Vessels) were destroyed by MH-60R helicopters operating from USS Nimitz battle group.`,
    liveDataIds: ['wti', 'gold', 'dxy'],
  },
  {
    id: 'iran-strait-closure-threat',
    section: 'energy',
    title: 'Iran Threatens Hormuz Closure as Fuel Prices Spike',
    titleFa: 'ایران تهدید به بستن تنگه هرمز کرد',
    date: '2026-03-23',
    confidence: 'confirmed',
    tags: ['hormuz', 'iran', 'oil', 'energy'],
    summary: 'Iranian leadership has formally threatened to close the Strait of Hormuz following Day 22 coalition strikes. Brent crude surged past $140/bbl on the announcement.',
    summaryFa: 'رهبری ایران رسماً تهدید به بستن تنگه هرمز کرد. برنت نفت از ۱۴۰ دلار عبور کرد.',
    body: `Iran's Supreme National Security Council issued a formal statement on March 23 warning that "any continuation of aggression" would trigger the closure of the Strait of Hormuz. An estimated 21 million barrels per day transit this chokepoint.\n\nBrent crude spiked to $143.20/bbl within hours of the statement, before settling near $138.50. The US 5th Fleet in Bahrain has been on DEFCON 3-equivalent readiness since Day 1. Multiple minesweeping vessels have pre-positioned in the Gulf.\n\nSaudi Arabia, the UAE, and Qatar have accelerated alternate export routes: the East-West Pipeline and the Habshan-Fujairah pipeline are both operating at full capacity. Analysts estimate these alternatives can handle approximately 8 million bpd — 38% of normal Hormuz volume.`,
    liveDataIds: ['wti', 'brent'],
  },
  {
    id: 'sanctions-russia-china-response',
    section: 'trade',
    title: 'Russia and China Announce Counter-Sanctions Package',
    titleFa: 'روسیه و چین بسته تحریم‌های متقابل اعلام کردند',
    date: '2026-03-22',
    confidence: 'confirmed',
    tags: ['sanctions', 'russia', 'china', 'trade'],
    summary: 'Moscow and Beijing announced a joint counter-sanctions framework targeting US tech, agricultural, and financial exports. USD/CNY hit 8.12 on news.',
    summaryFa: 'مسکو و پکن چارچوب مشترک تحریم‌های متقابل علیه صادرات فناوری، کشاورزی و مالی آمریکا اعلام کردند.',
    body: `In a joint communiqué published March 22, Russia and China announced a coordinated package of economic countermeasures targeting the United States and its G7 partners. The measures include:\n\n• Suspension of Boeing aircraft part sales\n• Prohibition on US semiconductor equipment imports into any BRI-aligned nation\n• Rerouting of Russian energy exports entirely through non-dollar settlement (yuan, rupee, dirham)\n• Freezing of US Treasury holdings review — suggesting threat of coordinated bond market pressure\n\nThe yuan touched 8.12 per dollar, its weakest since the 2015 devaluation shock. Gold responded by rising above $3,200/oz. Bitcoin briefly topped $98,000 on safe-haven speculation.`,
    liveDataIds: ['gold', 'btc'],
  },
  {
    id: 'us-homeowner-fuel-costs',
    section: 'us-impact',
    title: 'American Household Fuel Bills Up 38% Since Conflict Start',
    titleFa: 'هزینه سوخت خانوارهای آمریکایی ۳۸٪ افزایش یافت',
    date: '2026-03-21',
    confidence: 'multi',
    tags: ['us-economy', 'fuel', 'inflation', 'household'],
    summary: 'EIA data shows average US household fuel expenditure has risen 38% since Operation Epic Fury began Feb 28. Gallon of regular gas averages $5.47 nationally.',
    summaryFa: 'داده‌های EIA نشان می‌دهد هزینه سوخت خانوارهای آمریکایی از آغاز عملیات ۳۸٪ افزایش یافته است.',
    body: `The US Energy Information Administration's weekly petroleum report (released March 20) shows the national average for a gallon of regular unleaded gasoline reached $5.47 — up from $3.96 on February 27, the day before Operation Epic Fury commenced.\n\nBy region, the West Coast is hardest hit at $6.21/gal. The Gulf Coast has seen the smallest increase at $4.89/gal, partially buffered by proximity to refinery capacity.\n\nThe Administration has released 20 million barrels from the Strategic Petroleum Reserve and is negotiating emergency supply agreements with Saudi Arabia and the UAE. Airlines have announced surcharges averaging $45 per transatlantic leg. Trucking associations estimate freight costs have risen 22%, with pass-through inflation in consumer goods expected to appear in April CPI data.`,
    liveDataIds: ['wti'],
  },
  {
    id: 'humanitarian-iran-civilian',
    section: 'humanitarian',
    title: 'UN: 2.3M Iranians Displaced in 25 Days',
    titleFa: 'سازمان ملل: ۲.۳ میلیون ایرانی در ۲۵ روز آواره شدند',
    date: '2026-03-24',
    confidence: 'single',
    tags: ['humanitarian', 'iran', 'displacement', 'un'],
    summary: 'UNHCR estimates 2.3 million internally displaced persons inside Iran since Feb 28. Turkish and Iraqi borders handling overflow; aid corridors remain contested.',
    summaryFa: 'کمیساریای عالی پناهندگان: ۲.۳ میلیون نفر از آغاز درگیری در ایران آواره شده‌اند.',
    body: `UNHCR's latest flash situation report (March 24) estimates 2.3 million Iranians have been internally displaced since the conflict began. The majority have moved from Tehran, Isfahan, and western provinces toward eastern regions and borders.\n\nTurkey reports over 340,000 new arrivals at its eastern border crossings, straining facilities designed for 50,000. Iraq's Kurdish Regional Government has opened three emergency reception centers.\n\nAccess for international humanitarian organizations remains severely limited. The ICRC has been denied access to strike zones by both coalition forces (security concerns) and Iranian authorities (information control). Médecins Sans Frontières reports operating seven field hospitals near the Iraqi border but faces supply chain interruptions due to airspace closures.\n\nWater infrastructure in at least six major cities has been damaged; WHO warns of acute diarrheal disease outbreaks within 30 days without emergency WASH interventions.`,
    liveDataIds: [],
  },
  {
    id: 'gold-surge-safe-haven',
    section: 'analysis',
    title: 'Gold at $3,200: Safe-Haven Mechanics in a Hot War',
    titleFa: 'طلا به ۳۲۰۰ دلار رسید: مکانیسم پناهگاه امن در جنگ گرم',
    date: '2026-03-23',
    confidence: 'confirmed',
    tags: ['gold', 'markets', 'safe-haven', 'analysis'],
    summary: 'Gold has risen 18% since Operation Epic Fury began. Historical pattern analysis shows mid-conflict plateaus before resolution-driven corrections.',
    summaryFa: 'طلا از آغاز عملیات ۱۸٪ افزایش یافته. تحلیل الگوی تاریخی نشان می‌دهد سقف‌های میان‌مدت قبل از تصحیح.',
    body: `Gold broke above $3,200/oz on March 22, marking an 18% gain from its pre-conflict price of $2,712/oz on February 27. The move follows a textbook flight-to-quality pattern: equities sold off, USD initially strengthened (before being undermined by fiscal concerns), and gold absorbed institutional flows.\n\nHistorical conflict analysis (Gulf War 1990–91, Iraq 2003, Russia-Ukraine 2022) suggests gold typically plateaus 3–5% above peak conflict-entry prices once the initial shock is priced in. If that pattern holds, the $3,200–3,400 range may prove sticky.\n\nKey risk: If Iran executes Hormuz closure, another $200–300/oz leg up is plausible on energy-inflation fears. Downside scenario: rapid ceasefire or negotiated settlement would likely see a 10–15% correction within two weeks of announcement.`,
    liveDataIds: ['gold'],
  },
  {
    id: 'scenario-extended-conflict',
    section: 'scenarios',
    title: 'Scenario: Extended Conflict (90+ Days)',
    titleFa: 'سناریو: درگیری طولانی‌مدت (۹۰+ روز)',
    date: '2026-03-20',
    confidence: 'inferred',
    tags: ['scenarios', 'wargame', 'iran', 'conflict-duration'],
    summary: 'If the conflict extends beyond 90 days, model analysis points to: $180+ Brent, USD reserve currency pressure, regional proxy escalation, and possible Chinese economic coercion.',
    summaryFa: 'اگر درگیری بیش از ۹۰ روز طول بکشد: برنت بالای ۱۸۰ دلار، فشار بر ذخایر دلاری و احتمال تشدید.',
    body: `Probability estimate: 22% (model-inferred, single analyst)\n\nKey assumptions:\n• Iran's hardened facilities survive Day 60 strike package (plausible given Fordow depth)\n• No internal regime change or coup\n• Russia/China continue counter-sanctions support\n• US domestic political pressure does not force withdrawal\n\nEconomic projections at Day 90:\n• Brent crude: $175–190/bbl\n• US CPI spike: +4.2% sequential\n• S&P 500: -18% from Feb 27 close\n• Gold: $3,500–3,800/oz\n• Iran GDP contraction: -35% annualized\n• Regional displacement: 6–8 million persons\n\nGeopolitical triggers to watch:\n• Hezbollah second-front activation (Lebanon/Israel)\n• Pakistani nuclear posture signaling\n• Houthi Red Sea interdiction resumption\n• Chinese financial countermeasures against US Treasuries`,
    liveDataIds: ['wti', 'gold'],
  },
  {
    id: 'scenario-rapid-ceasefire',
    section: 'scenarios',
    title: 'Scenario: Rapid Ceasefire (Sub-30 Days)',
    titleFa: 'سناریو: آتش‌بس سریع (کمتر از ۳۰ روز)',
    date: '2026-03-20',
    confidence: 'inferred',
    tags: ['scenarios', 'ceasefire', 'iran', 'diplomacy'],
    summary: 'A sub-30-day ceasefire scenario driven by Iranian capitulation or back-channel deal via Oman. Probability: 18%. Would trigger sharp energy and gold corrections.',
    summaryFa: 'سناریوی آتش‌بس سریع از طریق تسلیم ایران یا کانال پشتی از طریق عمان. احتمال: ۱۸٪.',
    body: `Probability estimate: 18% (model-inferred)\n\nOman has historically served as an intermediary between Tehran and Washington. Back-channel talks reportedly began on Day 12 via Muscat, though neither party has confirmed.\n\nKey conditions for rapid ceasefire:\n• Iranian agreement to halt uranium enrichment above 5% and IAEA snap inspections\n• Coalition agreement to halt strikes and begin phased withdrawal from Iranian airspace\n• UN-administered monitoring framework\n• Escrow release of $30B+ in frozen Iranian assets as good-faith gesture\n\nMarket reaction model on ceasefire announcement:\n• Brent: -22% within 48 hours\n• Gold: -12% within 72 hours\n• USD: +3% (risk-off unwind)\n• S&P 500: +6–8% relief rally\n• Iran rial: +40% if sanctions rollback credible`,
    liveDataIds: ['wti', 'gold', 'dxy'],
  },
  {
    id: 'china-belt-road-realignment',
    section: 'geopolitical',
    title: 'China Accelerates BRI Realignment Around Conflict Zone',
    titleFa: 'چین مسیر کمربند و جاده را دور منطقه درگیری تسریع می‌کند',
    date: '2026-03-22',
    confidence: 'multi',
    tags: ['china', 'bri', 'trade-routes', 'geopolitical'],
    summary: 'Beijing is fast-tracking alternate BRI corridors through Central Asia to reduce dependence on Persian Gulf transit routes disrupted by Operation Epic Fury.',
    summaryFa: 'پکن مسیرهای جایگزین کمربند و جاده از آسیای مرکزی را تسریع می‌کند.',
    body: `China's Ministry of Commerce announced an emergency acceleration of Trans-Caspian and Northern Corridor BRI infrastructure spending on March 21. The $4.2B package focuses on rail links through Kazakhstan and Azerbaijan that bypass the Persian Gulf entirely.\n\nThis reflects Beijing's strategic calculus: the conflict threatens China's single largest supply chain vulnerability — Middle East energy imports representing ~52% of crude oil needs. The realignment also serves as leverage against Gulf states to maintain favorable pricing regardless of conflict outcome.\n\nAnalysts at Rhodium Group note this acceleration was likely pre-planned, with the conflict providing political cover for infrastructure investments that also strengthen China's grip on Central Asian supply chains.`,
    liveDataIds: [],
  },
  {
    id: 'energy-europe-winter-gas',
    section: 'energy',
    title: 'Europe\'s Winter Gas Stocks Under Pressure Despite Mild Season',
    titleFa: 'ذخایر گاز زمستانی اروپا علی‌رغم فصل ملایم تحت فشار است',
    date: '2026-03-21',
    confidence: 'confirmed',
    tags: ['europe', 'gas', 'energy-security', 'lng'],
    summary: 'European gas storage at 38% — above 5-year average for late March, but LNG spot prices have doubled since Feb 28 as buyers compete with Asian demand surge.',
    summaryFa: 'ذخایر گاز اروپا ۳۸٪ — بالاتر از میانگین ۵ ساله، اما قیمت‌های LNG دو برابر شده‌اند.',
    body: `Aggregated EU natural gas storage stood at 38% of capacity on March 23 — above the 5-year average of 31% for this period, thanks to a mild winter. However, European energy planners are not celebrating.\n\nLNG spot prices have more than doubled since Feb 28, driven by competing demand from Japan, South Korea, and China — all accelerating purchases amid uncertainty about Gulf supplies. European utilities are competing at elevated prices, and the forward curve suggests summer injection season costs will be 60–80% above 2025.\n\nNorwegian pipeline gas output is at maximum capacity. Algeria and Libya exports remain stable but insufficient to replace potential Gulf shortfalls. UK National Grid has issued two emergency winter-preparedness updates for the 2026–27 season, citing the conflict as the primary risk factor.`,
    liveDataIds: ['nat_gas'],
  },
];

// ─── LIVE DATA SEED ──────────────────────────────────────────────────────────
// Fallback values shown when APIs fail. Updated seed date: 2026-03-24
GW.seedData = {
  wti:     { value: 127.40, unit: '$/bbl',  label: 'WTI Crude',     source: 'FRED',       ts: '2026-03-24T00:00:00Z' },
  brent:   { value: 132.80, unit: '$/bbl',  label: 'Brent Crude',   source: 'EIA',        ts: '2026-03-24T00:00:00Z' },
  nat_gas: { value: 8.72,   unit: '$/MMBtu',label: 'Natural Gas',   source: 'EIA',        ts: '2026-03-24T00:00:00Z' },
  gold:    { value: 3214.50,unit: '$/oz',   label: 'Gold',          source: 'FRED',       ts: '2026-03-24T00:00:00Z' },
  dxy:     { value: 103.24, unit: 'index',  label: 'DXY (USD)',     source: 'FRED',       ts: '2026-03-24T00:00:00Z' },
  btc:     { value: 94820,  unit: 'USD',    label: 'Bitcoin',       source: 'CoinGecko',  ts: '2026-03-24T00:00:00Z' },
  sp500:   { value: 4780,   unit: 'pts',    label: 'S&P 500',       source: 'FRED',       ts: '2026-03-24T00:00:00Z' },
  us10y:   { value: 4.68,   unit: '%',      label: 'US 10Y Yield',  source: 'FRED',       ts: '2026-03-24T00:00:00Z' },
};

// ─── ENERGY DATA ─────────────────────────────────────────────────────────────
GW.energy = {
  chokepoints: [
    {
      name: 'Strait of Hormuz',
      nameFa: 'تنگه هرمز',
      flow: '21 Mbpd',
      status: 'threatened',
      statusLabel: 'Closure Threatened',
      statusLabelFa: 'تهدید بسته شدن',
      notes: 'Iran formally threatened closure on Day 22. USN minesweepers pre-positioned.',
    },
    {
      name: 'Suez Canal',
      nameFa: 'کانال سوئز',
      flow: '9.5 Mbpd',
      status: 'disrupted',
      statusLabel: 'Disrupted',
      statusLabelFa: 'مختل',
      notes: 'Houthi resumption of Red Sea attacks has diverted traffic via Cape of Good Hope.',
    },
    {
      name: 'Bab-el-Mandeb',
      nameFa: 'باب المندب',
      flow: '6.2 Mbpd',
      status: 'disrupted',
      statusLabel: 'Disrupted',
      statusLabelFa: 'مختل',
      notes: 'Houthi drone and missile attacks active as of Day 23.',
    },
    {
      name: 'Turkish Straits',
      nameFa: 'تنگه‌های ترکیه',
      flow: '2.4 Mbpd',
      status: 'normal',
      statusLabel: 'Normal',
      statusLabelFa: 'عادی',
      notes: 'No disruption. Turkey maintains neutrality.',
    },
  ],
  oilProducers: [
    { country: 'Saudi Arabia', output: '10.2 Mbpd', change: '+0.8', notes: 'Boosting output as buffer' },
    { country: 'USA',          output: '13.4 Mbpd', change: '+0.3', notes: 'SPR taps; Permian at max' },
    { country: 'Russia',       output: '9.1 Mbpd',  change: '-0.4', notes: 'Sanctions redirect flows' },
    { country: 'Iran',         output: '2.1 Mbpd',  change: '-1.8', notes: 'Export routes disrupted' },
    { country: 'UAE',          output: '3.8 Mbpd',  change: '+0.5', notes: 'Habshan-Fujairah active' },
    { country: 'Iraq',         output: '4.2 Mbpd',  change: '0.0',  notes: 'Monitoring northern fields' },
  ],
};

// ─── COUNTRIES DATA ───────────────────────────────────────────────────────────
GW.countries = [
  {
    id: 'iran',
    name: 'Iran',
    nameFa: 'ایران',
    role: 'Conflict Principal',
    roleFa: 'طرف اصلی درگیری',
    stance: 'belligerent',
    flag: '🇮🇷',
    keyFacts: [
      'Population: 87 million',
      'Pre-conflict GDP: $610B',
      'Oil exports: ~1.5 Mbpd (Day 0)',
      'Uranium enrichment: 84% (pre-strike)',
    ],
    currentStatus: 'Under sustained coalition air campaign. Hardened nuclear facilities partially degraded. Economy in freefall: rial at historic low, food inflation +180%.',
  },
  {
    id: 'usa',
    name: 'United States',
    nameFa: 'ایالات متحده',
    role: 'Coalition Lead',
    roleFa: 'رهبر ائتلاف',
    stance: 'coalition',
    flag: '🇺🇸',
    keyFacts: [
      'CENTCOM assets deployed: 2 carrier strike groups',
      'B-2 Spirit bombers: Deployed Diego Garcia',
      'SPR release: 20M bbl authorized',
      'Congressional AUMF: Passed 54-46',
    ],
    currentStatus: 'Leading air campaign. No ground force deployment. Domestic fuel prices +38%. Approval rating for operation: 51% (Gallup March 22).',
  },
  {
    id: 'israel',
    name: 'Israel',
    nameFa: 'اسرائیل',
    role: 'Coalition Partner',
    roleFa: 'شریک ائتلاف',
    stance: 'coalition',
    flag: '🇮🇱',
    keyFacts: [
      'IAF strike sorties: 340+ (cumulative)',
      'Iron Dome/Arrow-3 active',
      'Hezbollah: Low-intensity exchanges only (so far)',
    ],
    currentStatus: 'Active strike partner. Iron Dome managing intermittent missile/drone salvos from IRGC-backed proxies. Northern border tense but not a full second front.',
  },
  {
    id: 'russia',
    name: 'Russia',
    nameFa: 'روسیه',
    role: 'Counter-Coalition',
    roleFa: 'ضد ائتلاف',
    stance: 'opposed',
    flag: '🇷🇺',
    keyFacts: [
      'UNSC veto: Used March 21',
      'Arms supply: Denied but intelligence suggests ongoing',
      'Energy: Routing oil via non-dollar channels',
    ],
    currentStatus: 'Diplomatically opposing US-led action. Providing economic lifeline to Iran via yuan settlement. No direct military involvement confirmed.',
  },
  {
    id: 'china',
    name: 'China',
    nameFa: 'چین',
    role: 'Counter-Coalition / Observer',
    roleFa: 'ضد ائتلاف / ناظر',
    stance: 'opposed',
    flag: '🇨🇳',
    keyFacts: [
      'Iranian oil imports: 1.2 Mbpd (pre-conflict)',
      'UNSC veto: Used March 21',
      'BRI rerouting: $4.2B package announced',
    ],
    currentStatus: 'Joint counter-sanctions with Russia. Scrambling to diversify energy supply. Economic coercion threats against US via Treasury holdings.',
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    nameFa: 'عربستان سعودی',
    role: 'Supportive Neutral',
    roleFa: 'بی‌طرف حامی',
    stance: 'neutral-positive',
    flag: '🇸🇦',
    keyFacts: [
      'Pumping +0.8 Mbpd above quota',
      'East-West Pipeline at 100% capacity',
      'No formal coalition membership',
    ],
    currentStatus: 'Publicly neutral, privately supportive. Boosting oil output. Emergency supply deal with US under negotiation.',
  },
  {
    id: 'turkey',
    name: 'Turkey',
    nameFa: 'ترکیه',
    role: 'Neutral / Mediator',
    roleFa: 'بی‌طرف / میانجی',
    stance: 'neutral',
    flag: '🇹🇷',
    keyFacts: [
      'NATO member, non-participating',
      'Refugees: 340,000+ at eastern border',
      'Diplomatic back-channel: Active',
    ],
    currentStatus: 'Handling refugee overflow. Attempting mediation role. Turkish straits operating normally. Erdogan has spoken with both Biden successor and Iranian FM.',
  },
  {
    id: 'iraq',
    name: 'Iraq',
    nameFa: 'عراق',
    role: 'Affected Neighbor',
    roleFa: 'همسایه متأثر',
    stance: 'neutral-negative',
    flag: '🇮🇶',
    keyFacts: [
      'Pro-Iran PMF factions: On alert',
      'KRG: Opening refugee centers',
      'Oil exports: Stable (northern fields unaffected)',
    ],
    currentStatus: 'Government paralyzed between pro-Iran and pro-US factions. PMF militias mobilizing but no direct engagement. Kurdish north managing refugee influx.',
  },
];

// ─── HUMANITARIAN DATA ────────────────────────────────────────────────────────
GW.humanitarian = {
  idpEstimate: 2300000,
  refugeeEstimate: 380000,
  accessLevel: 'severely-limited',
  casualties: {
    civilian: { confirmed: 1240, source: 'UNAMI estimate', confidence: 'single' },
    military: { confirmed: 890,  source: 'CENTCOM confirmed', confidence: 'confirmed' },
  },
  aidOrgs: [
    { name: 'UNHCR',   status: 'active',   focus: 'Displacement tracking, Turkey/Iraq borders' },
    { name: 'ICRC',    status: 'limited',  focus: 'Denied access to strike zones' },
    { name: 'MSF',     status: 'active',   focus: '7 field hospitals, Iraq border' },
    { name: 'WFP',     status: 'planning', focus: 'Emergency food pipeline; airspace barrier' },
    { name: 'WHO',     status: 'active',   focus: 'WASH, disease outbreak prevention' },
  ],
  infrastructureDamage: [
    { type: 'Water treatment',  cities: 6,  severity: 'major' },
    { type: 'Power grid',       cities: 11, severity: 'partial' },
    { type: 'Hospitals',        count: 14,  severity: 'damaged' },
    { type: 'Roads/bridges',    count: 23,  severity: 'destroyed-partial' },
  ],
};

// ─── US IMPACT DATA ───────────────────────────────────────────────────────────
GW.usImpact = {
  economic: [
    { metric: 'Regular Gas (national avg)', value: '$5.47/gal', change: '+38%', since: 'Feb 27' },
    { metric: 'Jet Fuel',                   value: '$6.12/gal', change: '+52%', since: 'Feb 27' },
    { metric: 'Home Heating Oil',           value: '$4.89/gal', change: '+44%', since: 'Feb 27' },
    { metric: 'Freight Cost Index',         value: '+22%',      change: '+22%', since: 'Feb 27' },
    { metric: 'CPI (Feb, pre-conflict)',    value: '3.1%',      change: 'April estimate: 4.8%', since: '' },
  ],
  military: [
    { item: 'Carrier Strike Groups deployed', value: '2 (USS Nimitz, USS Eisenhower)' },
    { item: 'B-2 sorties (cumulative)',        value: '47+' },
    { item: 'Tomahawk launches (cumulative)',  value: '380+' },
    { item: 'Daily operational cost est.',     value: '$850M+' },
    { item: 'AUMF status',                     value: 'Passed Senate 54-46, March 3' },
  ],
  political: [
    { item: 'Presidential approval (operation)', value: '51%',  source: 'Gallup March 22' },
    { item: 'Congressional opposition voices',   value: '89 House members signed letter', source: 'March 20' },
    { item: 'SPR release authorized',            value: '20M bbl', source: 'DOE March 15' },
    { item: 'Emergency energy bill',             value: 'In committee', source: 'Senate Energy, March 22' },
  ],
};

// ─── ANALYSIS PIECES ─────────────────────────────────────────────────────────
GW.analysis = {
  keyQuestions: [
    {
      q: 'Can coalition strikes actually destroy Iran\'s hardened nuclear facilities?',
      qFa: 'آیا حملات ائتلاف واقعاً می‌تواند تأسیسات هسته‌ای زیرزمینی ایران را نابود کند؟',
      shortAnswer: 'Partially. Fordow (80m underground) is at the edge of GBU-57 MOP penetration capability.',
      confidence: 'multi',
    },
    {
      q: 'What is the probability Iran actually closes Hormuz?',
      qFa: 'احتمال اینکه ایران واقعاً هرمز را ببندد چقدر است؟',
      shortAnswer: 'Estimated 28% if conflict continues 30+ more days. Lower if regime survival is prioritized over deterrence.',
      confidence: 'inferred',
    },
    {
      q: 'How long can Iran\'s economy sustain conflict?',
      qFa: 'اقتصاد ایران چقدر می‌تواند درگیری را تحمل کند؟',
      shortAnswer: 'FX reserves estimated $12–18B; 60–90 day runway before acute payment crisis absent Chinese support.',
      confidence: 'inferred',
    },
    {
      q: 'Will China move beyond economic support to direct intervention?',
      qFa: 'آیا چین فراتر از حمایت اقتصادی به مداخله مستقیم خواهد رفت؟',
      shortAnswer: 'Highly unlikely militarily. Economic coercion toolkit (Treasuries, tech export bans) remains the primary lever.',
      confidence: 'multi',
    },
  ],
};

// Export for use by other modules
window.GW = GW;

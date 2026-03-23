import { Article, MarketDataPoint, ThreatCard } from './types'

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'iran-strikes-escalation-timeline',
    title: 'Iran Strikes: Full Escalation Timeline and Strategic Assessment',
    excerpt:
      'A comprehensive analysis of the military escalation in the Persian Gulf region, examining the sequence of events and their geopolitical implications.',
    body: `## The Escalation Begins

The latest round of military escalation in the Persian Gulf has reshaped the strategic calculus for every major power in the region. What began as a targeted response has evolved into a multi-front confrontation with far-reaching consequences.

## Key Developments

The military operations have unfolded across several theaters simultaneously. Naval assets in the Strait of Hormuz have been placed on high alert, while air defense systems across the Gulf states have been activated to their highest readiness levels.

### Strategic Implications

The implications extend far beyond the immediate theater of operations. Energy markets have responded with sharp volatility, and diplomatic channels are operating at unprecedented intensity.

> "The situation represents the most significant strategic shift in the region since 2003." — Senior NATO analyst

## What Comes Next

Three scenarios dominate the strategic assessment:

1. **Controlled de-escalation** through back-channel negotiations
2. **Sustained low-intensity conflict** with periodic flare-ups
3. **Full regional escalation** drawing in multiple state actors

The coming 72 hours will be decisive in determining which path materializes.`,
    category: 'iran-war',
    tags: ['breaking', 'analysis'],
    author: 'GeoWire Intel Desk',
    language_code: 'en',
    original_article_id: null,
    read_time_minutes: 8,
    threat_level: 'critical',
    region: 'middle-east',
    published_at: '2026-03-23T06:00:00Z',
    updated_at: '2026-03-23T08:30:00Z',
    is_hero: true,
    is_published: true,
  },
  {
    id: '2',
    slug: 'oil-markets-surge-supply-disruption',
    title: 'Brent Crude Surges Past $115 as Strait of Hormuz Tensions Mount',
    excerpt:
      'Global oil prices have spiked to multi-year highs as shipping disruptions through the Strait of Hormuz threaten 21% of global petroleum supply.',
    body: `## Market Shock

Brent crude futures surged past $115 per barrel in early Asian trading, marking the highest level since 2022. The spike comes as naval confrontations near the Strait of Hormuz have forced several major tanker operators to reroute vessels.

## Supply Chain Impact

The Strait of Hormuz remains the world's most critical oil chokepoint, with approximately 21 million barrels per day flowing through the narrow waterway. Any sustained disruption would have cascading effects across global energy markets.

### Key Market Movements

West Texas Intermediate (WTI) crude followed Brent higher, trading above $108. Natural gas futures also climbed as LNG shipments face potential delays.

## Analyst Perspectives

Energy analysts are divided on whether current prices reflect genuine supply risk or speculative premium. Goldman Sachs has raised its 90-day Brent forecast to $130, while JPMorgan maintains a more conservative $120 target.`,
    category: 'energy',
    tags: ['breaking', 'markets'],
    author: 'GeoWire Markets',
    language_code: 'en',
    original_article_id: null,
    read_time_minutes: 5,
    threat_level: 'elevated',
    region: 'middle-east',
    published_at: '2026-03-23T04:30:00Z',
    updated_at: '2026-03-23T07:00:00Z',
    is_hero: false,
    is_published: true,
  },
  {
    id: '3',
    slug: 'us-china-taiwan-strait-naval-buildup',
    title: 'US Deploys Third Carrier Group to Western Pacific Amid Taiwan Tensions',
    excerpt:
      'The Pentagon has ordered the USS Ronald Reagan strike group to join two other carrier groups already operating in the Western Pacific.',
    body: `## Force Posture Shift

The United States has significantly expanded its naval presence in the Western Pacific with the deployment of a third carrier strike group. The USS Ronald Reagan and its escort vessels departed Yokosuka Naval Base amid rising tensions across the Taiwan Strait.

## Context

The deployment follows weeks of increased Chinese military activity near Taiwan, including record numbers of air defense identification zone incursions and naval exercises simulating blockade scenarios.

### PLA Response

Beijing has characterized the US naval buildup as "provocative" and announced its own series of military exercises in the South China Sea. The PLA Navy has deployed at least two carrier groups of its own in what analysts describe as a "mirror imaging" strategy.

## Diplomatic Channels

Despite the military posturing, back-channel communications between Washington and Beijing remain active. Both sides appear committed to avoiding direct confrontation while maintaining maximum strategic pressure.`,
    category: 'us-china',
    tags: ['intel', 'analysis'],
    author: 'GeoWire Asia Desk',
    language_code: 'en',
    original_article_id: null,
    read_time_minutes: 6,
    threat_level: 'elevated',
    region: 'asia-pacific',
    published_at: '2026-03-22T18:00:00Z',
    updated_at: '2026-03-22T22:00:00Z',
    is_hero: false,
    is_published: true,
  },
  {
    id: '4',
    slug: 'russia-ukraine-frontline-spring-offensive',
    title: 'Ukraine Launches Spring Counteroffensive Along Zaporizhzhia Axis',
    excerpt:
      'Ukrainian forces have initiated a major push along the southern front, targeting Russian defensive lines in Zaporizhzhia Oblast.',
    body: `## Operational Update

Ukrainian Armed Forces have launched what military analysts are calling the most significant offensive operation since the fall of 2025. Multiple brigade-sized elements are engaged along a 60-kilometer front in Zaporizhzhia Oblast.

## Tactical Assessment

The offensive appears focused on penetrating Russian defensive positions that have been static for months. Ukrainian forces are employing combined arms tactics with significant artillery preparation and electronic warfare support.

### International Support

The offensive comes weeks after the delivery of new Western military equipment packages, including advanced counter-battery radar systems and additional armored vehicles.

## Russian Response

Russian forces have activated reserve units and are conducting intensive aerial bombardment of Ukrainian staging areas. Moscow has characterized the offensive as a "desperate gamble" that will be defeated.`,
    category: 'russia-ukraine',
    tags: ['breaking', 'intel'],
    author: 'GeoWire Europe Desk',
    language_code: 'en',
    original_article_id: null,
    read_time_minutes: 7,
    threat_level: 'critical',
    region: 'europe',
    published_at: '2026-03-22T14:00:00Z',
    updated_at: '2026-03-23T02:00:00Z',
    is_hero: false,
    is_published: true,
  },
  {
    id: '5',
    slug: 'eu-sanctions-package-iran-energy',
    title: 'EU Announces 14th Sanctions Package Targeting Iranian Energy Sector',
    excerpt:
      'The European Union has unveiled sweeping new sanctions targeting Iran\'s oil exports, petrochemical industry, and affiliated shipping networks.',
    body: `## New Sanctions Framework

The European Union has adopted its most comprehensive sanctions package against Iran to date, targeting the country's primary revenue sources. The 14th sanctions package includes full blocking sanctions on Iranian state oil companies and their international subsidiaries.

## Key Provisions

The package freezes assets of 47 entities and 83 individuals connected to Iran's energy sector and military procurement networks. It also introduces secondary sanctions affecting non-EU companies that facilitate Iranian oil trade.

### Market Impact

European energy companies with exposure to Iranian trade routes face compliance deadlines of 90 days. The sanctions are expected to remove approximately 500,000 barrels per day from global supply.

## Global Response

China and India, the largest remaining importers of Iranian crude, have not indicated plans to reduce purchases. This sets up a potential confrontation over secondary sanctions enforcement.`,
    category: 'sanctions',
    tags: ['analysis', 'energy'],
    author: 'GeoWire Policy Desk',
    language_code: 'en',
    original_article_id: null,
    read_time_minutes: 6,
    threat_level: 'moderate',
    region: 'europe',
    published_at: '2026-03-21T10:00:00Z',
    updated_at: '2026-03-21T16:00:00Z',
    is_hero: false,
    is_published: true,
  },
  {
    id: '6',
    slug: 'african-sahel-security-vacuum-analysis',
    title: 'Sahel Security Vacuum: Wagner Retreat Creates New Instability Corridor',
    excerpt:
      'The withdrawal of Russian Wagner Group forces from Mali and Burkina Faso has created a security vacuum being exploited by jihadist organizations.',
    body: `## Strategic Shift in the Sahel

The partial withdrawal of Russian Wagner Group (now rebranded as Africa Corps) forces from the Sahel region has fundamentally altered the security landscape across West Africa. The power vacuum left behind is being rapidly exploited by JNIM and IS-Sahel affiliates.

## On the Ground

Local security forces, previously reliant on Wagner support for counterinsurgency operations, are struggling to maintain territorial control. Multiple towns in northern Mali have fallen to armed groups in the past month.

### Regional Implications

Neighboring countries including Côte d'Ivoire, Ghana, and Togo are reinforcing their northern borders in anticipation of spillover violence. ECOWAS has called an emergency session to address the deteriorating situation.

## International Response

France, which withdrew its forces in 2023, has ruled out a return. The United States maintains a small special operations presence in Niger but its future remains uncertain amid ongoing diplomatic negotiations.`,
    category: 'africa',
    tags: ['deep-dive', 'intel'],
    author: 'GeoWire Africa Desk',
    language_code: 'en',
    original_article_id: null,
    read_time_minutes: 9,
    threat_level: 'elevated',
    region: 'africa',
    published_at: '2026-03-20T12:00:00Z',
    updated_at: '2026-03-21T08:00:00Z',
    is_hero: false,
    is_published: true,
  },
]

export const MOCK_MARKET_DATA: MarketDataPoint[] = [
  {
    id: '1',
    indicator: 'BRENT',
    label: 'Brent Crude',
    current_value: 115.42,
    pre_war_value: 82.5,
    change_pct: 39.9,
    unit: '$/bbl',
    source: 'ICE',
    updated_at: '2026-03-23T08:00:00Z',
  },
  {
    id: '2',
    indicator: 'GOLD',
    label: 'Gold',
    current_value: 3245.8,
    pre_war_value: 2650.0,
    change_pct: 22.48,
    unit: '$/oz',
    source: 'LBMA',
    updated_at: '2026-03-23T08:00:00Z',
  },
  {
    id: '3',
    indicator: 'DXY',
    label: 'US Dollar Index',
    current_value: 106.85,
    pre_war_value: 103.2,
    change_pct: 3.54,
    unit: '',
    source: 'FRED',
    updated_at: '2026-03-23T08:00:00Z',
  },
  {
    id: '4',
    indicator: 'US10Y',
    label: '10Y Treasury',
    current_value: 4.82,
    pre_war_value: 4.25,
    change_pct: 13.41,
    unit: '%',
    source: 'FRED',
    updated_at: '2026-03-23T08:00:00Z',
  },
  {
    id: '5',
    indicator: 'BTC',
    label: 'Bitcoin',
    current_value: 72450,
    pre_war_value: 67200,
    change_pct: 7.81,
    unit: '$',
    source: 'CoinGecko',
    updated_at: '2026-03-23T08:00:00Z',
  },
  {
    id: '6',
    indicator: 'NATGAS',
    label: 'Natural Gas',
    current_value: 4.65,
    pre_war_value: 2.8,
    change_pct: 66.07,
    unit: '$/MMBtu',
    source: 'FRED',
    updated_at: '2026-03-23T08:00:00Z',
  },
  {
    id: '7',
    indicator: 'WHEAT',
    label: 'Wheat',
    current_value: 8.92,
    pre_war_value: 6.5,
    change_pct: 37.23,
    unit: '$/bu',
    source: 'FRED',
    updated_at: '2026-03-23T08:00:00Z',
  },
  {
    id: '8',
    indicator: 'EUR/USD',
    label: 'EUR/USD',
    current_value: 1.0542,
    pre_war_value: 1.0875,
    change_pct: -3.06,
    unit: '',
    source: 'ECB',
    updated_at: '2026-03-23T08:00:00Z',
  },
]

export const MOCK_THREATS: ThreatCard[] = [
  {
    region: 'middle-east',
    regionLabel: 'Middle East',
    title: 'Iran-Israel military escalation; Strait of Hormuz disruption risk',
    level: 'critical',
    dayCount: 14,
    timeAgo: '2h ago',
  },
  {
    region: 'europe',
    regionLabel: 'Europe',
    title: 'Ukraine spring offensive; NATO readiness elevated',
    level: 'critical',
    dayCount: 387,
    timeAgo: '4h ago',
  },
  {
    region: 'asia-pacific',
    regionLabel: 'Asia-Pacific',
    title: 'Taiwan Strait tensions; US carrier group deployment',
    level: 'elevated',
    dayCount: 45,
    timeAgo: '6h ago',
  },
  {
    region: 'africa',
    regionLabel: 'Africa',
    title: 'Sahel security vacuum; jihadist expansion',
    level: 'elevated',
    timeAgo: '8h ago',
  },
  {
    region: 'americas',
    regionLabel: 'Americas',
    title: 'Venezuela border tensions; Colombia peace process stalled',
    level: 'moderate',
    timeAgo: '12h ago',
  },
  {
    region: 'global',
    regionLabel: 'Global',
    title: 'Energy supply disruption; food price inflation risk',
    level: 'elevated',
    timeAgo: '1h ago',
  },
]
export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readTime: number;
  threatLevel?: 'critical' | 'elevated' | 'moderate' | 'stable';
  region?: string;
  isHero?: boolean;
  publishedAt: string;
  body: string;
  keyTakeaways: string[];
}

export const SEED_ARTICLES: Article[] = [
  {
    slug: 'war-nobody-planned-for-us-iran-conflict',
    title: 'The War Nobody Planned For: Mapping the Competing Logics Driving the US-Iran Conflict',
    excerpt: 'A comprehensive analysis of how strategic miscalculation, political incentives, and institutional inertia combined to produce the most significant military confrontation in the Middle East since 2003.',
    category: 'iran-war',
    tags: ['breaking', 'analysis', 'critical'],
    author: 'GeoWire Analysis Desk',
    readTime: 18,
    threatLevel: 'critical',
    region: 'Middle East',
    isHero: true,
    publishedAt: '2026-03-24T06:00:00Z',
    keyTakeaways: [
      'Operation Epic Fury began as a limited strike but escalated into a sustained campaign within 72 hours',
      'The closure of the Strait of Hormuz represents the largest oil supply disruption in history, removing 20M bbl/day from global markets',
      'Both Washington and Tehran appear locked into escalation spirals driven by domestic political constraints',
      'The economic impact has already exceeded $40B in direct costs, with indirect global GDP losses estimated at $200B+',
      'Three potential off-ramps exist, but each requires concessions neither side has signaled willingness to make',
    ],
    body: `The morning of February 28, 2026 began like any other at Central Command headquarters in Tampa, Florida. By noon, the United States was at war with Iran.

Operation Epic Fury — a name that would later be criticized as inappropriately bellicose by the State Department's own communications team — was authorized at 0347 EST as a "limited, proportional response" to Iran's seizure of the MV Atlantic Resolve, a Marshall Islands-flagged tanker carrying 2 million barrels of crude through the Strait of Hormuz.

Within 48 hours, "limited" had become meaningless.

## The Escalation Logic

What makes this conflict historically unusual is not the military operations themselves — the U.S. maintains overwhelming conventional superiority — but the speed at which both sides abandoned their own red lines.

Iran's initial provocation, the tanker seizure, was itself a response to the Treasury Department's designation of 47 IRGC-linked financial entities on February 15. That designation was a response to Iranian-backed Houthi attacks on commercial shipping. The Houthi attacks were a response to...

The chain of causation extends backward indefinitely, but the critical inflection point was February 28.

## Day 25: Where We Stand

As of this writing, Operation Epic Fury has entered its 25th day. The operational picture:

**Military**: Over 8,000 targets struck across Iran, primarily military infrastructure, air defense systems, and IRGC command nodes. The U.S. has maintained air superiority throughout, though three aircraft have been lost to Iranian surface-to-air missiles. Iranian retaliatory missile strikes on Al Udeid Air Base in Qatar caused 13 American casualties — the deadliest single attack on U.S. forces in the Middle East since the Beirut barracks bombing of 1983.

**Naval**: The Strait of Hormuz remains effectively closed. Iran deployed sea mines, coastal anti-ship missiles, and fast attack craft in the first 72 hours. Despite U.S. Navy minesweeping operations, commercial insurers have classified the strait as a war risk zone, and no major tanker operator is willing to transit.

**Economic**: Brent crude surpassed $100/barrel within a week and has stabilized around $112. U.S. gasoline prices have risen 30% nationally, with California stations reporting prices above $6/gallon. The S&P 500 has declined 9.7% from pre-war levels.

**Leadership**: Iranian Supreme Leader Ali Khamenei was killed in a targeted strike on March 1 — a decision that remains highly classified but which fundamentally altered the conflict's trajectory. His son Mojtaba has not been seen publicly since, and the question of Iranian leadership succession has become the war's central strategic uncertainty.

## The Three Off-Ramps

Intelligence assessments suggest three plausible scenarios for conflict termination:

**Scenario 1: Negotiated Ceasefire (35% probability)**
Requires a credible Iranian interlocutor and U.S. willingness to accept something short of regime change. The Oman channel remains open but has not produced results.

**Scenario 2: De Facto Stalemate (45% probability)**
The most likely near-term outcome. U.S. achieves air superiority and degrades Iranian military capacity, but cannot reopen Hormuz without ground operations that have not been authorized. Both sides settle into a sustained, low-intensity conflict.

**Scenario 3: Escalation (20% probability)**
Houthi, Hezbollah, or other Iranian proxy entry into the conflict. Could include attacks on U.S. bases across the region or strikes on Israeli territory that trigger a multi-front war.

None of these scenarios are good. The question is which is least bad.`,
  },
  {
    slug: 'mojtaba-khamenei-invisible-supreme-leader',
    title: 'The Mojtaba Mystery: CIA Searches for Iran\'s Invisible Leader',
    excerpt: 'Intelligence agencies across three continents are asking the same question: Where is Mojtaba Khamenei? The answer may determine whether this war ends in weeks or years.',
    category: 'iran-war',
    tags: ['intel', 'exclusive'],
    author: 'GeoWire Analysis Desk',
    readTime: 12,
    threatLevel: 'critical',
    region: 'Middle East',
    publishedAt: '2026-03-23T14:00:00Z',
    keyTakeaways: [
      'Mojtaba Khamenei has not been seen publicly since his father\'s death on March 1',
      'Intelligence agencies are divided on whether he is alive, in hiding, or has fled the country',
      'His status is critical because he is the de facto head of the Khamenei financial network controlling an estimated $95B in assets',
      'Without clear succession, IRGC factions may splinter, complicating both the war effort and any potential negotiations',
    ],
    body: `In the sprawling compound beneath the Jamaran neighborhood of northern Tehran, the most consequential power vacuum of the 21st century is playing out in silence.

Mojtaba Khamenei — son of the late Supreme Leader, architect of Iran's digital surveillance apparatus, and the man most intelligence agencies believed would succeed his father — has vanished.

Not killed. Not confirmed alive. Simply... absent.

## What We Know

The last verified sighting of Mojtaba Khamenei was February 27, 2026 — one day before Operation Epic Fury began. He was photographed at a private meeting with senior IRGC commanders at a facility in Parchin, roughly 30 kilometers southeast of Tehran. The image, obtained by GeoWire from a regional intelligence service, shows a visibly tense meeting.

Since March 1, when a U.S. strike killed Supreme Leader Ali Khamenei, his son has not appeared on any verified imagery — satellite, SIGINT, or human intelligence.

This matters enormously.

## The Succession Crisis

Iran's constitution provides for succession through the Assembly of Experts, an 88-member body of senior clerics. But the Assembly was designed for natural transitions, not wartime assassinations. Several of its members are dead, others are in hiding, and the body has not convened.

In the constitutional vacuum, three power centers are competing:

**The IRGC hardliners**, led by commanders who want to escalate the conflict and frame it as a holy war requiring maximum resistance.

**The pragmatists**, centered around acting President Ghalibaf, who recognize the military reality and are seeking channels for negotiation.

**The Khamenei network**, the vast financial and political apparatus built by the Supreme Leader over four decades, which Mojtaba nominally controls — if he's alive to control it.

The estimated value of the Khamenei network: $95 billion, spread across foundations, military-industrial conglomerates, and real estate holdings. Control of this network is, in many ways, control of Iran itself.

## Three Theories

Western intelligence agencies are working three primary hypotheses:

**Theory 1: Deep Bunker**. Mojtaba retreated to one of several hardened facilities built for exactly this scenario. He is alive but maintaining radio silence to avoid targeting. This is the CIA's working assumption.

**Theory 2: Fled the Country**. He departed Iran via the Afghan or Pakistani border in the first days of the conflict. Some reporting suggests a private aircraft departed Mehrabad Airport on March 2 with an unidentified VIP passenger. Destination unknown — possibly Oman or Qatar.

**Theory 3: Internal Coup**. IRGC hardliners, who never accepted the dynastic succession model, have sidelined or detained Mojtaba to prevent him from negotiating a surrender. This theory has the least evidence but the most alarming implications.

The truth likely won't emerge until the conflict reaches some form of resolution. In the meantime, the absence of clear leadership in Tehran is simultaneously making the war harder to fight and harder to end.`,
  },
  {
    slug: 'hormuz-closure-largest-oil-disruption',
    title: 'Hormuz Day 25: The Largest Oil Supply Disruption in History',
    excerpt: 'The Strait of Hormuz closure has removed 20 million barrels per day from global markets. The economic aftershocks are only beginning.',
    category: 'energy',
    tags: ['energy', 'critical'],
    author: 'GeoWire Analysis Desk',
    readTime: 10,
    threatLevel: 'critical',
    region: 'Middle East',
    publishedAt: '2026-03-22T10:00:00Z',
    keyTakeaways: [
      'The Hormuz closure represents ~20% of global oil supply removed from markets overnight',
      'Strategic Petroleum Reserve releases from the US, China, Japan, and Europe have partially offset the shortfall',
      'Insurance rates for Persian Gulf shipping have risen 4,000%, effectively creating a secondary blockade even beyond the physical closure',
      'The IEA has called this the largest supply disruption in the history of the oil market',
    ],
    body: `The numbers are staggering, even by the standards of a region that has seen no shortage of crises.

Twenty million barrels of oil per day. That is the volume of crude that normally transits the Strait of Hormuz — a 21-mile-wide chokepoint between Iran and Oman that handles roughly one-fifth of global petroleum consumption.

As of Day 25, that flow has dropped to effectively zero.

## The Physical Blockade

Iran's strategy for closing Hormuz was not sophisticated, but it didn't need to be. In the first 72 hours of the conflict, the IRGC Navy deployed an estimated 2,000 naval mines across the strait's shipping lanes. These included a mix of modern Chinese-designed EM-52 rocket-propelled mines and older contact mines dating back to the Iran-Iraq war era.

Simultaneously, mobile coastal defense batteries armed with C-802 anti-ship missiles were activated along Iran's southern coastline, creating overlapping kill zones across the strait.

The U.S. Navy has the capability to clear these mines and suppress the coastal batteries. But minesweeping is slow, dangerous work. As of this writing, Navy EOD teams have cleared approximately 340 mines from a channel along the Omani side of the strait, but the channel is not yet considered safe for commercial traffic.

## The Insurance Blockade

Even if the physical channel were cleared tomorrow, there is a second blockade that may prove harder to break: insurance.

Lloyd's of London and the major war risk insurers have classified the entire Persian Gulf as a "Listed Area" — essentially a war zone. Insurance premiums for vessels transiting the region have risen by approximately 4,000%. For a standard VLCC (Very Large Crude Carrier), this translates to an additional $5-8 million per voyage in insurance costs alone.

No major tanker operator is willing to accept this risk. The result is that even Saudi Arabia's eastern terminals — which are not directly affected by the Hormuz closure — have seen a dramatic decline in loadings, as tankers refuse to enter the Gulf.

## The Global Response

The International Energy Agency convened an emergency meeting on March 5 and authorized the largest coordinated Strategic Petroleum Reserve release in history. The numbers:

- United States: 180 million barrels over 180 days (1M bbl/day)
- China: 100 million barrels (first-ever significant SPR release)
- Japan: 60 million barrels
- South Korea: 40 million barrels
- European IEA members: combined 120 million barrels

Total: approximately 500 million barrels, or roughly 2.8 million barrels per day.

This is unprecedented, but it replaces only 14% of the lost Hormuz flow. The math does not add up, and markets know it.

## What Comes Next

The longer Hormuz remains closed, the more the global economy restructures around the disruption. Alternative supply routes — the East-West Pipeline across Saudi Arabia (capacity: 5M bbl/day), the UAE's Habshan-Fujairah pipeline (1.5M bbl/day) — are running at maximum capacity.

But these pipelines were designed as emergency alternatives, not primary arteries. They cannot replace Hormuz indefinitely.

The clock is ticking. Every day the strait remains closed costs the global economy an estimated $3.2 billion in lost economic activity. At some point, that cost becomes unbearable — but for whom, and what they do about it, remains the critical question.`,
  },
  {
    slug: 'witkoff-kushner-saudi-connection-iran-war',
    title: 'Witkoff, Kushner, and the $2B Saudi Connection',
    excerpt: 'As the Iran war intensifies, the financial relationships between Trump-era dealmakers and Gulf monarchies raise uncomfortable questions about who benefits from conflict.',
    category: 'iran-war',
    tags: ['deep-dive', 'exclusive'],
    author: 'GeoWire Analysis Desk',
    readTime: 15,
    threatLevel: 'elevated',
    region: 'Middle East',
    publishedAt: '2026-03-21T08:00:00Z',
    keyTakeaways: [
      'Key figures in the Trump foreign policy circle maintain significant financial ties to Gulf states',
      'Saudi Arabia\'s sovereign wealth fund has invested billions in ventures connected to senior U.S. officials',
      'These relationships create potential conflicts of interest in war decision-making',
      'Gulf states are simultaneously the largest beneficiaries of elevated oil prices and key U.S. security partners',
    ],
    body: `The intersection of personal finance and foreign policy has rarely been more consequential — or more opaque — than in the current conflict.

This investigation examines the financial relationships between senior members of the current U.S. administration and the Gulf states that stand to benefit most from the Iran war and the resulting oil price surge.

## The Financial Web

The numbers are a matter of public record, even if their implications are not widely discussed.

In 2021, Saudi Arabia's Public Investment Fund committed $2 billion to Affinity Partners, an investment firm founded by Jared Kushner shortly after leaving his role as Senior Advisor to President Trump. The investment was made over the objections of the fund's own screening panel, which flagged concerns about the firm's limited track record.

Steve Witkoff, currently serving as Special Envoy to the Middle East, maintained significant real estate and financial interests in the Gulf region prior to his appointment. His firm, Witkoff Group, has been involved in multiple developments in the UAE and has received financing from Gulf-connected entities.

These financial relationships do not, in themselves, prove improper influence. But they create the conditions for conflicts of interest at a moment when the financial stakes of policy decisions have never been higher.

## Who Benefits

Since the start of Operation Epic Fury, Saudi Arabia's oil revenues have increased by approximately $2.1 billion per month, driven by the Brent crude price surge from $68 to $112 per barrel. The UAE has seen similar windfalls.

These are the same states whose sovereign wealth funds, royal families, and connected business interests maintain deep financial relationships with key figures in the U.S. policy apparatus.

The question is not whether these relationships influenced the decision to go to war — there is no evidence that they did. The question is whether they influence decisions about how the war is conducted, how long it continues, and what terms of settlement might be acceptable.

## The Transparency Gap

What makes analysis difficult is the extraordinary opacity of these financial arrangements. Gulf sovereign wealth funds are not subject to U.S. disclosure requirements. Private investment vehicles like Affinity Partners have limited reporting obligations. And the revolving door between government service and private finance operates with minimal oversight.

GeoWire has filed FOIA requests with the State Department and Treasury Department seeking communications between officials with Gulf financial ties and their Gulf counterparts regarding the current conflict. We will publish results as they become available.

In the meantime, the American public is left to trust that the people making life-and-death decisions about a war that costs $1.75 billion per day are doing so purely on the merits — despite maintaining financial relationships worth billions with parties that benefit directly from the conflict's continuation.

That is, at minimum, a question worth asking.`,
  },
  {
    slug: 'taco-trade-trump-iran-war-markets',
    title: 'The TACO Trade Meets a Shooting War',
    excerpt: 'How Wall Street\'s "Trump Always Capitulates Online" thesis collided with actual military conflict — and why the correction has further to go.',
    category: 'markets',
    tags: ['markets', 'analysis'],
    author: 'GeoWire Analysis Desk',
    readTime: 8,
    region: 'Global',
    publishedAt: '2026-03-20T12:00:00Z',
    keyTakeaways: [
      'The "TACO Trade" — betting that Trump would always back down from confrontation — was the dominant Wall Street thesis pre-war',
      'Markets were caught badly offside when the conflict escalated beyond initial strikes',
      'The S&P 500 has lost 9.7% and the correction may deepen as economic impacts compound',
      'Energy sector is the clear winner; tech, consumer discretionary, and transportation are the biggest losers',
    ],
    body: `For the better part of two years, Wall Street had a thesis. It was elegant, profitable, and — as it turns out — wrong.

The thesis had a name: TACO. Trump Always Capitulates Online.

## The TACO Framework

The logic was simple and, for a while, empirically supported. President Trump would make aggressive statements — about tariffs, about North Korea, about Iran — and markets would dip. Then, inevitably, he would find an off-ramp: a "beautiful deal," a "tremendous agreement," a tweet declaring victory. Markets would recover. Traders who bought the dip made money.

The TACO trade became so widespread that it was essentially consensus. Goldman Sachs published research noting that "geopolitical risk premiums associated with presidential rhetoric have a half-life of approximately 72 hours." JPMorgan's derivatives desk was selling volatility on every presidential tweet.

## The Collision

On February 28, the TACO trade met its first real test: an actual shooting war.

In the first week, many traders held firm. "This is just another bluff," was the prevailing view on trading desks. The S&P dropped 4% and then stabilized as the market waited for the inevitable climb-down.

The climb-down didn't come.

By Day 7, with Hormuz closed and oil above $95, the TACO trade began to unwind violently. The VIX spiked to 26 — elevated but not panic. The real carnage was in sector rotation: airlines down 25%, cruise lines down 30%, while defense stocks and energy names surged.

## The Current Picture

As of Day 25:

- S&P 500: down 9.7% from pre-war levels
- Nasdaq: down 12.3% (tech hardest hit by rising energy costs)
- Dow: up 5.0% (energy/defense weighting helps)
- VIX: 26.15 (sustained elevated volatility)
- Dollar Index: 99.27 (surprisingly weak — flight from U.S. assets)

The most telling indicator may be the yield curve. The 10-year Treasury has collapsed to 0.43% — a level last seen during the COVID panic of 2020. Markets are pricing in severe economic disruption, if not outright recession.

## What Comes Next

The TACO traders who survived are now asking a different question: not "when will Trump back down?" but "how bad can this get?"

The answer depends on Hormuz. If the strait reopens within 30 days, the economic damage is likely contained to a sharp but temporary growth shock. If it remains closed into summer, the compounding effects — inflation, consumer spending collapse, supply chain disruption — could trigger a recession.

Wall Street's new acronym has not yet emerged. But whatever replaces TACO will need to account for a possibility that the previous framework explicitly excluded: that sometimes, the brinkmanship is real.`,
  },
  {
    slug: 'china-iran-hormuz-crisis-profit',
    title: 'Beijing\'s Iran Calculus: How China Profits While the World Burns',
    excerpt: 'China has positioned itself as the quiet winner of the Iran crisis — buying discounted oil, selling to both sides, and watching its primary competitor bleed resources.',
    category: 'us-china',
    tags: ['analysis', 'us-china'],
    author: 'GeoWire Analysis Desk',
    readTime: 9,
    threatLevel: 'moderate',
    region: 'Asia-Pacific',
    publishedAt: '2026-03-19T16:00:00Z',
    keyTakeaways: [
      'China has dramatically increased purchases of discounted Iranian and Russian crude since the conflict began',
      'Beijing is maintaining strategic ambiguity — condemning the war publicly while benefiting from it privately',
      'Chinese firms are filling commercial gaps left by Western companies retreating from the Gulf region',
      'The conflict accelerates China\'s long-term goal of reducing U.S. influence in the Middle East',
    ],
    body: `In Beijing's Zhongnanhai leadership compound, the mood is one of careful, strategic patience.

China did not start the Iran war. China does not want the Iran war to escalate to the point of global economic catastrophe. But China is, by virtually every measure, winning the Iran war.

## The Oil Discount

Since the closure of Hormuz, global oil prices have surged to $112/barrel. But China is not paying global prices.

Through a network of ship-to-ship transfers, dark fleet tankers, and yuan-denominated payment channels, China has continued to import Iranian crude at an estimated discount of 30-40% to benchmark prices. This means China is paying roughly $65-75/barrel while everyone else pays $112.

The volume has increased dramatically. Pre-war, China imported approximately 1.5 million barrels per day of Iranian crude. Current estimates suggest this has risen to 2.5 million barrels per day, with tankers taking longer routes around the Cape of Good Hope to avoid the conflict zone.

Russia, facing its own Western sanctions and eager for Chinese support, is offering similar discounts. China's total discounted oil imports are estimated at 5 million barrels per day — a cost advantage of roughly $200 million per day compared to European and Asian competitors.

## Strategic Ambiguity

China's diplomatic position is a masterwork of strategic ambiguity.

Publicly, Beijing has called for "restraint from all parties" and offered to mediate. Foreign Minister Wang Yi has spoken with both Iranian and American counterparts. China supported a UN Security Council resolution calling for a ceasefire — which the U.S. vetoed.

Privately, Chinese state-owned firms are moving aggressively to fill commercial vacuums. As Western insurers withdraw from the Gulf, Chinese state insurers are stepping in. As Western shipping companies reroute, Chinese-flagged vessels are taking their place.

This is not neutral behavior. It is strategic positioning disguised as neutrality.

## The Long Game

For China's leadership, the Iran crisis represents a strategic opportunity that extends far beyond oil discounts.

Every day the U.S. military is focused on Iran is a day it is not focused on Taiwan. Every billion dollars spent on Tomahawk missiles is a billion not spent on Pacific force posture. Every diplomatic relationship strained by the conflict — with Turkey, with Qatar, with India — is a relationship China can potentially leverage.

The war is also accelerating Middle Eastern countries' interest in diversifying their security relationships away from exclusive reliance on the United States. Saudi Arabia, the UAE, and even Israel have been notably measured in their public support for U.S. operations — each maintaining back-channel communications with Beijing.

## The Risks

China's strategy is not without risks. If the conflict escalates dramatically — a scenario involving nuclear facilities, for instance — the global economic disruption would harm China's export-dependent economy. Chinese leadership is also aware that being seen as profiting from war could damage its carefully cultivated image as a responsible global power.

But for now, the calculus is clear. The United States is spending $1.75 billion per day, burning through diplomatic capital, and creating a power vacuum that China is quietly filling.

In the zero-sum logic of great power competition, America's Iran quagmire is China's strategic windfall.`,
  },
];

  {
    slug: 'russia-ukraine-war-iran-conflict-link',
    title: 'Two Wars, One Strategy: How Moscow Is Exploiting the Iran Crisis',
    excerpt: 'The Ukraine front has shifted dramatically since Operation Epic Fury began. Russia is advancing on three axes while Western attention — and ammunition — flows toward the Persian Gulf.',
    category: 'russia-ukraine',
    tags: ['russia-ukraine', 'analysis', 'geopolitics'],
    author: 'GeoWire Analysis Desk',
    readTime: 11,
    threatLevel: 'elevated',
    region: 'Europe',
    publishedAt: '2026-03-18T09:00:00Z',
    keyTakeaways: [
      'Russian forces have advanced 40km along the Kharkiv axis since Operation Epic Fury began, the fastest territorial gains since early 2022',
      'US military assistance to Ukraine has slowed as logistics and political attention pivot toward the Middle East',
      'Iran has resumed Shahed drone deliveries to Russia via Caspian sea routes despite being at war with the US',
      'NATO allies face a critical choice: maintain Ukraine commitments or prioritize the Iran theater',
      'Kyiv is warning that without restocked air defense, major cities could fall by summer',
    ],
    body: `In Moscow, the calculus was cold and precise: America cannot fight two wars simultaneously.

When Operation Epic Fury began on February 28, 2026, Russian President Vladimir Putin's immediate response was not a statement, not a diplomatic communiqué. It was an order to his general staff: begin the Kharkiv offensive.

## The Opportunist's War

Russia has not officially commented on the US-Iran conflict beyond calling for "dialogue and restraint" — the same empty phrases deployed by every major power hoping to benefit from the chaos without being blamed for it. But its actions speak clearly.

In the 25 days since the war began, Russian forces have advanced approximately 40 kilometers along the Kharkiv axis — the fastest territorial gain Russia has achieved since the opening months of the 2022 invasion. Three Ukrainian brigades have been encircled near Vovchansk. The Zaporizhzhia line, largely static for 18 months, is now moving.

## The Supply Chain Crisis

The mechanism is straightforward: American attention is finite, and American defense production is stretched.

Before February 28, the United States had committed to delivering 155mm artillery shells to Ukraine at a rate of 100,000 per month — itself a reduction from earlier commitments due to domestic political constraints. Since the Iran war began, that number has declined to approximately 60,000 per month.

The difference is not because the US stopped caring about Ukraine. It is because CENTCOM has priority. The munitions that would have gone to Kyiv are being diverted to B-2 bombers, Tomahawk cruise missiles, and naval operations in the Persian Gulf.

"We are being slowly starved," one senior Ukrainian official told GeoWire, speaking on condition of anonymity. "Not because they want us to lose. Because they cannot do everything at once."

## The Iran-Russia Connection

There is a layer of dark irony in this situation that has received insufficient attention in Western coverage.

Iran is simultaneously at war with the United States and continuing to supply Russia with weapons.

Despite the conflict, Iranian Shahed drone shipments to Russia have not stopped. Intelligence assessments suggest that Iran made a deliberate decision to separate its conflict with America — which is fundamentally about regime survival — from its partnership with Russia, which provides revenue, technology, and diplomatic support.

The Caspian route, which does not pass through any US-controlled territory or interdiction range, remains open. Approximately 200-300 Shahed drones per month continue to arrive in Russia, where they are deployed against Ukrainian cities and infrastructure.

The United States has raised this issue privately with Iran through the Oman channel. Iran's position: the two matters are not linked.

## NATO's Impossible Choice

For Europe, this presents a crisis of strategic prioritization that the alliance was not designed to handle.

NATO's eastern flank states — Poland, the Baltic countries, Romania — are the most alarmed. They have increased their own bilateral assistance to Ukraine and are calling for a formal NATO declaration that Ukraine's defense remains a top-tier priority regardless of the Middle East situation.

Germany, France, and the southern European allies are more divided. Their focus has shifted toward energy security — the Hormuz closure has sent natural gas prices in Europe back toward 2022 levels — and they are less willing to commit additional resources to Ukraine at a moment of domestic economic stress.

## What Comes Next

Ukrainian commanders are blunt in private assessments: if the current trajectory continues for another 60 days, the military situation on the eastern front will be qualitatively worse than at any point since the 2022 Kharkiv crisis.

The question is whether the United States and NATO can maintain two simultaneous commitments — or whether, as Russia calculates, global war exhaustion will eventually force a compromise that benefits Moscow on both fronts.`,
  },
  {
    slug: 'iran-sanctions-global-dollar-system',
    title: 'The Sanctions Weapon: How Iran Exposed the Limits of Dollar Dominance',
    excerpt: 'Three decades of Iran sanctions built the architecture of financial warfare. Operation Epic Fury is revealing what that architecture cannot do.',
    category: 'sanctions',
    tags: ['sanctions', 'analysis', 'iran-war'],
    author: 'GeoWire Analysis Desk',
    readTime: 13,
    threatLevel: 'moderate',
    region: 'Global',
    publishedAt: '2026-03-17T11:00:00Z',
    keyTakeaways: [
      'Iran has survived 45 years of progressively tighter sanctions by building parallel financial infrastructure',
      'The SWIFT exclusion that was considered crippling in 2012 is now partially circumvented through Chinese and Russian alternatives',
      'Iran\'s oil exports to China have not stopped despite the war — dollar avoidance mechanisms built over decades are functioning',
      'The war is accelerating de-dollarization trends that could permanently reduce US financial leverage globally',
      'Treasury\'s OFAC has designated 847 entities in the first 25 days of conflict — a record pace',
    ],
    body: `The United States has been sanctioning Iran since 1979. Forty-seven years of financial warfare, progressive escalation, and creative enforcement have produced an Iran that is economically stressed, diplomatically isolated, and increasingly capable of functioning without the dollar.

That last part is the part that matters.

## The Architecture of Sanctions

The modern sanctions toolkit that the US deploys against Iran was built incrementally over decades. Its most powerful element is SWIFT exclusion: disconnecting Iranian banks from the Society for Worldwide Interbank Financial Telecommunication, the messaging system that handles virtually all international financial transactions.

When Iran was excluded from SWIFT in 2012, the impact was immediate and severe. Oil revenues collapsed by 60% within months. The Iranian rial lost two-thirds of its value. The Rouhani government came to power on a promise of sanctions relief and negotiated what became the 2015 JCPOA.

That was the high-water mark of sanctions effectiveness.

## What Has Changed

In the decade since, Iran has systematically built workarounds. Not bypasses — no system is seamless — but alternative channels that reduce the leverage of SWIFT exclusion from devastating to manageable.

**Chinese alternatives**: China has expanded its Cross-Border Interbank Payment System (CIPS) to handle yuan-denominated transactions that bypass SWIFT entirely. Iran-China oil trade now flows through a parallel financial architecture that US regulators can slow but not stop.

**Barter and counter-trade**: Iran has negotiated arrangements with Russia, China, and a dozen smaller trading partners to exchange oil directly for goods — pharmaceuticals, machinery, food, electronics — without any dollar transaction touching the international banking system.

**Cryptocurrency**: Iranian entities use a mix of Bitcoin and privacy-focused cryptocurrencies to move value internationally, despite Treasury's aggressive efforts to identify and sanction crypto wallets associated with Iranian entities.

**Front companies**: The OFAC designation list has grown to over 2,400 Iranian-linked entities. This sounds impressive until you realize that for every entity designated, several more are created to replace it.

## The Record Designation Pace

Since Operation Epic Fury began, the Office of Foreign Assets Control has designated 847 entities in 25 days — a pace roughly five times the historical average. The designations include IRGC-linked financial institutions, shipping companies, oil intermediaries, and individuals across 23 countries.

This is significant. But the question is not whether the US can designate — it clearly can, at any pace it chooses. The question is whether designations produce behavioral change.

## The De-Dollarization Accelerant

The war is accelerating a structural trend that predates it: the gradual erosion of dollar dominance in global trade.

Every time the United States uses the dollar's centrality as a weapon — whether against Iran, Russia, Venezuela, or any other adversary — it gives every other country in the world additional incentive to build alternatives. China, India, the Gulf states, Brazil, and a coalition of smaller economies have been investing in those alternatives for years.

The Iran war is a case study in the limits of this approach. Iran has survived sanctions that would have been economically fatal to a less adapted economy. And its adaptations — the parallel financial infrastructure it built in response to decades of pressure — are now available as a template for any country that fears future US financial coercion.

The sanctions weapon remains powerful. But it is less powerful than it was in 2012, and it will be less powerful still in 2030. The war is demonstrating that fact to every government in the world simultaneously.`,
  },
  {
    slug: 'global-recession-risk-iran-war-oil',
    title: 'How High Can Oil Go? The Recession Threshold Nobody Wants to Calculate',
    excerpt: 'Economists have a number they are reluctant to say out loud: if Brent stays above $120 for 90 days, the probability of a global recession exceeds 70%. We are on day 25.',
    category: 'markets',
    tags: ['markets', 'energy', 'analysis'],
    author: 'GeoWire Analysis Desk',
    readTime: 10,
    threatLevel: 'elevated',
    region: 'Global',
    publishedAt: '2026-03-16T14:00:00Z',
    keyTakeaways: [
      'Brent crude at $112/bbl represents a 65% increase from pre-war levels — historically associated with recessions when sustained',
      'The IMF has quietly revised its global growth forecast down by 1.8 percentage points since the conflict began',
      'Emerging markets with dollar-denominated debt face a particularly acute crisis as oil prices and the dollar index move together',
      'Consumer spending in the US has already declined 2.3% in the first two weeks of March',
      'The historical record shows: every sustained oil price shock of >50% has been followed by recession within 18 months',
    ],
    body: `There is a number that central bankers, finance ministers, and IMF economists reference in private conversations but rarely say on the record.

The number is $120.

More precisely, the threshold is Brent crude sustained above $120 per barrel for more than 90 days. Based on historical data going back to the 1973 oil embargo, every time this threshold has been breached for a sustained period, a global recession has followed within 12 to 18 months. The correlation is not perfect. The causation is not clean. But the pattern is consistent enough that institutional forecasters treat it as a de facto trigger.

As of this writing, Brent is at $112. We are on day 25 of the conflict that produced it.

## The Historical Record

The oil shocks that preceded recessions tell a consistent story:

**1973-74**: The Arab oil embargo triggered a 400% price increase and a global recession that lasted through 1975.

**1979-80**: The Iranian Revolution and Iran-Iraq War combined to produce a second major shock. Global recession followed in 1981-82.

**1990-91**: Iraq's invasion of Kuwait caused oil to double. The US entered recession in July 1990, before the Gulf War even began — the anticipation was enough.

**2007-08**: Oil reached $147/bbl in July 2008, contributing to the financial crisis conditions that triggered the Great Recession.

**2022**: Russia's invasion of Ukraine caused a spike to $130/bbl. Europe entered recession. The US narrowly avoided it due to its position as a major oil producer.

The current situation is different in important ways — the US energy independence achieved since 2010 provides a partial buffer. But the mechanism of transmission remains the same: high energy prices function as a tax on consumption, reduce corporate margins, and create inflationary pressure that central banks cannot easily address.

## The Transmission Mechanisms

How does $112 oil become a recession? The channels are multiple and mutually reinforcing.

**Consumer spending**: US gasoline prices have risen 30% since the conflict began. The average American household spends approximately $2,200 per year on gasoline at normal prices; this is running 30% higher. That is roughly $660 per household diverted from other spending — a meaningful impact on consumer discretionary purchases.

**Supply chain costs**: Petroleum is embedded in virtually every manufactured good through transportation, petrochemicals, and packaging. A 65% increase in oil prices eventually shows up as margin compression or price increases across the economy.

**Emerging market stress**: Countries that import oil and borrow in dollars face a particularly acute squeeze. They are paying more for oil in dollars at the same time that dollar borrowing costs have risen. This combination has historically triggered EM debt crises, and the current IMF emergency lending queue is the longest since 2008.

**Inflation persistence**: The Federal Reserve had achieved something close to its 2% inflation target before February 28. Energy-driven inflation has now pushed the CPI back toward 4.1%, and the Fed faces an impossible choice: raise rates into a slowing economy, or hold rates and let inflation run.

## What Forecasters Are Saying (In Private)

GeoWire has spoken with economists at three major multilateral institutions and four large investment banks. The consensus off-the-record view:

If the Hormuz Strait reopens within 30 days, the global growth impact is a 0.5-1.0 percentage point reduction, recoverable within 12-18 months. Painful but manageable.

If Hormuz remains closed for 60-90 days, the probability of at least one major economy entering technical recession exceeds 60%, with spillover risk to the global financial system significant.

If Hormuz remains closed beyond 90 days, outcomes become highly nonlinear. The modeling breaks down because there is no historical precedent for a sustained closure of a chokepoint this important.

The one thing everyone agrees on: every additional week the strait remains closed increases the probability of a severe economic outcome in a way that is not linear. The damage compounds.`,
  },
];

// Seed leaders data
export interface Leader {
  name: string;
  nameFa?: string;
  role: string;
  status: 'alive' | 'dead' | 'unknown' | 'hiding';
  statusDate: string;
  details: string;
}

export const SEED_LEADERS: Leader[] = [
  { name: 'Ali Khamenei', nameFa: 'علی خامنه‌ای', role: 'Supreme Leader', status: 'dead', statusDate: '2026-02-28', details: 'Killed in U.S. targeted strike, Day 1' },
  { name: 'Mojtaba Khamenei', nameFa: 'مجتبی خامنه‌ای', role: 'Expected Successor', status: 'unknown', statusDate: '2026-02-28', details: 'Not seen since father\'s death. Multiple theories.' },
  { name: 'Mohammad B. Ghalibaf', nameFa: 'محمدباقر قالیباف', role: 'Speaker / Acting Leader', status: 'alive', statusDate: '2026-03-24', details: 'Publicly visible, coordinating war effort' },
  { name: 'Ali Larijani', nameFa: 'علی لاریجانی', role: 'Senior Advisor', status: 'dead', statusDate: '2026-03-17', details: 'Killed in strike on government compound' },
  { name: 'Ahmad Vahidi', nameFa: 'احمد وحیدی', role: 'Interior Minister', status: 'hiding', statusDate: '2026-03-10', details: 'Last known location: underground facility near Isfahan' },
  { name: 'Masoud Pezeshkian', nameFa: 'مسعود پزشکیان', role: 'President', status: 'alive', statusDate: '2026-03-24', details: 'Relocated to secure facility, limited public appearances' },
  { name: 'Abbas Araghchi', nameFa: 'عباس عراقچی', role: 'Foreign Minister', status: 'alive', statusDate: '2026-03-24', details: 'Active diplomatic efforts through Oman channel' },
  { name: 'Esmaeil Khatib', nameFa: 'اسماعیل خطیب', role: 'Intelligence Minister', status: 'dead', statusDate: '2026-03-18', details: 'Killed alongside Larijani in compound strike' },
];

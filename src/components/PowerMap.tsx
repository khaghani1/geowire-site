'use client';

import { useState } from 'react';

/* ─── Types ───────────────────────────────────────────────── */
type Bloc = 'us-coalition' | 'axis' | 'neutral' | 'mediator';
type ActorType = 'state' | 'proxy' | 'org';
type Involvement = 'direct' | 'indirect' | 'logistical' | 'diplomatic' | 'hostile';

interface Actor {
  id: string;
  name: string;
  flag?: string;
  bloc: Bloc;
  type: ActorType;
  involvement: Involvement;
  role: string;
  capabilities: string[];
  keyFact: string;
  threatLevel?: 'critical' | 'high' | 'moderate' | 'low';
}

interface Resource {
  label: string;
  controller: string;
  status: 'controlled' | 'contested' | 'disrupted';
  value: string;
}

interface DiplomaticStatus {
  country: string;
  flag: string;
  position: string;
  stance: 'supporting-us' | 'supporting-iran' | 'neutral' | 'mediating' | 'opposing-all';
  detail: string;
}

/* ─── Data ────────────────────────────────────────────────── */
const ACTORS: Actor[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    bloc: 'us-coalition',
    type: 'state',
    involvement: 'direct',
    role: 'Coalition Lead / Air Campaign Commander',
    capabilities: ['F-35A/B/C, B-2, B-21 stealth strike', '3× carrier strike groups', 'Tomahawk TLAM stockpile', 'Space/cyber dominance'],
    keyFact: 'CENTCOM has conducted 340+ sorties since Day 1. 5th Fleet HQ (Bahrain) coordinates all naval ops.',
    threatLevel: 'critical',
  },
  {
    id: 'israel',
    name: 'Israel',
    flag: '🇮🇱',
    bloc: 'us-coalition',
    type: 'state',
    involvement: 'direct',
    role: 'Intel partner / IRGC target designation',
    capabilities: ['Mossad/SIGINT intelligence feed', 'F-35I Adir strikes', 'Iron Dome / David\'s Sling air defense', 'Cyber (Unit 8200)'],
    keyFact: 'Provides 40%+ of targeting intel via Unit 8200. Conducted independent strikes on Hezbollah infrastructure in Lebanon.',
    threatLevel: 'high',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    bloc: 'us-coalition',
    type: 'state',
    involvement: 'direct',
    role: 'Naval + air support',
    capabilities: ['HMS Prince of Wales carrier', 'Typhoon FGR4 strike sorties', 'Brimstone/Storm Shadow munitions'],
    keyFact: 'RAF Akrotiri (Cyprus) used as primary UK launch base. Parliament emergency session authorized engagement on Day 3.',
    threatLevel: 'high',
  },
  {
    id: 'saudi',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    bloc: 'us-coalition',
    type: 'state',
    involvement: 'logistical',
    role: 'Basing + airspace access',
    capabilities: ['Prince Sultan AB (Al-Kharj) access', 'Patriot PAC-3 air defense corridor', 'ARAMCO oil coordination'],
    keyFact: 'Quietly granted airspace access but declined to publicly join coalition. Riyadh privately coordinating on Hormuz re-routing.',
    threatLevel: 'moderate',
  },
  {
    id: 'uae',
    name: 'UAE',
    flag: '🇦🇪',
    bloc: 'us-coalition',
    type: 'state',
    involvement: 'logistical',
    role: 'Al Dhafra AB host / logistics hub',
    capabilities: ['Al Dhafra Air Base (largest USAF ME base)', 'Port of Jebel Ali logistics corridor', 'SIGINT sharing'],
    keyFact: 'Al Dhafra hosts F-35, F-22, E-3 Sentry, and tanker assets. UAE officially "neutral" publicly while operationally supporting.',
    threatLevel: 'moderate',
  },
  {
    id: 'iran',
    name: 'Islamic Republic of Iran',
    flag: '🇮🇷',
    bloc: 'axis',
    type: 'state',
    involvement: 'direct',
    role: 'Primary adversary',
    capabilities: ['Hormuz Strait denial (mines, ASMs)', 'Shahab/Emad ballistic missiles', 'IRGC Navy (swarm tactics)', 'Cyber (APT33, Charming Kitten)'],
    keyFact: 'IRGC Navy has mined 23% of Hormuz transit lanes. Fordow/Natanz enrichment facilities operational despite strikes on 3 other sites.',
    threatLevel: 'critical',
  },
  {
    id: 'irgc',
    name: 'IRGC (Quds Force)',
    flag: '🇮🇷',
    bloc: 'axis',
    type: 'proxy',
    involvement: 'direct',
    role: 'Axis command & control; proxy coordination',
    capabilities: ['Quds Force regional network ($2B/yr funding)', 'Drone/missile technology transfer', 'Hezbollah/PMF/Houthi command'],
    keyFact: 'IRGC Quds Force commander relocated to Lebanese Bekaa Valley on Day 4. Directing proxy escalation across 4 fronts.',
    threatLevel: 'critical',
  },
  {
    id: 'houthi',
    name: 'Houthis (Ansar Allah)',
    flag: '🇾🇪',
    bloc: 'axis',
    type: 'proxy',
    involvement: 'indirect',
    role: 'Red Sea / Bab-el-Mandeb disruption',
    capabilities: ['Anti-ship ballistic missiles (ASBM)', 'Shahed-style drones (Iranian-supplied)', 'Red Sea shipping interdiction'],
    keyFact: '14 commercial vessels struck in Red Sea since Day 1. Suez Canal traffic down 60% as rerouting via Cape of Good Hope spikes costs.',
    threatLevel: 'high',
  },
  {
    id: 'hezbollah',
    name: 'Hezbollah',
    flag: '🇱🇧',
    bloc: 'axis',
    type: 'proxy',
    involvement: 'indirect',
    role: 'Northern Israel front / Lebanon deterrence',
    capabilities: ['150,000+ rockets (Fajr-5, Zelzal)', 'Radwan Force ground infiltration units', 'Fateh-110 precision missiles'],
    keyFact: 'Exchanging daily fire with IDF on Lebanon border. Hassan Nasrallah has not ordered full escalation — holding back as leverage.',
    threatLevel: 'high',
  },
  {
    id: 'pmf',
    name: 'Popular Mobilization Forces (PMF)',
    flag: '🇮🇶',
    bloc: 'axis',
    type: 'proxy',
    involvement: 'indirect',
    role: 'Iraq pressure / US base harassment',
    capabilities: ['Drone strikes on US bases in Iraq', 'Kata\'ib Hezbollah special units', 'Ground infiltration logistics'],
    keyFact: '7 drone attacks on US assets at Ain al-Asad and Erbil since Day 1. 3 US personnel wounded. Baghdad government unable to restrain.',
    threatLevel: 'high',
  },
  {
    id: 'russia',
    name: 'Russia',
    flag: '🇷🇺',
    bloc: 'neutral',
    type: 'state',
    involvement: 'diplomatic',
    role: 'Opportunistic spoiler / Iran arms supplier',
    capabilities: ['UN Security Council veto (blocking resolutions)', 'S-300/S-400 air defense tech to Iran', 'Oil market coordination (OPEC+)'],
    keyFact: 'Vetoed 2 UNSC ceasefire resolutions. Quietly accelerating oil exports to fill Iranian supply gap — profiting $4B+ extra/month.',
    threatLevel: 'moderate',
  },
  {
    id: 'china',
    name: "People's Republic of China",
    flag: '🇨🇳',
    bloc: 'neutral',
    type: 'state',
    involvement: 'diplomatic',
    role: 'Economic beneficiary / diplomatic mediator',
    capabilities: ['Iran\'s largest oil buyer (pre-war)', 'UNSC veto power', 'Taiwan Strait opportunism window', 'Huawei dual-use tech in Iran'],
    keyFact: 'PRC offered to mediate on Day 12. Simultaneously conducting expanded military drills near Taiwan. Buying 40% of available Iranian oil at 30% discount.',
    threatLevel: 'moderate',
  },
  {
    id: 'un',
    name: 'United Nations',
    flag: '🌐',
    bloc: 'mediator',
    type: 'org',
    involvement: 'diplomatic',
    role: 'Ceasefire framework negotiations',
    capabilities: ['UNSC (deadlocked 3-2)', 'IAEA nuclear monitoring access', 'OCHA humanitarian corridors'],
    keyFact: 'UNSC ceasefire resolution vetoed by Russia (Day 4) and China (Day 19). IAEA access to Fordow suspended since Day 2.',
    threatLevel: 'low',
  },
  {
    id: 'qatar',
    name: 'Qatar',
    flag: '🇶🇦',
    bloc: 'mediator',
    type: 'state',
    involvement: 'diplomatic',
    role: 'Back-channel mediator / Al Udeid AB host',
    capabilities: ['Al Udeid AB (CENTCOM Forward HQ)', 'Hamas/Iran back-channel diplomacy', 'Al Jazeera media platform'],
    keyFact: 'Paradoxically hosts both CENTCOM Forward HQ and key Iranian diplomatic back-channel. Doha proposed 72-hour humanitarian pause on Day 18.',
    threatLevel: 'low',
  },
];

const RESOURCES: Resource[] = [
  { label: 'Strait of Hormuz', controller: 'Iran (partial blockade)', status: 'contested', value: '20M bbl/day normally' },
  { label: 'Bab-el-Mandeb Strait', controller: 'Houthis / US Navy contest', status: 'disrupted', value: '$1T/yr trade route' },
  { label: 'Gulf oil fields (Saudi/UAE)', controller: 'US-protected coalition', status: 'controlled', value: '12M bbl/day capacity' },
  { label: 'Iraq oil infrastructure', controller: 'Disputed / PMF threat', status: 'contested', value: '4.5M bbl/day capacity' },
  { label: 'Iranian nuclear sites', controller: 'Iran (4 of 7 operational)', status: 'contested', value: '60%+ enriched uranium program' },
  { label: 'US military bases (region)', controller: 'US + coalition', status: 'controlled', value: '40,000+ personnel, 6 major bases' },
];

const DIPLOMACY: DiplomaticStatus[] = [
  { country: 'France', flag: '🇫🇷', position: 'Cautious NATO ally', stance: 'supporting-us', detail: 'Voted yes on UNSC Res. 2804 (US-drafted). Paris calling for "humanitarian corridors" while supporting coalition.' },
  { country: 'Germany', flag: '🇩🇪', position: 'Non-combat support', stance: 'supporting-us', detail: 'Providing logistical / intel support. Bundestag passed emergency defense funding. No offensive operations.' },
  { country: 'Iraq', flag: '🇮🇶', position: 'Deeply conflicted', stance: 'neutral', detail: 'Government condemns strikes, tolerates US bases. PMF attacks US troops on Iraqi soil. Baghdad paralyzed.' },
  { country: 'Turkey', flag: '🇹🇷', position: 'Strategic neutral / NATO tension', stance: 'neutral', detail: 'Blocking some NATO ops invoking neutrality. Offering to mediate. Selling Bayraktar drones to both sides indirectly.' },
  { country: 'India', flag: '🇮🇳', position: 'Energy-anxious neutral', stance: 'neutral', detail: 'Abstained on UNSC votes. Urgently seeking emergency oil from Saudi Arabia. Modi spoke to both Biden and Khamenei.' },
  { country: 'Oman', flag: '🇴🇲', position: 'Key back-channel', stance: 'mediating', detail: 'Historic US-Iran intermediary. Muscat hosting quiet talks between IRGC envoy and US NSC representative.' },
];

/* ─── Sub-components ───────────────────────────────────────── */
const BLOC_CONFIG: Record<Bloc, { label: string; color: string; bg: string; border: string }> = {
  'us-coalition': { label: 'US-LED COALITION', color: 'text-blue-400', bg: 'bg-blue-950/40', border: 'border-blue-800/50' },
  'axis':          { label: 'AXIS OF RESISTANCE', color: 'text-red-400',  bg: 'bg-red-950/40',  border: 'border-red-800/50' },
  'neutral':       { label: 'NEUTRAL / OPPORTUNIST', color: 'text-yellow-400', bg: 'bg-yellow-950/20', border: 'border-yellow-800/40' },
  'mediator':      { label: 'MEDIATING PARTIES', color: 'text-green-400', bg: 'bg-green-950/20', border: 'border-green-800/40' },
};

const INVOLVEMENT_BADGE: Record<Involvement, { label: string; color: string }> = {
  direct:      { label: 'DIRECT', color: 'bg-red-900/60 text-red-300 border-red-700' },
  indirect:    { label: 'PROXY', color: 'bg-orange-900/60 text-orange-300 border-orange-700' },
  logistical:  { label: 'LOGISTICS', color: 'bg-blue-900/60 text-blue-300 border-blue-700' },
  diplomatic:  { label: 'DIPLOMATIC', color: 'bg-green-900/60 text-green-300 border-green-700' },
  hostile:     { label: 'HOSTILE', color: 'bg-red-900/60 text-red-300 border-red-700' },
};

const STANCE_CONFIG: Record<DiplomaticStatus['stance'], { label: string; dot: string }> = {
  'supporting-us':   { label: 'Coalition-aligned', dot: 'bg-blue-400' },
  'supporting-iran': { label: 'Iran-aligned',      dot: 'bg-red-400' },
  'neutral':         { label: 'Neutral',            dot: 'bg-yellow-400' },
  'mediating':       { label: 'Mediating',          dot: 'bg-green-400' },
  'opposing-all':    { label: 'Opposing all',       dot: 'bg-gray-400' },
};

function ActorCard({ actor }: { actor: Actor }) {
  const [expanded, setExpanded] = useState(false);
  const inv = INVOLVEMENT_BADGE[actor.involvement];

  return (
    <div
      className="bg-bg-1 border border-border-1 rounded-sm p-4 cursor-pointer hover:border-accent-red/40 transition-colors"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {actor.flag && <span className="text-xl flex-shrink-0">{actor.flag}</span>}
          <div className="min-w-0">
            <div className="font-mono text-xs text-tx-0 font-semibold truncate">{actor.name}</div>
            <div className="text-[10px] text-tx-3 font-mono mt-0.5">{actor.type.toUpperCase()}</div>
          </div>
        </div>
        <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border flex-shrink-0 ${inv.color}`}>{inv.label}</span>
      </div>
      <p className="text-[11px] text-tx-2 mb-3 leading-snug">{actor.role}</p>

      {expanded && (
        <div className="border-t border-border-1 pt-3 mt-1 space-y-3">
          <div>
            <div className="font-mono text-[9px] text-tx-3 uppercase tracking-widest mb-1">Capabilities</div>
            <ul className="space-y-1">
              {actor.capabilities.map((c, i) => (
                <li key={i} className="text-[11px] text-tx-2 flex gap-1.5">
                  <span className="text-accent-red mt-0.5 flex-shrink-0">›</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-bg-2 rounded-sm p-2.5">
            <div className="font-mono text-[9px] text-accent-gold uppercase tracking-widest mb-1">Key Intelligence</div>
            <p className="text-[11px] text-tx-1 leading-relaxed">{actor.keyFact}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end mt-2">
        <span className="text-[9px] font-mono text-tx-3">{expanded ? '▲ COLLAPSE' : '▼ EXPAND'}</span>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────── */
export default function PowerMap() {
  const [filter, setFilter] = useState<Bloc | 'all'>('all');

  const blocs = (['us-coalition', 'axis', 'neutral', 'mediator'] as Bloc[]);

  const visibleActors = filter === 'all' ? ACTORS : ACTORS.filter(a => a.bloc === filter);

  const grouped: Record<Bloc, Actor[]> = {
    'us-coalition': [],
    'axis': [],
    'neutral': [],
    'mediator': [],
  };
  visibleActors.forEach(a => grouped[a.bloc].push(a));

  return (
    <div className="space-y-8">

      {/* Header strip */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-bg-1 border border-border-1 rounded-sm">
        <span className="font-mono text-[10px] text-tx-3 tracking-widest mr-2">FILTER BLOC:</span>
        {(['all', ...blocs] as const).map(b => {
          const cfg = b === 'all' ? null : BLOC_CONFIG[b];
          const active = filter === b;
          return (
            <button
              key={b}
              onClick={() => setFilter(b)}
              className={`font-mono text-[10px] px-3 py-1 rounded-sm border transition-colors ${
                active
                  ? 'bg-accent-red text-white border-accent-red'
                  : 'border-border-1 text-tx-2 hover:border-accent-red/50'
              }`}
            >
              {b === 'all' ? 'ALL ACTORS' : cfg!.label}
            </button>
          );
        })}
        <span className="ml-auto font-mono text-[10px] text-tx-3">{visibleActors.length} ACTORS TRACKED</span>
      </div>

      {/* Actor grids by bloc */}
      {blocs.map(bloc => {
        const actors = grouped[bloc];
        if (actors.length === 0) return null;
        const cfg = BLOC_CONFIG[bloc];
        return (
          <section key={bloc}>
            <div className={`flex items-center gap-3 mb-4 p-3 rounded-sm ${cfg.bg} border ${cfg.border}`}>
              <span className={`font-mono text-xs font-bold tracking-widest ${cfg.color}`}>{cfg.label}</span>
              <span className={`font-mono text-[10px] ${cfg.color} opacity-70`}>{actors.length} PARTIES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {actors.map(a => <ActorCard key={a.id} actor={a} />)}
            </div>
          </section>
        );
      })}

      {/* Strategic Resources */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-accent-red text-sm">▲</span>
          <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase">Strategic Resources &amp; Chokepoints</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RESOURCES.map((r, i) => {
            const colors = {
              controlled: 'text-green-400 bg-green-950/30 border-green-800/40',
              contested:  'text-yellow-400 bg-yellow-950/20 border-yellow-800/40',
              disrupted:  'text-red-400 bg-red-950/30 border-red-800/40',
            };
            return (
              <div key={i} className={`p-4 rounded-sm border ${colors[r.status]}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-xs font-bold text-tx-0">{r.label}</div>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border uppercase ${colors[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                <div className="text-[11px] text-tx-2 mb-1">{r.controller}</div>
                <div className="text-[10px] font-mono text-tx-3">{r.value}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Diplomatic Positions */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-accent-red text-sm">▲</span>
          <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase">Key Diplomatic Positions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DIPLOMACY.map((d, i) => {
            const sc = STANCE_CONFIG[d.stance];
            return (
              <div key={i} className="bg-bg-1 border border-border-1 rounded-sm p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{d.flag}</span>
                  <div>
                    <div className="font-mono text-xs font-bold text-tx-0">{d.country}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                      <span className="font-mono text-[9px] text-tx-3 uppercase">{sc.label}</span>
                    </div>
                  </div>
                  <span className="ml-auto font-mono text-[10px] text-tx-2 italic">{d.position}</span>
                </div>
                <p className="text-[11px] text-tx-2 leading-relaxed">{d.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* UNSC Alignment */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-accent-red text-sm">▲</span>
          <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase">UN Security Council Alignment</h2>
        </div>
        <div className="bg-bg-1 border border-border-1 rounded-sm p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { country: '🇺🇸 USA', vote: 'P5 Sponsor', color: 'text-blue-400' },
              { country: '🇬🇧 UK', vote: 'YES', color: 'text-blue-400' },
              { country: '🇫🇷 France', vote: 'YES', color: 'text-blue-400' },
              { country: '🇷🇺 Russia', vote: 'VETO ✗', color: 'text-red-400' },
              { country: '🇨🇳 China', vote: 'VETO ✗', color: 'text-red-400' },
            ].map((m, i) => (
              <div key={i}>
                <div className="text-lg mb-1">{m.country.split(' ')[0]}</div>
                <div className="font-mono text-[10px] text-tx-2">{m.country.split(' ')[1]}</div>
                <div className={`font-mono text-xs font-bold mt-1 ${m.color}`}>{m.vote}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border-1">
            <p className="text-[11px] text-tx-2 font-mono">
              <span className="text-accent-red">STATUS:</span> Ceasefire Resolution 2804 (Day 4) — VETOED by Russia. Resolution 2811 (Day 19) — VETOED by China.
              Current: US pushing procedural Uniting for Peace resolution in General Assembly.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

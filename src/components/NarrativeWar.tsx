'use client';

import { useState } from 'react';

const NARRATIVES = [
  {
    source: 'US / Western Coalition',
    frame: 'Surgical counter-proliferation',
    bias: 'Washington / Tel Aviv',
    text: 'Operation Epic Fury is a precision campaign against IRGC military infrastructure — not a war on the Iranian people. The strikes eliminated an existential nuclear threat. Every target was a legitimate military objective. Iranian civilians are victims of the IRGC regime, not US policy.',
    audienceReach: 'Western democracies, ~2.1B media audience',
    confidence: 'confirmed',
    flag: '🇺🇸',
  },
  {
    source: 'Islamic Republic of Iran',
    frame: 'American imperialism and resistance',
    bias: 'Tehran',
    text: "The United States launched an unprovoked war of aggression against a sovereign nation. The Islamic Republic is defending its people, its sovereignty, and the Muslim world. Every shahid (martyr) strengthens the resistance. Victory is inevitable.",
    audienceReach: 'Iran domestic, Persian diaspora, Shia communities',
    confidence: 'confirmed',
    flag: '🇮🇷',
  },
  {
    source: 'Russian State Media (RT, Sputnik)',
    frame: 'US hegemony collapsing',
    bias: 'Moscow',
    text: "America's unilateral aggression exposes the bankruptcy of the \"rules-based international order\" — a US construct designed to legitimize its own empire. Russia and China stand with international law. The world is watching the end of American dominance.",
    audienceReach: 'Russia, Eastern Europe, MENA, ~600M reach',
    confidence: 'multisource',
    flag: '🇷🇺',
  },
  {
    source: 'Chinese State Media (CGTN, Xinhua)',
    frame: 'Strategic stability under threat',
    bias: 'Beijing',
    text: 'US military action destabilizes the global energy market and threatens peaceful development worldwide. China calls for an immediate ceasefire and negotiated solution. The international community must reject hegemonism.',
    audienceReach: 'China, Southeast Asia, Africa, ~1.4B reach',
    confidence: 'confirmed',
    flag: '🇨🇳',
  },
  {
    source: 'Arab Street / Al-Jazeera',
    frame: 'Muslim solidarity vs aggression',
    bias: 'Pan-Arab / Qatar',
    text: "Regardless of the IRGC's record in Arab countries, US bombs falling on a Muslim-majority nation awakens deep solidarity. The same power that bombed Iraq, Libya, and Syria is now bombing Iran. Who is next?",
    audienceReach: 'Arab world, ~400M reach',
    confidence: 'multisource',
    flag: '🌙',
  },
  {
    source: 'Global South / Non-Aligned',
    frame: 'Rules-based order hypocrisy exposed',
    bias: 'Non-aligned bloc',
    text: '137 nations at the UN voted for ceasefire. The US blocked it. One set of rules for powerful nations, another for everyone else. If this is allowed, no nation\'s sovereignty is safe. The international order must be reformed.',
    audienceReach: 'Africa, Latin America, South/Southeast Asia',
    confidence: 'confirmed',
    flag: '🌍',
  },
];

const INFO_OPS = [
  {
    actor: '🇺🇸 CENTCOM',
    op: 'Precision narrative management',
    desc: 'Daily BDA (Battle Damage Assessment) releases emphasizing military targets, low civilian casualties. Press embeds limited. No independent verification possible.',
    badge: 'confirmed',
  },
  {
    actor: '🇮🇷 Iran',
    op: 'Internet blackout',
    desc: "Iran's communications blackout (99% internet down) also blocks out independent civilian reporting — intentional or not, it prevents verification of casualty claims.",
    badge: 'confirmed',
  },
  {
    actor: '🇷🇺 Russia',
    op: 'Amplification of civilian casualties',
    desc: 'RT and affiliated outlets running 24h casualty footage. Some verified, some origin unclear. Goal: pressure US allies.',
    badge: 'multisource',
  },
  {
    actor: 'Unknown',
    op: 'Deepfake Ghalibaf speech',
    desc: 'GeoWire flagged a widely-shared "Ghalibaf ceasefire speech" on March 21 as likely AI-generated. Iran state media denied origin.',
    badge: 'singlesource',
  },
  {
    actor: '🇮🇱 Israel',
    op: 'IRGC leadership targeting PR',
    desc: 'Israeli intelligence releasing names and photos of eliminated IRGC commanders faster than US CENTCOM — calibrated to deter reconstitution.',
    badge: 'multisource',
  },
];

const DISINFO = [
  {
    claim: '"US dropped depleted uranium bombs on Tehran"',
    verdict: 'FALSE',
    evidence: 'No verified evidence. Originated from Iranian state TV, amplified by RT. CENTCOM denied. DU not used in B-2 payload types deployed.',
    badge: 'confirmed',
  },
  {
    claim: '"Ghalibaf signed ceasefire document"',
    verdict: 'FALSE',
    evidence: 'Viral video on March 21 was AI-generated. GeoWire verified via Hive Moderation analysis. No ceasefire signed.',
    badge: 'singlesource',
  },
  {
    claim: '"US carrier struck by Iranian missile"',
    verdict: 'UNVERIFIED',
    evidence: 'Claim circulated March 12 across Persian Telegram. CENTCOM denied. No satellite confirmation. Rated unverified.',
    badge: 'singlesource',
  },
  {
    claim: '"Iranian civilian death toll is 50,000+"',
    verdict: 'DISPUTED',
    evidence: 'Claim from Iranian exile groups. HRANA estimates 3,220. GeoWire model inference 11,700 including military. 50,000+ unsubstantiated.',
    badge: 'disputed',
  },
  {
    claim: '"Qatar secretly funding IRGC weapons resupply"',
    verdict: 'UNVERIFIED',
    evidence: 'Claim from single Israeli source on March 18. Qatar denied. Inconsistent with Qatar hosting US Al Udeid base. Unverified.',
    badge: 'singlesource',
  },
];

const MEDIA_COVERAGE = [
  { region: 'United States', dominant: 'CENTCOM briefings, defense correspondent embed', tone: 'Pro-coalition', access: 'Limited independent' },
  { region: 'Western Europe', dominant: 'Independent outlets + wire services', tone: 'Critical of both, pro-ceasefire', access: 'Good' },
  { region: 'Russia', dominant: 'RT, Sputnik, Tass — state-controlled', tone: 'Pro-Iran / anti-US', access: 'Filtered' },
  { region: 'China', dominant: 'CGTN, Xinhua, Global Times', tone: 'Anti-US, ceasefire-forward', access: 'Filtered' },
  { region: 'Middle East', dominant: 'Al-Jazeera, Al-Arabiya (mixed)', tone: 'Split — civilian focus', access: 'Limited in Iran' },
  { region: 'Iran (domestic)', dominant: 'State TV (IRIB) — only functional media', tone: 'Regime narrative + resistance', access: 'Internet blackout — 1%' },
  { region: 'Global South', dominant: 'Wire services + diaspora social media', tone: 'Anti-US sovereignty frame', access: 'Variable' },
];

const CONFIDENCE_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: '🟢 Confirmed', color: 'text-green-400', bg: 'bg-green-900/20 border-green-700/40' },
  multisource: { label: '🟡 Multi-source', color: 'text-yellow-400', bg: 'bg-yellow-900/20 border-yellow-700/40' },
  singlesource: { label: '🟠 Single-source', color: 'text-orange-400', bg: 'bg-orange-900/20 border-orange-700/40' },
  disputed: { label: '⚠️ Disputed', color: 'text-red-400', bg: 'bg-red-900/20 border-red-700/40' },
};

const VERDICT_STYLES: Record<string, string> = {
  FALSE: 'text-red-400 bg-red-900/30 border-red-700/50',
  UNVERIFIED: 'text-orange-400 bg-orange-900/30 border-orange-700/50',
  DISPUTED: 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50',
  TRUE: 'text-green-400 bg-green-900/30 border-green-700/50',
};

function ConfidenceBadge({ level }: { level: string }) {
  const s = CONFIDENCE_STYLES[level] || CONFIDENCE_STYLES.singlesource;
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${s.color} ${s.bg}`}>
      {s.label}
    </span>
  );
}

export default function NarrativeWar() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-12">

      {/* Disclaimer */}
      <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-lg px-4 py-3 text-xs text-yellow-200 font-mono">
        ⚠️ GeoWire tracks framing, not truth-value. Presenting a narrative does not endorse it. All narratives labeled by perceived source and bias.
      </div>

      {/* 6 Competing Narratives */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-accent-red text-sm">▲</span>
              <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">Information Environment</span>
            </div>
            <h2 className="font-display text-2xl text-tx-0">6 Competing Narratives</h2>
          </div>
          <span className="text-[10px] font-mono text-tx-3">{NARRATIVES.length} FRAMES TRACKED</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {NARRATIVES.map((n) => (
            <div
              key={n.source}
              className="bg-bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:border-accent-blue/40 transition-colors cursor-pointer"
              onClick={() => setExpanded(expanded === n.source ? null : n.source)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{n.flag}</span>
                  <div>
                    <div className="text-xs font-mono text-tx-2 tracking-wide">{n.source}</div>
                    <div className="text-[10px] text-tx-3 font-mono">BIAS: {n.bias}</div>
                  </div>
                </div>
                <ConfidenceBadge level={n.confidence} />
              </div>
              <div className="text-sm font-semibold text-accent-gold italic">"{n.frame}"</div>
              <p className={`text-xs text-tx-2 leading-relaxed ${expanded === n.source ? '' : 'line-clamp-3'}`}>
                {n.text}
              </p>
              {expanded === n.source && n.audienceReach && (
                <div className="text-[10px] font-mono text-tx-3 border-t border-border pt-2">
                  📡 Audience reach: <span className="text-tx-2">{n.audienceReach}</span>
                </div>
              )}
              <button className="text-[10px] font-mono text-accent-blue hover:underline text-left">
                {expanded === n.source ? '▲ less' : '▼ read more'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Information Operations */}
      <section>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-accent-red text-sm">▲</span>
            <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">Active Operations</span>
          </div>
          <h2 className="font-display text-2xl text-tx-0">Information Operations</h2>
          <p className="text-xs text-tx-3 mt-1">Tracked active influence and information operations by actor.</p>
        </div>
        <div className="space-y-3">
          {INFO_OPS.map((io) => (
            <div key={io.op} className="bg-bg-card border border-border rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-mono text-sm text-tx-0 font-semibold">{io.actor}</span>
                <span className="text-xs text-accent-gold font-medium">— {io.op}</span>
                <ConfidenceBadge level={io.badge} />
              </div>
              <p className="text-xs text-tx-2 leading-relaxed">{io.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disinformation Tracker */}
      <section>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-accent-red text-sm">▲</span>
            <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">Fact Check</span>
          </div>
          <h2 className="font-display text-2xl text-tx-0">Disinformation Tracker</h2>
          <p className="text-xs text-tx-3 mt-1">GeoWire flags and rates viral claims circulating in the information environment.</p>
        </div>
        <div className="space-y-3">
          {DISINFO.map((d) => (
            <div key={d.claim} className="bg-bg-card border border-border rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div className="text-sm font-medium text-tx-0 flex-1">{d.claim}</div>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono font-bold shrink-0 ${VERDICT_STYLES[d.verdict] || VERDICT_STYLES.UNVERIFIED}`}>
                  {d.verdict}
                </span>
              </div>
              <p className="text-xs text-tx-2 leading-relaxed mb-2">{d.evidence}</p>
              <ConfidenceBadge level={d.badge} />
            </div>
          ))}
        </div>
      </section>

      {/* Media Coverage by Region */}
      <section>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-accent-red text-sm">▲</span>
            <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">Coverage Map</span>
          </div>
          <h2 className="font-display text-2xl text-tx-0">Media Coverage by Region</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MEDIA_COVERAGE.map((m) => (
            <div key={m.region} className="bg-bg-card border border-border rounded-lg p-4 space-y-2">
              <div className="font-mono text-xs tracking-wider text-tx-0 font-semibold">{m.region}</div>
              <p className="text-xs text-tx-2">{m.dominant}</p>
              <div className="text-[10px] font-mono text-tx-3">
                Tone: <span className="text-tx-2">{m.tone}</span>
              </div>
              <div className="text-[10px] font-mono text-tx-3">
                Access: <span className={m.access.includes('blackout') || m.access === 'Filtered' ? 'text-accent-red' : 'text-tx-2'}>{m.access}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

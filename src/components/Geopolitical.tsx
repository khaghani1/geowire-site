'use client';
import MetricCard from './MetricCard';
import { CURRENT_METRICS } from '@/lib/constants';

export default function Geopolitical() {
  const m = CURRENT_METRICS;

  // Great power actors with enhanced data
  const actors = [
    {
      name: 'United States',
      flag: '🇺🇸',
      color: 'border-accent-blue',
      bgColor: 'bg-accent-blue/5',
      wants: 'Regime change in Iran; low oil prices; midterm election positioning',
      fears: 'Escalation to ground war; domestic gas price backlash; Chinese direct intervention',
      leverage: 'Military dominance; SPR control (415.4M bbl); dollar hegemony; NATO alliance network',
      status: 'No ceasefire discussed (Trump position)',
      displayStatus: 'Escalating',
    },
    {
      name: 'Iran',
      flag: '🇮🇷',
      color: 'border-accent-red',
      bgColor: 'bg-accent-red/5',
      wants: 'Regime survival; sanctions relief; sovereign rights recognition',
      fears: 'Regime collapse; Basij defection; nuclear sites destroyed; HEU seized',
      leverage: 'Hormuz closure threat; proxy network (Hezbollah); 440kg HEU location unknown',
      status: '3 conditions for ceasefire: no future attacks, reparations, sovereignty recognition',
      displayStatus: 'Defending',
    },
    {
      name: 'Israel',
      flag: '🇮🇱',
      color: 'border-accent-cyan',
      bgColor: 'bg-accent-cyan/5',
      wants: 'Iran nuclear program destruction; Hezbollah degradation; regional dominance',
      fears: 'Multi-front war attrition; diplomatic isolation; internal political division',
      leverage: 'Intelligence network; military capability; US alliance; nuclear deterrent',
      status: 'Series of eliminations will not stop — 3+ more weeks planned',
      displayStatus: 'Pressing Advantage',
    },
    {
      name: 'Russia',
      flag: '🇷🇺',
      color: 'border-accent-purple',
      bgColor: 'bg-accent-purple/5',
      wants: 'High oil prices ($72+ for Urals); US distracted from Ukraine; sanctions relief',
      fears: 'Iran collapse reducing leverage; being drawn into conflict directly',
      leverage: 'Oil supply (+$14B/2wk profit); UN veto; satellite intelligence to Iran; energy dependency leverage',
      status: 'Urals at $72 (+1.4% above pre-war); US sanctions lifted; providing sat intel to Iran',
      displayStatus: 'Profiting',
    },
    {
      name: 'China',
      flag: '🇨🇳',
      color: 'border-accent-gold',
      bgColor: 'bg-accent-gold/5',
      wants: 'Stable energy supply; Hormuz reopened; US weakened strategically',
      fears: 'Reserve depletion; economic slowdown; Taiwan conflict precedent',
      leverage: '108 days oil reserves; Iran trade relationship; UN veto; economic weight',
      status: '108 days reserves; tankers transiting Hormuz with Iranian permission',
      displayStatus: 'Watching Carefully',
    },
  ];

  // Alliance network
  const allianceBlocks = [
    {
      side: 'US-Israel Alliance',
      color: 'border-accent-blue',
      icon: '🔵',
      members: ['USA', 'Israel', 'Saudi Arabia', 'UAE', 'Egypt', 'UK', 'Australia', 'Japan'],
      status: 'Tight coordination on military ops; disagreement on ceasefire timing'
    },
    {
      side: 'Iran-Russia Axis',
      color: 'border-accent-red',
      icon: '🔴',
      members: ['Iran', 'Russia', 'China (neutral leaning)', 'Syria', 'Hezbollah', 'Iraq PMF', 'Yemen Houthi'],
      status: 'Loose coordination; Russia profiting from Iran crisis; mutual intelligence sharing'
    },
    {
      side: 'Undecided / Neutral',
      color: 'border-accent-gold',
      icon: '🟡',
      members: ['India', 'Indonesia', 'Brazil', 'Mexico', 'South Africa', 'Turkey'],
      status: 'Balancing economic needs with diplomatic neutrality; energy crisis driving policy shifts'
    },
  ];

  // Diplomatic timeline
  const diplomaticTimeline = [
    { date: 'Feb 28', event: 'War begins', side: 'military' },
    { date: 'Mar 5', event: 'UN Security Council session (no consensus)', side: 'failed' },
    { date: 'Mar 10', event: 'Iran demands ceasefire via UN channels; US ignores', side: 'failed' },
    { date: 'Mar 15', event: 'France proposes 48-hour pause for negotiations; rejected by Israel', side: 'failed' },
    { date: 'Mar 18', event: 'Backchannel talks via Oman (no breakthrough)', side: 'ongoing' },
    { date: 'Mar 21', event: 'Trump: 48-hour ultimatum to Iran to stop all attacks (power plant threat)', side: 'active' },
    { date: 'Mar 22', event: 'No ceasefire framework; only military de-escalation being discussed', side: 'active' },
  ];

  return (
    <div className="space-y-6">
      {/* Nuclear Calculus Enhanced */}
      <div className="bg-gradient-to-br from-accent-red/15 to-accent-red/5 border border-accent-red/40 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-red text-lg mb-4">☢️ Nuclear Calculus</h3>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <MetricCard label="Missing HEU" value="440kg @ 60%" source="IAEA/CSIS" color="text-accent-red" size="sm" />
          <MetricCard label="Fordow Status" value="INOPERABLE" source="ISIS/IAEA (12 MOPs)" color="text-accent-green" size="sm" />
          <MetricCard label="Diego Garcia Strike" value="2 IRBMs at 4000km" source="WSJ/CNN" color="text-accent-orange" size="sm" />
        </div>
        <div className="bg-bg-card border border-border rounded p-4 mb-3">
          <div className="text-sm text-txt-secondary leading-relaxed">
            The 440kg of 60% enriched uranium (near-weapons grade) has unknown location since Fordow enrichment facility was destroyed in initial strikes. Diego Garcia strike demonstrated undeclared IRBM range capability (4000km vs previously known 2000km). One intercepted, one failed — but the range demonstration fundamentally changes calculus for:
          </div>
          <div className="mt-3 grid sm:grid-cols-3 gap-2 text-xs text-txt-dim">
            <div className="bg-bg-secondary rounded p-2">Diego Garcia (4,200km) — US naval base within range</div>
            <div className="bg-bg-secondary rounded p-2">Djibouti (3,100km) — US AFRICOM HQ potentially vulnerable</div>
            <div className="bg-bg-secondary rounded p-2">Incirlik, Turkey (2,300km) — Confirmed within range</div>
          </div>
        </div>
      </div>

      {/* Great Power Cards with Colored Borders */}
      <div>
        <h3 className="font-heading font-semibold text-txt-primary text-lg mb-4">🌍 Great Power Positioning</h3>
        <div className="space-y-4">
          {actors.map((actor) => (
            <div key={actor.name} className={`${actor.bgColor} border-2 ${actor.color} rounded-lg p-5`}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{actor.flag}</span>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-txt-primary">{actor.name}</h4>
                    <div className="text-xs text-txt-dim uppercase tracking-wide">{actor.displayStatus}</div>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-xs text-txt-dim uppercase font-semibold mb-2">Wants</div>
                  <div className="text-txt-secondary">{actor.wants}</div>
                </div>
                <div>
                  <div className="text-xs text-txt-dim uppercase font-semibold mb-2">Fears</div>
                  <div className="text-txt-secondary">{actor.fears}</div>
                </div>
                <div>
                  <div className="text-xs text-txt-dim uppercase font-semibold mb-2">Leverage</div>
                  <div className="text-txt-secondary">{actor.leverage}</div>
                </div>
              </div>
              <div className="bg-bg-secondary border border-border/50 rounded p-3 text-sm">
                <span className="text-txt-dim">Current Position:</span>{' '}
                <span className="text-txt-secondary font-semibold">{actor.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alliance Network */}
      <div className="bg-gradient-to-br from-bg-card to-bg-secondary border border-border rounded-lg p-5">
        <h3 className="font-heading font-semibold text-txt-primary text-lg mb-4">🤝 Alliance Network</h3>
        <div className="space-y-4">
          {allianceBlocks.map((block, idx) => (
            <div key={idx} className={`border-l-4 ${block.color} bg-bg-secondary rounded-lg p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{block.icon}</span>
                <h4 className="font-heading font-bold text-txt-primary">{block.side}</h4>
              </div>
              <div className="mb-3">
                <div className="text-xs text-txt-dim uppercase mb-2">Members</div>
                <div className="flex flex-wrap gap-2">
                  {block.members.map((member, i) => (
                    <span key={i} className="bg-bg-card border border-border rounded px-2 py-1 text-xs text-txt-secondary">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-sm text-txt-secondary border-t border-border/50 pt-3">
                {block.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regime Change Indicators Enhanced */}
      <div className="bg-gradient-to-br from-accent-orange/10 to-accent-orange/5 border border-accent-orange/30 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-orange text-lg mb-4">💥 Regime Change Indicators</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-bg-card border border-accent-red/40 rounded p-4">
            <div className="text-accent-red font-mono font-bold text-xl mb-1">4,500 Basij/IRGC killed</div>
            <div className="text-xs text-txt-dim mt-2">Including 300 commanders in single overnight wave (Mar 17) — suggests US intelligence coordination with ground elements</div>
          </div>
          <div className="bg-bg-card border border-accent-gold/40 rounded p-4">
            <div className="text-accent-gold font-mono font-bold text-xl mb-1">Crowdsourced Targeting</div>
            <div className="text-xs text-txt-dim mt-2">Iranians sending checkpoint locations to IDF via Farsi-language social media accounts — unprecedented civilian coordination with foreign military</div>
          </div>
          <div className="bg-bg-card border border-accent-orange/40 rounded p-4">
            <div className="text-accent-orange font-mono font-bold text-xl mb-1">Basij Morale Collapse</div>
            <div className="text-xs text-txt-dim mt-2">Units setting up checkpoints under bridges to hide from drones; reports of desertions; Khamenei-aligned units refusing orders</div>
          </div>
          <div className="bg-bg-card border border-accent-purple/40 rounded p-4">
            <div className="text-accent-purple font-mono font-bold text-xl mb-1">Leadership Fracturing</div>
            <div className="text-xs text-txt-dim mt-2">Mojtaba Khamenei: no public appearance in 22 days. President Pezeshkian reportedly cut off from security decisions. IRGC making unilateral operational decisions.</div>
          </div>
        </div>
      </div>

      {/* Diplomatic Timeline */}
      <div className="bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 border border-accent-blue/30 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-blue text-lg mb-4">🕐 Diplomatic Timeline — Ceasefire Attempts & Failures</h3>
        <div className="space-y-2">
          {diplomaticTimeline.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="text-sm font-mono text-txt-dim min-w-fit">{item.date}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {item.side === 'military' && <span className="text-lg">⚔️</span>}
                  {item.side === 'failed' && <span className="text-lg">❌</span>}
                  {item.side === 'ongoing' && <span className="text-lg">🔄</span>}
                  {item.side === 'active' && <span className="text-lg">⚠️</span>}
                  <span className={`text-sm ${
                    item.side === 'military' ? 'text-txt-secondary' :
                    item.side === 'failed' ? 'text-accent-red' :
                    item.side === 'ongoing' ? 'text-accent-orange' :
                    'text-accent-red font-semibold'
                  }`}>
                    {item.event}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-bg-card border border-border rounded text-sm text-txt-secondary">
          <strong>Status:</strong> No credible ceasefire framework on table. Military operations continue at full intensity. All diplomatic initiatives have failed. No negotiation timelines discussed.
        </div>
      </div>

      {/* Historical Parallels */}
      <div className="bg-gradient-to-br from-bg-card to-bg-secondary border border-border rounded-lg p-5">
        <h3 className="font-heading font-semibold text-txt-primary text-lg mb-4">📚 Historical Parallel Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-3 text-left text-xs text-txt-dim font-semibold">Conflict</th>
                <th className="px-3 py-3 text-left text-xs text-txt-dim font-semibold">Oil Impact</th>
                <th className="px-3 py-3 text-left text-xs text-txt-dim font-semibold">Duration</th>
                <th className="px-3 py-3 text-left text-xs text-txt-dim font-semibold">GDP Effect</th>
                <th className="px-3 py-3 text-left text-xs text-txt-dim font-semibold">Key Difference</th>
              </tr>
            </thead>
            <tbody className="text-txt-secondary">
              <tr className="border-b border-border/30 bg-bg-secondary/30">
                <td className="px-3 py-3 font-mono text-accent-gold">1973 Oil Embargo</td>
                <td className="px-3 py-3">+300%</td>
                <td className="px-3 py-3">5 months</td>
                <td className="px-3 py-3 text-accent-red">-3% US</td>
                <td className="px-3 py-3 text-xs">Partial supply cut; coordinated OPEC action</td>
              </tr>
              <tr className="border-b border-border/30 bg-bg-secondary/30">
                <td className="px-3 py-3 font-mono text-accent-gold">1979 Iran Revolution</td>
                <td className="px-3 py-3">+150%</td>
                <td className="px-3 py-3">2+ years</td>
                <td className="px-3 py-3 text-accent-red">Stagflation</td>
                <td className="px-3 py-3 text-xs">Regime change + oil shock combo; most analogous scenario</td>
              </tr>
              <tr className="border-b border-border/30 bg-bg-secondary/30">
                <td className="px-3 py-3 font-mono text-accent-gold">1990 Gulf War</td>
                <td className="px-3 py-3">+85%</td>
                <td className="px-3 py-3">7 months</td>
                <td className="px-3 py-3 text-accent-orange">-1.5% US</td>
                <td className="px-3 py-3 text-xs">Kuwait only; swift military victory</td>
              </tr>
              <tr className="border-b border-border/30 bg-bg-secondary/30">
                <td className="px-3 py-3 font-mono text-accent-gold">2003 Iraq War</td>
                <td className="px-3 py-3">+40%</td>
                <td className="px-3 py-3">8+ years</td>
                <td className="px-3 py-3 text-accent-red">$2T+ cost</td>
                <td className="px-3 py-3 text-xs">No Hormuz disruption; gradual supply loss</td>
              </tr>
              <tr className="bg-accent-red/10">
                <td className="px-3 py-3 font-mono text-accent-red font-bold">2026 Iran War</td>
                <td className="px-3 py-3 text-accent-red font-bold">+66% (so far)</td>
                <td className="px-3 py-3 text-accent-red font-bold">22 days+</td>
                <td className="px-3 py-3 text-accent-red font-bold">TBD</td>
                <td className="px-3 py-3 text-xs text-accent-red font-semibold">Most significant chokepoint disruption in history; multi-front regional conflict</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

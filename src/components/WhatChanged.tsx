'use client';

import { useState, useEffect } from 'react';

type UpdateType = 'military' | 'diplomatic' | 'economic' | 'humanitarian' | 'political';

interface Update {
  type: UpdateType;
  timestamp: string;
  text: string;
  confidence: 'confirmed' | 'multisource' | 'singlesource' | 'disputed';
  source?: string;
}

const UPDATES: Update[] = [
  { type: 'military',    timestamp: '2026-03-24T08:00:00Z', text: 'US sortie count: 14 sorties confirmed in last 24h — down from Week 1 peak of 40+. Shift to ISR-dominant tempo suggests consolidation phase.', confidence: 'multisource', source: 'CENTCOM / Aviation Week' },
  { type: 'diplomatic',  timestamp: '2026-03-24T07:30:00Z', text: 'Qatar FM Abu Abdullah in Washington for "routine consultations." GeoWire assesses ceasefire-adjacent. Third visit in 10 days.', confidence: 'singlesource', source: 'GeoWire / Al-Jazeera' },
  { type: 'economic',    timestamp: '2026-03-24T06:00:00Z', text: 'Brent crude: $112.40 — flat vs yesterday. Gold: $3,240 — new 3-year high. Dollar index up 0.3% on safe-haven flows.', confidence: 'confirmed', source: 'Bloomberg / Reuters' },
  { type: 'humanitarian',timestamp: '2026-03-24T05:00:00Z', text: 'ICRC: attempting to deliver 12 tons of medical supplies to Kurdistan region. Access approved for Tabriz corridor.', confidence: 'confirmed', source: 'ICRC Press Release' },
  { type: 'military',    timestamp: '2026-03-23T22:00:00Z', text: 'Houthi drone swarm (8 units) intercepted by USS Carney in Red Sea. No casualties. Third interception this week.', confidence: 'confirmed', source: 'CENTCOM' },
  { type: 'diplomatic',  timestamp: '2026-03-23T18:00:00Z', text: 'UN SG Guterres envoy arrived Ankara for shuttle diplomacy. Iran has not formally responded to proposed framework.', confidence: 'multisource', source: 'Reuters / UN' },
  { type: 'economic',    timestamp: '2026-03-23T16:00:00Z', text: 'S&P 500 closed -0.8% on renewed conflict escalation news. Defense sector (RTX, LMT) up 2.1%. Energy (XOM, CVX) up 1.4%.', confidence: 'confirmed', source: 'Bloomberg' },
  { type: 'humanitarian',timestamp: '2026-03-23T12:00:00Z', text: 'NetBlocks: Iran internet at 1.2% — slight uptick from 0.8% overnight low. Consistent with short-window openings for regime comms.', confidence: 'singlesource', source: 'NetBlocks' },
  { type: 'political',   timestamp: '2026-03-23T10:00:00Z', text: 'Congressional sources: Senate Armed Services Committee requesting classified briefing on Khamenei succession intelligence. White House has not confirmed.', confidence: 'singlesource', source: 'Politico (unconfirmed)' },
  { type: 'military',    timestamp: '2026-03-23T06:00:00Z', text: 'Satellite imagery: Fordow enrichment facility shows significant structural damage. Pre-war underground bunker network partially collapsed, per IAEA-adjacent analysis.', confidence: 'multisource', source: 'Planet Labs / Arms Control' },
  { type: 'economic',    timestamp: '2026-03-23T04:00:00Z', text: 'IEA emergency release: 1.2M bbl/day additional supply authorized from strategic reserves across member states. Market impact minimal — structural Hormuz problem remains.', confidence: 'confirmed', source: 'IEA Press Release' },
  { type: 'diplomatic',  timestamp: '2026-03-22T20:00:00Z', text: 'China called for "immediate unconditional ceasefire" at UN Security Council. US vetoed for third time. Russia co-sponsored resolution.', confidence: 'confirmed', source: 'UN SCOR' },
];

const TYPE_CONFIG: Record<UpdateType | string, { label: string; color: string; border: string; bg: string }> = {
  military:    { label: 'MILITARY',     color: 'text-red-400',    border: 'border-l-red-500',    bg: 'bg-red-900/10' },
  diplomatic:  { label: 'DIPLOMATIC',   color: 'text-blue-400',   border: 'border-l-blue-500',   bg: 'bg-blue-900/10' },
  economic:    { label: 'ECONOMIC',     color: 'text-yellow-400', border: 'border-l-yellow-500', bg: 'bg-yellow-900/10' },
  humanitarian:{ label: 'HUMANITARIAN', color: 'text-green-400',  border: 'border-l-green-500',  bg: 'bg-green-900/10' },
  political:   { label: 'POLITICAL',    color: 'text-purple-400', border: 'border-l-purple-500', bg: 'bg-purple-900/10' },
};

const CONFIDENCE_STYLES: Record<string, string> = {
  confirmed:    'text-green-400 bg-green-900/20 border border-green-700/40',
  multisource:  'text-yellow-400 bg-yellow-900/20 border border-yellow-700/40',
  singlesource: 'text-orange-400 bg-orange-900/20 border border-orange-700/40',
  disputed:     'text-red-400 bg-red-900/20 border border-red-700/40',
};

const CONFIDENCE_LABELS: Record<string, string> = {
  confirmed: '🟢 Confirmed', multisource: '🟡 Multi-source', singlesource: '🟠 Single-source', disputed: '⚠️ Disputed',
};

const MARKET_DELTAS = [
  { label: 'BRENT CRUDE', value: '$112.40', unit: '/bbl', change: '+64.7%', up: true },
  { label: 'GOLD',        value: '$3,240',  unit: '/oz',  change: '+37.9%', up: true },
  { label: 'S&P 500',     value: '4,820',   unit: '',     change: '-9.7%',  up: false },
  { label: 'USD INDEX',   value: '99.15',   unit: '',     change: '-4.7%',  up: false },
  { label: 'US GAS',      value: '$5.53',   unit: '/gal', change: '+29.4%', up: true },
  { label: 'BITCOIN',     value: '$70,716', unit: '',     change: '-16.8%', up: false },
];

const FILTERS = [
  { value: 'all',         label: 'All Updates' },
  { value: 'military',    label: 'Military' },
  { value: 'economic',    label: 'Economic' },
  { value: 'diplomatic',  label: 'Diplomatic' },
  { value: 'humanitarian',label: 'Humanitarian' },
  { value: 'political',   label: 'Political' },
];

function formatTime(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'UTC', timeZoneName: 'short',
  });
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h >= 24) return `${Math.floor(h / 24)}d ago`;
  if (h > 0) return `${h}h ago`;
  return `${m}m ago`;
}

export default function WhatChanged() {
  const [filter, setFilter] = useState<string>('all');
  const [now, setNow] = useState('');

  useEffect(() => {
    setNow(new Date().toUTCString().replace(' GMT', ' UTC'));
  }, []);

  const filtered = filter === 'all' ? UPDATES : UPDATES.filter(u => u.type === filter);

  // Confidence breakdown
  const confCounts: Record<string, number> = {};
  UPDATES.forEach(u => { confCounts[u.confidence] = (confCounts[u.confidence] || 0) + 1; });

  return (
    <div className="space-y-10">

      {/* Last updated */}
      <div className="flex items-center gap-2 text-xs font-mono text-tx-3">
        <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse inline-block" />
        Last updated: <span className="text-tx-2">{now || '—'}</span>
      </div>

      {/* Market Delta */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-accent-red text-sm">▲</span>
          <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase">24h Market Delta vs Pre-War</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MARKET_DELTAS.map((m) => (
            <div key={m.label} className="bg-bg-card border border-border rounded-lg p-3">
              <div className="text-[10px] font-mono text-tx-3 mb-1">{m.label}</div>
              <div className="text-base font-bold text-tx-0">{m.value}<span className="text-xs text-tx-3">{m.unit}</span></div>
              <div className={`text-xs font-mono font-semibold ${m.up ? 'text-red-400' : 'text-green-400'}`}>
                {m.change} vs pre-war
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter tabs + Feed */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-accent-red text-sm">▲</span>
          <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase">Intelligence Updates</h2>
          <span className="ml-auto text-[10px] font-mono text-tx-3">{UPDATES.length} UPDATES</span>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors border ${
                filter === f.value
                  ? 'bg-accent-blue/20 border-accent-blue/60 text-accent-blue'
                  : 'bg-bg-card border-border text-tx-2 hover:border-accent-blue/30 hover:text-tx-1'
              }`}
            >
              {f.label}
              {f.value !== 'all' && (
                <span className="ml-1 text-[9px] opacity-60">
                  ({UPDATES.filter(u => u.type === f.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-tx-3 font-mono text-sm text-center py-10">No updates in this category.</p>
          ) : (
            filtered.map((u, i) => {
              const tc = TYPE_CONFIG[u.type] || TYPE_CONFIG.military;
              return (
                <div key={i} className={`border-l-4 ${tc.border} rounded-r-lg bg-bg-card border border-l-0 border-border p-4`}>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-bold tracking-wider ${tc.color}`}>{tc.label}</span>
                    <span className="text-[10px] font-mono text-tx-3">{formatTime(u.timestamp)}</span>
                    <span className="text-[10px] font-mono text-tx-4">{timeAgo(u.timestamp)}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${CONFIDENCE_STYLES[u.confidence]}`}>
                      {CONFIDENCE_LABELS[u.confidence]}
                    </span>
                  </div>
                  <p className="text-sm text-tx-1 leading-relaxed">{u.text}</p>
                  {u.source && (
                    <div className="text-[10px] font-mono text-tx-3 mt-2">Source: {u.source}</div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Confidence breakdown */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-accent-red text-sm">▲</span>
          <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase">Intelligence Confidence Breakdown</h2>
        </div>
        <div className="bg-bg-card border border-border rounded-lg p-5">
          <div className="space-y-3">
            {Object.entries(confCounts).map(([key, count]) => {
              const pct = Math.round((count / UPDATES.length) * 100);
              const barColors: Record<string, string> = {
                confirmed: 'bg-green-500', multisource: 'bg-yellow-500',
                singlesource: 'bg-orange-500', disputed: 'bg-red-500',
              };
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono w-40 shrink-0 ${CONFIDENCE_STYLES[key]}`}>
                    {CONFIDENCE_LABELS[key]}
                  </span>
                  <div className="flex-1 bg-bg-2 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColors[key] || 'bg-tx-3'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-tx-3 w-20 shrink-0">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] font-mono text-tx-3 mt-4 border-t border-border pt-3">
            Higher confirmed % = better intelligence visibility. Low confirmed rate indicates active information warfare environment.
          </p>
        </div>
      </section>

    </div>
  );
}

'use client';

import type { ThreatLevel } from '@/lib/constants';

interface HotspotCardProps {
  region: string;
  headline: string;
  threatLevel: ThreatLevel;
  timeAgo: string;
  dayCount?: number;
}

const LEVEL_STYLES: Record<ThreatLevel, { border: string; bg: string; text: string; label: string }> = {
  critical: { border: 'border-accent-red', bg: 'bg-accent-red/10', text: 'text-accent-red', label: 'CRITICAL' },
  elevated: { border: 'border-accent-orange', bg: 'bg-accent-orange/10', text: 'text-accent-orange', label: 'ELEVATED' },
  moderate: { border: 'border-accent-gold', bg: 'bg-accent-gold/10', text: 'text-accent-gold', label: 'MODERATE' },
  stable: { border: 'border-accent-green', bg: 'bg-accent-green/10', text: 'text-accent-green', label: 'STABLE' },
};

export default function HotspotCard({ region, headline, threatLevel, timeAgo, dayCount }: HotspotCardProps) {
  const s = LEVEL_STYLES[threatLevel];

  return (
    <div className={`${s.bg} border ${s.border}/30 rounded-lg p-4 hover:${s.border}/50 transition-colors cursor-pointer`}>
      <div className="flex items-start justify-between mb-2">
        <span className="font-mono text-[11px] tracking-widest text-tx-2 uppercase">{region}</span>
        <span className="font-mono text-[10px] text-tx-3">{timeAgo}</span>
      </div>
      <p className="text-tx-1 text-sm leading-snug mb-3">{headline}</p>
      <div className="flex items-center justify-between">
        <span className={`${s.text} font-mono text-[11px] font-semibold flex items-center gap-1.5`}>
          <span className={`w-1.5 h-1.5 rounded-full ${threatLevel === 'critical' ? 'bg-accent-red live-dot' : s.text.replace('text-', 'bg-')}`} />
          {s.label}
        </span>
        {dayCount && <span className="font-mono text-[10px] text-tx-3">Day {dayCount}</span>}
      </div>
    </div>
  );
}

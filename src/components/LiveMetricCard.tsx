'use client';

interface LiveMetricCardProps {
  label: string;
  value: number | null;
  baseline: number | null;
  unit?: string;
  source?: string;
  changePct?: number | null;
  updatedAt?: string;
  color?: string;
  invertColor?: boolean; // true = up is green (stocks), false = up is red (oil)
  prefix?: string;
  newStat?: boolean;
  tvSymbol?: string; // TradingView symbol for mini chart
}

export default function LiveMetricCard({
  label,
  value,
  baseline,
  unit = '',
  source = '',
  changePct,
  updatedAt,
  color,
  invertColor = false,
  prefix = '',
  newStat = false,
}: LiveMetricCardProps) {
  const displayValue = value !== null && value !== undefined
    ? (Math.abs(value) >= 1000
        ? prefix + value.toLocaleString('en-US', { maximumFractionDigits: 0 })
        : prefix + value.toFixed(2))
    : '--';

  const displayBaseline = baseline !== null && baseline !== undefined
    ? (Math.abs(baseline) >= 1000
        ? prefix + baseline.toLocaleString('en-US', { maximumFractionDigits: 0 })
        : prefix + baseline.toFixed(2))
    : '--';

  const change = changePct ?? (baseline && baseline !== 0 && value !== null
    ? +((value - baseline) / baseline * 100).toFixed(1)
    : null);

  const isUp = change !== null && change >= 0;
  const changeColor = newStat
    ? 'text-accent-cyan'
    : change === null
    ? 'text-txt-dim'
    : invertColor
    ? (isUp ? 'text-accent-green' : 'text-accent-red')
    : (isUp ? 'text-accent-red' : 'text-accent-green');

  const arrow = newStat ? '' : change !== null ? (isUp ? '▲' : '▼') : '';
  const changeText = newStat ? 'NEW' : change !== null ? `${arrow} ${isUp ? '+' : ''}${change.toFixed(1)}%` : '--';

  const cardColor = color || (change !== null
    ? (invertColor ? (isUp ? 'text-accent-green' : 'text-accent-red') : (isUp ? 'text-accent-red' : 'text-accent-orange'))
    : 'text-accent-cyan');

  // Stale data indicator
  const isStale = updatedAt
    ? (Date.now() - new Date(updatedAt).getTime()) > 6 * 60 * 60 * 1000 // >6 hours
    : false;

  return (
    <div className="bg-bg-card border border-border rounded-lg p-3 hover:border-border/60 transition-all relative">
      {isStale && (
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-orange animate-pulse" title="Data may be stale" />
      )}
      <div className="text-[10px] uppercase tracking-wider text-txt-dim font-semibold mb-1">{label}</div>
      <div className={`text-xl font-mono font-bold ${cardColor} leading-tight`}>
        {displayValue}
        {unit && <span className="text-xs text-txt-dim ml-1">{unit}</span>}
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-[9px] text-txt-dim">
          Pre-war: {displayBaseline} {unit}
        </div>
        <div className={`text-[10px] font-mono font-semibold ${changeColor}`}>
          {changeText}
        </div>
      </div>
      {source && (
        <div className="text-[8px] text-txt-dim mt-1 opacity-60">{source}</div>
      )}
    </div>
  );
}

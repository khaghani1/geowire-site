'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
  prewar?: string | number;
  change?: number;
  unit?: string;
  source?: string;
  updated?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  newStat?: boolean;
}

export default function MetricCard({
  label,
  value,
  prewar,
  change,
  unit,
  source,
  updated,
  color,
  size = 'md',
  newStat,
}: MetricCardProps) {
  const valColor =
    color ||
    (change !== undefined
      ? change > 0
        ? 'text-accent-red'
        : change < 0
          ? 'text-accent-green'
          : 'text-txt-primary'
      : 'text-txt-primary');

  const textSize =
    size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-xl' : 'text-3xl';

  const borderColor =
    color === 'text-accent-red'
      ? 'border-l-accent-red'
      : color === 'text-accent-green'
        ? 'border-l-accent-green'
        : color === 'text-accent-blue'
          ? 'border-l-accent-blue'
          : color === 'text-accent-gold'
            ? 'border-l-accent-gold'
            : change !== undefined && change > 0
              ? 'border-l-accent-red'
              : change !== undefined && change < 0
                ? 'border-l-accent-green'
                : 'border-l-accent-cyan';

  // Simple sparkline simulation
  const sparklineData = [30, 45, 35, 50, 42, 60, 48];

  return (
    <div className={`group relative bg-bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-border-hover hover:shadow-lg hover:shadow-accent-blue/10`}>
      {/* Left color bar indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${borderColor.split('-')[2]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="p-4">
        {/* Label and updated date */}
        <div className="flex items-start justify-between mb-3">
          <div className="text-xs text-txt-dim uppercase tracking-widest font-body leading-tight">
            {label}
          </div>
          {updated && (
            <div className="text-[10px] text-txt-muted font-mono">
              {new Date(updated).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Main value with prominent display */}
        <div className={`font-mono font-black ${textSize} ${valColor} leading-none tracking-tight mb-3`}>
          {value}
          {unit && (
            <span className="text-sm text-txt-dim font-normal ml-1 font-body">
              {unit}
            </span>
          )}
        </div>

        {/* Sparkline mini-chart */}
        <div className="mb-3 h-8 flex items-end gap-0.5">
          <svg
            viewBox={`0 0 ${sparklineData.length * 12} 32`}
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Background area */}
            <defs>
              <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={valColor.includes('red') ? '#ef4444' : valColor.includes('green') ? '#22c55e' : '#06b6d4'} stopOpacity="0.2" />
                <stop offset="100%" stopColor={valColor.includes('red') ? '#ef4444' : valColor.includes('green') ? '#22c55e' : '#06b6d4'} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Sparkline area path */}
            <path
              d={`M 0 ${32 - (sparklineData[0] / 60) * 28} ${sparklineData
                .map((v, i) => `L ${i * 12} ${32 - (v / 60) * 28}`)
                .join(' ')} L ${(sparklineData.length - 1) * 12} 32 L 0 32 Z`}
              fill="url(#sparkGrad)"
            />

            {/* Sparkline line */}
            <polyline
              points={sparklineData
                .map((v, i) => `${i * 12},${32 - (v / 60) * 28}`)
                .join(' ')}
              fill="none"
              stroke={valColor.includes('red') ? '#ef4444' : valColor.includes('green') ? '#22c55e' : '#06b6d4'}
              strokeWidth="1.5"
              opacity="0.7"
            />

            {/* Last data point dot */}
            <circle
              cx={(sparklineData.length - 1) * 12}
              cy={32 - (sparklineData[sparklineData.length - 1] / 60) * 28}
              r="1.5"
              fill={valColor.includes('red') ? '#ef4444' : valColor.includes('green') ? '#22c55e' : '#06b6d4'}
            />
          </svg>
        </div>

        {/* Pre-war comparison with trend indicator */}
        {prewar !== undefined && (
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="text-xs text-txt-muted font-mono">
                Pre-war: {prewar}
                {unit ? ` ${unit}` : ''}
              </div>
              {newStat ? (
                <span className="px-2 py-0.5 bg-accent-red/20 border border-accent-red/40 text-accent-red font-mono text-xs font-bold rounded tracking-wider">
                  NEW
                </span>
              ) : change !== undefined && isFinite(change) && (
                <div
                  className={`flex items-center gap-1 font-mono text-sm font-bold ${
                    change > 0
                      ? 'text-accent-red'
                      : change < 0
                        ? 'text-accent-green'
                        : 'text-txt-secondary'
                  }`}
                >
                  <span className="text-base">
                    {change > 0 ? '▲' : change < 0 ? '▼' : '—'}
                  </span>
                  <span>{change > 0 ? '+' : ''}{change.toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Source footer */}
        {source && (
          <div className="mt-3 pt-3 border-t border-border/30">
            <div className="text-[10px] text-txt-muted font-mono tracking-wide">
              {source}
            </div>
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/0 via-accent-blue/0 to-accent-blue/0 group-hover:from-accent-blue/5 group-hover:to-accent-blue/0 transition-all duration-300 pointer-events-none rounded-lg" />
    </div>
  );
}

import { ThreatCard } from '@/lib/types'
import Link from 'next/link'

interface ThreatMonitorProps {
  threats: ThreatCard[]
}

export default function ThreatMonitor({ threats }: ThreatMonitorProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-gw-tx-2">
          <svg className="w-4 h-4 text-gw-red" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Threat Monitor
        </h2>
        <Link
          href="/dashboard"
          className="text-xs text-gw-tx-3 hover:text-gw-gold font-mono transition-colors"
        >
          Full Dashboard →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {threats.map((threat) => (
          <div
            key={threat.region}
            className={`threat-${threat.level} border rounded-lg p-3 transition-all hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider opacity-80">
                {threat.regionLabel}
              </span>
              <span className="text-[10px] font-mono opacity-60">
                {threat.timeAgo}
              </span>
            </div>
            <p className="text-sm text-gw-tx-0 font-medium leading-snug">
              {threat.title}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    threat.level === 'critical'
                      ? 'bg-gw-red animate-pulse-live'
                      : threat.level === 'elevated'
                      ? 'bg-gw-orange'
                      : threat.level === 'moderate'
                      ? 'bg-gw-blue'
                      : 'bg-gw-green'
                  }`}
                />
                {threat.level}
              </span>
              {threat.dayCount && (
                <span className="text-[10px] font-mono text-gw-tx-3">
                  Day {threat.dayCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
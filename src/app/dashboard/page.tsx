import type { Metadata } from 'next'
import Header from '@/components/Header'
import MarketTicker from '@/components/MarketTicker'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import { MOCK_THREATS, MOCK_MARKET_DATA, MOCK_ARTICLES } from '@/lib/mock-data'
import { CATEGORIES } from '@/lib/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Crisis Dashboard',
  description:
    'Real-time global threat monitoring and crisis assessment. Bloomberg-grade intelligence dashboard.',
}

export default function DashboardPage() {
  return (
    <>
      <Header />
      <MarketTicker />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display text-gw-tx-0">
              Crisis Dashboard
            </h1>
            <p className="text-sm text-gw-tx-3 font-mono mt-1">
              Global Threat Assessment · Updated{' '}
              {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              UTC
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-1 bg-gw-red/15 border border-gw-red/30 rounded text-[11px] font-mono text-gw-red">
              <span className="w-1.5 h-1.5 bg-gw-red rounded-full animate-pulse-live" />
              2 CRITICAL
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 bg-gw-orange/15 border border-gw-orange/30 rounded text-[11px] font-mono text-gw-orange">
              3 ELEVATED
            </span>
          </div>
        </div>

        {/* Threat Grid */}
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-gw-tx-3 mb-4">
            Regional Threat Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_THREATS.map((threat) => (
              <div
                key={threat.region}
                className={`threat-${threat.level} border rounded-lg p-4 hover:scale-[1.01] transition-transform`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-mono uppercase tracking-wider opacity-90">
                    {threat.regionLabel}
                  </h3>
                  <span className="text-[10px] font-mono opacity-60">
                    {threat.timeAgo}
                  </span>
                </div>
                <p className="text-sm text-gw-tx-0 font-medium leading-snug mb-3">
                  {threat.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        threat.level === 'critical'
                          ? 'bg-gw-red animate-pulse-live'
                          : threat.level === 'elevated'
                          ? 'bg-gw-orange'
                          : threat.level === 'moderate'
                          ? 'bg-gw-blue'
                          : 'bg-gw-green'
                      }`}
                    />
                    <span className="text-xs font-mono uppercase tracking-wider">
                      {threat.level}
                    </span>
                  </div>
                  {threat.dayCount && (
                    <span className="text-xs font-mono text-gw-tx-3">
                      Day {threat.dayCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdZone size="leaderboard" className="mx-auto mb-8" />

        {/* Market Impact Panel */}
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-gw-tx-3 mb-4">
            Market Impact — Crisis vs. Pre-Crisis Baseline
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MOCK_MARKET_DATA.map((item) => (
              <div key={item.id} className="card rounded-lg p-4">
                <span className="text-[10px] font-mono text-gw-tx-3 uppercase tracking-wider">
                  {item.indicator}
                </span>
                <div className="mt-1 text-xl font-mono font-medium text-gw-tx-0">
                  {item.unit === '$'
                    ? `$${item.current_value.toLocaleString()}`
                    : item.unit === '$/bbl' ||
                      item.unit === '$/oz' ||
                      item.unit === '$/bu' ||
                      item.unit === '$/MMBtu'
                    ? `$${item.current_value.toFixed(2)}`
                    : item.current_value.toFixed(
                        item.unit === '%' ? 2 : 4
                      )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs font-mono ${
                      item.change_pct >= 0 ? 'text-gw-green' : 'text-gw-red'
                    }`}
                  >
                    {item.change_pct >= 0 ? '+' : ''}
                    {item.change_pct.toFixed(1)}%
                  </span>
                  <span className="text-[10px] font-mono text-gw-tx-3">
                    vs baseline
                  </span>
                </div>
                <div className="mt-2 h-1 bg-gw-bg-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.change_pct >= 0 ? 'bg-gw-green' : 'bg-gw-red'
                    }`}
                    style={{
                      width: `${Math.min(Math.abs(item.change_pct), 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline / Latest Intel */}
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-gw-tx-3 mb-4">
            Intelligence Timeline
          </h2>
          <div className="card rounded-lg divide-y divide-gw-border">
            {MOCK_ARTICLES.map((article) => {
              const cat = CATEGORIES[article.category]
              return (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="flex items-start gap-4 p-4 hover:bg-gw-bg-2/50 transition-colors group"
                >
                  <div className="shrink-0 w-16 text-right">
                    <span className="text-xs font-mono text-gw-tx-3">
                      {new Date(article.published_at).toLocaleTimeString(
                        'en-US',
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${
                      article.threat_level === 'critical'
                        ? 'bg-gw-red animate-pulse-live'
                        : article.threat_level === 'elevated'
                        ? 'bg-gw-orange'
                        : article.threat_level === 'moderate'
                        ? 'bg-gw-blue'
                        : 'bg-gw-green'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider ${cat.color}`}
                      >
                        {cat.label}
                      </span>
                      {article.tags.includes('breaking') && (
                        <span className="tag-breaking text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded">
                          Breaking
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm text-gw-tx-0 font-medium group-hover:text-gw-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gw-tx-2 mt-1 line-clamp-1">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <AdZone size="leaderboard" className="mx-auto" />
      </main>

      <Footer />
    </>
  )
}
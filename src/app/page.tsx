import Header from '@/components/Header'
import MarketTicker from '@/components/MarketTicker'
import Footer from '@/components/Footer'
import ThreatMonitor from '@/components/ThreatMonitor'
import ArticleCard from '@/components/ArticleCard'
import AdZone from '@/components/AdZone'
import NewsletterSignup from '@/components/NewsletterSignup'
import { MOCK_ARTICLES, MOCK_THREATS } from '@/lib/mock-data'

export default function HomePage() {
  const heroArticle = MOCK_ARTICLES.find((a) => a.is_hero)
  const articles = MOCK_ARTICLES.filter((a) => !a.is_hero)

  return (
    <>
      <Header />
      <MarketTicker />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Leaderboard Ad */}
        <div className="flex justify-center mb-6">
          <AdZone size="leaderboard" />
        </div>

        {/* Threat Monitor */}
        <ThreatMonitor threats={MOCK_THREATS} />

        {/* Timestamp bar */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="h-px flex-1 bg-gw-border" />
          <span className="px-3 text-[10px] font-mono text-gw-tx-3 uppercase tracking-widest">
            Latest Intelligence — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <div className="h-px flex-1 bg-gw-border" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column — Articles */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Article */}
            {heroArticle && <ArticleCard article={heroArticle} variant="hero" />}

            {/* In-article Ad */}
            <AdZone size="in-article" />

            {/* Article grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.slice(0, 4).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Second in-article Ad */}
            <AdZone size="in-article" />

            {/* Remaining articles */}
            {articles.length > 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.slice(4).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            {/* Sidebar Ad */}
            <AdZone size="sidebar" className="mx-auto" />

            {/* Newsletter */}
            <NewsletterSignup />

            {/* Quick Reads */}
            <div className="card rounded-lg p-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gw-tx-3 mb-3">
                Quick Reads
              </h3>
              {MOCK_ARTICLES.slice(0, 5).map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>

            {/* Second Sidebar Ad */}
            <AdZone size="sidebar" className="mx-auto" />

            {/* Data Sources */}
            <div className="card rounded-lg p-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gw-tx-3 mb-3">
                Market Snapshot
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Brent Crude', value: '$115.42', change: '+39.9%', up: true },
                  { label: 'Gold', value: '$3,245', change: '+22.5%', up: true },
                  { label: '10Y Treasury', value: '4.82%', change: '+13.4%', up: true },
                  { label: 'Bitcoin', value: '$72,450', change: '+7.8%', up: true },
                  { label: 'Natural Gas', value: '$4.65', change: '+66.1%', up: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-1.5 border-b border-gw-border last:border-0"
                  >
                    <span className="text-xs text-gw-tx-2">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gw-tx-0">
                        {item.value}
                      </span>
                      <span
                        className={`text-[10px] font-mono ${
                          item.up ? 'text-gw-green' : 'text-gw-red'
                        }`}
                      >
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gw-tx-3 font-mono mt-3">
                vs. pre-crisis baseline · Updated hourly
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  )
}
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import MarketTicker from '@/components/MarketTicker'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import AdZone from '@/components/AdZone'
import NewsletterSignup from '@/components/NewsletterSignup'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { CATEGORIES, Category } from '@/lib/types'
import Link from 'next/link'

interface PageProps {
  params: { category: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cat = CATEGORIES[params.category as Category]
  if (!cat) return { title: 'Category Not Found' }
  return {
    title: `${cat.label} — Intelligence & Analysis`,
    description: `Latest ${cat.label} intelligence, analysis, and breaking developments from GeoWire.`,
  }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((c) => ({ category: c }))
}

export default function CategoryPage({ params }: PageProps) {
  const categoryKey = params.category as Category
  const cat = CATEGORIES[categoryKey]
  if (!cat) notFound()

  const articles = MOCK_ARTICLES.filter((a) => a.category === categoryKey)
  const allArticles = articles.length > 0 ? articles : MOCK_ARTICLES.slice(0, 4)

  return (
    <>
      <Header />
      <MarketTicker />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-xs font-mono text-gw-tx-3 mb-3">
            <Link href="/" className="hover:text-gw-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className={cat.color}>{cat.label}</span>
          </nav>
          <h1 className="text-3xl font-display text-gw-tx-0">{cat.label}</h1>
          <p className="text-sm text-gw-tx-2 mt-2">
            Latest intelligence, analysis, and strategic assessments.
          </p>
        </div>

        {/* Category nav */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gw-border">
          {Object.entries(CATEGORIES).map(([key, val]) => (
            <Link
              key={key}
              href={`/category/${key}`}
              className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
                key === categoryKey
                  ? 'bg-gw-bg-3 border-gw-gold/30 text-gw-gold'
                  : 'border-gw-border text-gw-tx-3 hover:text-gw-tx-1 hover:border-gw-border'
              }`}
            >
              {val.label}
            </Link>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <AdZone size="leaderboard" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {allArticles.length === 0 && (
              <div className="card rounded-lg p-8 text-center">
                <p className="text-gw-tx-2">No articles in this category yet.</p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <AdZone size="sidebar" className="mx-auto" />
            <NewsletterSignup />
            <AdZone size="sidebar" className="mx-auto" />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  )
}
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import MarketTicker from '@/components/MarketTicker'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import ArticleCard from '@/components/ArticleCard'
import ArticleBody from '@/components/ArticleBody'
import ShareButtons from '@/components/ShareButtons'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { CATEGORIES } from '@/lib/types'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  }
}

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }))
}

export default function ArticlePage({ params }: PageProps) {
  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const cat = CATEGORIES[article.category]
  const related = MOCK_ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || a.region === article.region)
  ).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { '@type': 'Organization', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'GeoWire Media',
      url: 'https://geowire.org',
    },
    mainEntityOfPage: `https://geowire.org/article/${article.slug}`,
  }

  return (
    <>
      <Header />
      <MarketTicker />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article content */}
          <article className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-mono text-gw-tx-3 mb-4">
              <Link href="/" className="hover:text-gw-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/category/${article.category}`}
                className={`hover:text-gw-gold transition-colors ${cat.color}`}
              >
                {cat.label}
              </Link>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className={`tag-${tag} text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded`}
                >
                  {tag}
                </span>
              ))}
              {article.threat_level && (
                <span
                  className={`threat-${article.threat_level} text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border`}
                >
                  {article.threat_level}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-display text-gw-tx-0 leading-tight mb-4">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gw-tx-3 font-mono mb-6 pb-6 border-b border-gw-border">
              <span>{article.author}</span>
              <span>&middot;</span>
              <time dateTime={article.published_at}>
                {new Date(article.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
              <span>&middot;</span>
              <span>{article.read_time_minutes} min read</span>
              <span>&middot;</span>
              <span className={cat.color}>{cat.label}</span>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-gw-tx-1 leading-relaxed mb-8 font-medium">
              {article.excerpt}
            </p>

            {/* In-article Ad */}
            <AdZone size="in-article" className="mb-8" />

            {/* Body */}
            <ArticleBody content={article.body} />

            {/* Bottom Ad */}
            <AdZone size="in-article" className="mt-8" />

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-gw-border">
              <ShareButtons title={article.title} slug={article.slug} />
            </div>

            {/* Related */}
            {related.length > 0 && (
              <section className="mt-10">
                <h3 className="text-sm font-mono uppercase tracking-wider text-gw-tx-3 mb-4">
                  Related Intelligence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {related.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AdZone size="sidebar" className="mx-auto" />
            <div className="card rounded-lg p-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gw-tx-3 mb-3">
                Latest Reports
              </h3>
              {MOCK_ARTICLES.filter((a) => a.id !== article.id)
                .slice(0, 5)
                .map((a) => (
                  <ArticleCard key={a.id} article={a} variant="compact" />
                ))}
            </div>
            <AdZone size="sidebar" className="mx-auto" />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  )
}
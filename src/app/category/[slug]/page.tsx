import type { Metadata } from 'next';
import Link from 'next/link';
import { SEED_ARTICLES } from '@/lib/articles';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import AdZone from '@/components/AdZone';
import Footer from '@/components/Footer';

const CATEGORY_LABELS: Record<string, string> = {
  'iran-war': 'Iran War',
  'energy': 'Global Energy',
  'us-china': 'US–China / Taiwan',
  'russia-ukraine': 'Russia–Ukraine',
  'markets': 'Markets',
  'sanctions': 'Sanctions',
  'mena': 'Middle East & North Africa',
  'asia-pacific': 'Asia Pacific',
  'africa': 'Africa',
  'americas': 'Americas',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'iran-war': 'Live coverage of Operation Epic Fury: US–Iran conflict, IRGC strikes, Hormuz blockade, coalition operations, and casualty reports.',
  'energy': 'Oil market disruption, Brent crude price analysis, Hormuz Strait closure impacts, and global energy supply tracking.',
  'us-china': 'US–China strategic competition, Taiwan Strait tensions, PRC opportunism during Iran crisis, and Indo-Pacific security.',
  'russia-ukraine': 'Russia–Ukraine war developments, NATO responses, and how the Iran conflict reshapes European security.',
  'markets': 'Financial market impacts of the US–Iran war: oil, gold, equities, and currency moves.',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug] || slug.replace(/-/g, ' ');
  const description = CATEGORY_DESCRIPTIONS[slug] || `GeoWire intelligence coverage of ${label}: conflict analysis, economic impacts, and strategic developments.`;

  return {
    title: `${label} — Coverage`,
    description,
    keywords: [label.toLowerCase(), 'geopolitical intelligence', 'conflict analysis', 'geowire'],
    openGraph: {
      title: `${label} — GeoWire`,
      description,
      url: `https://geowire.org/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug] || slug?.replace(/-/g, ' ').toUpperCase();
  const articles = SEED_ARTICLES.filter((a) => a.category === slug);

  return (
    <div className="min-h-screen bg-bg-0">
      <MarketTicker />
      <Header />
      <Navigation />

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 pt-6">
        <AdZone size="leaderboard" className="mb-6" />

        {/* Page Header */}
        <div className="mb-8 pb-4 border-b border-border-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-accent-red text-sm">▲</span>
            <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">Coverage Zone</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-tx-0 mb-2">{label}</h1>
          <p className="text-tx-2 text-sm font-mono">
            {articles.length} {articles.length === 1 ? 'report' : 'reports'} · Updated continuously
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Articles */}
          <div className="space-y-8">
            {articles.length === 0 ? (
              <div className="text-center py-20">
                <div className="font-mono text-tx-3 text-sm mb-4">NO REPORTS YET</div>
                <p className="text-tx-2 text-sm">Coverage for this region is coming soon.</p>
                <Link href="/" className="mt-6 inline-block text-accent-gold hover:underline font-mono text-xs">
                  ← Back to Home
                </Link>
              </div>
            ) : (
              <>
                {articles[0] && (
                  <section>
                    <ArticleCard article={articles[0]} variant="hero" />
                  </section>
                )}
                {articles.length > 1 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase">More Reports</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {articles.slice(1).map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}

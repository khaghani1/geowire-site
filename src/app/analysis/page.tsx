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

export const metadata: Metadata = {
  title: 'Analysis — Intelligence Briefings',
  description: 'In-depth intelligence analysis on Operation Epic Fury and global conflict. Expert breakdowns of military operations, economic impacts, and geopolitical shifts.',
  keywords: ['iran war analysis', 'intelligence briefing', 'geopolitical analysis', 'conflict report', 'us iran'],
  openGraph: {
    title: 'Analysis — GeoWire Intelligence',
    description: 'Deep-dive analysis on the US–Iran conflict, energy markets, and global security.',
    url: 'https://geowire.org/analysis',
  },
};

export default function AnalysisPage() {
  const analysisArticles = SEED_ARTICLES;

  return (
    <div className="min-h-screen bg-bg-0">
      <MarketTicker />
      <Header />
      <Navigation />

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 pt-6">
        <AdZone size="leaderboard" className="mb-6" />

        {/* Page Header */}
        <div className="mb-8 pb-4 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-accent-red text-sm">▲</span>
            <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">Intelligence Briefings</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-tx-0 mb-2">Analysis</h1>
          <p className="text-tx-2 text-sm font-mono">
            {analysisArticles.length} {analysisArticles.length === 1 ? 'report' : 'reports'} · Strategic analysis updated daily
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Articles */}
          <div className="space-y-8">
            {analysisArticles.length === 0 ? (
              <div className="text-center py-20">
                <div className="font-mono text-tx-3 text-sm mb-4">NO REPORTS YET</div>
                <Link href="/" className="mt-2 inline-block text-accent-gold hover:underline font-mono text-xs">
                  ← Back to Home
                </Link>
              </div>
            ) : (
              <>
                {/* Hero article */}
                {analysisArticles[0] && (
                  <section>
                    <ArticleCard article={analysisArticles[0]} variant="hero" />
                  </section>
                )}

                {/* Rest of articles */}
                {analysisArticles.length > 1 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase">All Briefings</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {analysisArticles.slice(1).map((article) => (
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

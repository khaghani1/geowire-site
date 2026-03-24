'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { SEED_ARTICLES } from '@/lib/articles';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import AdZone from '@/components/AdZone';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = SEED_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-bg-0">
        <MarketTicker />
        <Header />
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="font-display text-3xl text-tx-0 mb-4">Article Not Found</h1>
          <p className="text-tx-2 mb-8">The article you are looking for does not exist.</p>
          <Link href="/" className="text-accent-gold hover:underline font-mono text-sm">← Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const related = SEED_ARTICLES.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 3);
  const shareUrl = `https://geowire.org/article/${slug}`;
  const shareText = `${article.title} — GeoWire`;

  // Simple markdown-ish rendering
  const renderBody = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      if (para.startsWith('## ')) {
        return <h2 key={i} className="font-display text-2xl text-tx-0 mt-10 mb-4">{para.replace('## ', '')}</h2>;
      }
      if (para.startsWith('**') && para.endsWith('**')) {
        return <p key={i} className="text-tx-0 font-semibold text-lg mb-4">{para.replace(/**/g, '')}</p>;
      }
      if (para.startsWith('**')) {
        const parts = para.split(/**/g);
        return (
          <p key={i} className="text-tx-1 leading-relaxed mb-4">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-tx-0">{part}</strong> : part)}
          </p>
        );
      }
      if (para.startsWith('- ')) {
        const items = para.split('\n').filter(l => l.startsWith('- '));
        return (
          <ul key={i} className="space-y-2 mb-4 ml-4">
            {items.map((item, j) => (
              <li key={j} className="text-tx-1 leading-relaxed flex items-start gap-2">
                <span className="text-accent-gold mt-1.5">•</span>
                {item.replace('- ', '')}
              </li>
            ))}
          </ul>
        );
      }
      return <p key={i} className="text-tx-1 leading-relaxed mb-4">{para}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-bg-0">
      <MarketTicker />
      <Header />
      <Navigation />

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 py-8">
        <AdZone size="leaderboard" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Article Content */}
          <article className="max-w-3xl">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono text-[10px] tracking-widest uppercase text-accent-gold">{article.category.replace('-', ' ')}</span>
              {article.tags.map((tag) => (
                <span key={tag} className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded ${
                  tag === 'breaking' || tag === 'critical' ? 'bg-accent-red/15 text-accent-red'
                  : tag === 'exclusive' ? 'bg-accent-gold/15 text-accent-gold'
                  : 'bg-bg-4 text-tx-2'
                }`}>{tag}</span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-tx-0 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-tx-3 font-mono text-xs mb-6 pb-6 border-b border-border">
              <span>{article.author}</span>
              <span>·</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
            </div>

            {/* Share bar */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="font-mono text-[10px] text-tx-3 mr-2">SHARE:</span>
              <a href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="text-tx-2 hover:text-tx-0 font-mono text-xs border border-border rounded px-3 py-1 hover:border-border-hover">X</a>
              <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank" rel="noopener noreferrer"
                className="text-tx-2 hover:text-tx-0 font-mono text-xs border border-border rounded px-3 py-1 hover:border-border-hover">Telegram</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="text-tx-2 hover:text-tx-0 font-mono text-xs border border-border rounded px-3 py-1 hover:border-border-hover">LinkedIn</a>
              <button onClick={() => navigator.clipboard?.writeText(shareUrl)}
                className="text-tx-2 hover:text-tx-0 font-mono text-xs border border-border rounded px-3 py-1 hover:border-border-hover">Copy Link</button>
            </div>

            {/* Key Takeaways */}
            {article.keyTakeaways.length > 0 && (
              <div className="bg-bg-2 border border-accent-gold/20 rounded-xl p-6 mb-8">
                <h3 className="font-mono text-[11px] tracking-widest text-accent-gold uppercase mb-4">KEY TAKEAWAYS</h3>
                <div className="space-y-3">
                  {article.keyTakeaways.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-tx-1 leading-relaxed">
                      <span className="text-accent-gold font-mono text-xs mt-0.5">{i + 1}.</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Body */}
            <div className="prose-geowire">
              {renderBody(article.body)}
            </div>

            <AdZone size="in-article" className="my-8" />

            {/* Newsletter CTA */}
            <div className="bg-bg-2 border border-accent-gold/20 rounded-xl p-6 my-8 text-center">
              <h3 className="font-display text-xl text-tx-0 mb-2">Stay Informed</h3>
              <p className="text-tx-2 text-sm mb-4">Get GeoWire intelligence delivered daily. No spam. Unsubscribe anytime.</p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input type="email" placeholder="your@email.com"
                  className="flex-1 bg-bg-1 border border-border rounded px-3 py-2 text-sm text-tx-0 placeholder:text-tx-3 focus:border-accent-gold outline-none" />
                <button className="bg-accent-gold text-bg-0 px-4 py-2 rounded text-sm font-semibold hover:bg-accent-gold/90">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="mt-10">
                <h3 className="font-mono text-xs text-tx-3 uppercase tracking-wider mb-4">RELATED ANALYSIS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((a) => (
                    <Link key={a.slug} href={`/article/${a.slug}`} className="block group">
                      <div className="bg-bg-2 border border-border rounded-lg p-4 hover:border-border-hover transition-colors h-full">
                        <span className="font-mono text-[9px] text-accent-gold uppercase">{a.category.replace('-', ' ')}</span>
                        <h4 className="font-display text-sm text-tx-0 mt-2 leading-snug group-hover:text-accent-gold transition-colors">{a.title}</h4>
                        <span className="font-mono text-[10px] text-tx-3 mt-2 block">{a.readTime} min read</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}

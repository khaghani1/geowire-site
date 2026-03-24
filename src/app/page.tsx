'use client';

import { getWarDay } from '@/lib/constants';
import { SEED_ARTICLES } from '@/lib/articles';
import MarketTicker from '@/components/MarketTicker';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import HotspotCard from '@/components/HotspotCard';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import AdZone from '@/components/AdZone';
import Footer from '@/components/Footer';

const HOTSPOTS = [
  { region: 'IRAN WAR', headline: 'Operation Epic Fury Day ' + String(getWarDay()) + ': sustained air campaign, Hormuz blockade continues', threatLevel: 'critical' as const, timeAgo: '1h ago', dayCount: getWarDay() },
  { region: 'GLOBAL ENERGY', headline: 'Largest oil supply disruption in history; Brent above $100, SPR releases underway', threatLevel: 'critical' as const, timeAgo: '2h ago' },
  { region: 'RUSSIA-UKRAINE', headline: 'Spring offensive preparations; NATO readiness elevated amid Iran distraction', threatLevel: 'elevated' as const, timeAgo: '4h ago', dayCount: 387 },
  { region: 'US-CHINA / TAIWAN', headline: 'Beijing profits from Iran crisis; expanded military drills near Taiwan', threatLevel: 'moderate' as const, timeAgo: '6h ago', dayCount: 45 },
];

export default function Home() {
  const hero = SEED_ARTICLES.find((a) => a.isHero);
  const articles = SEED_ARTICLES.filter((a) => !a.isHero);

  return (
    <div className="min-h-screen bg-bg-0">
      <MarketTicker />
      <Header />
      <Navigation />

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 pt-6">
        <AdZone size="leaderboard" className="mb-6" />

        {/* Hotspot Cards */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent-red text-sm">⚠</span>
            <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase">THREAT MONITOR</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {HOTSPOTS.map((h) => (
              <HotspotCard key={h.region} {...h} />
            ))}
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Left: Articles */}
          <div className="space-y-8">
            {/* Hero Article */}
            {hero && (
              <section>
                <div className="font-mono text-[10px] tracking-widest text-tx-3 uppercase mb-4 text-center">
                  LATEST INTELLIGENCE — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
                </div>
                <ArticleCard article={hero} variant="hero" />
              </section>
            )}

            <AdZone size="in-article" />

            {/* Article Grid */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {articles.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} index={i} />
                ))}
              </div>
            </section>

            <AdZone size="in-article" />

            {/* Multi-language Preview */}
            <section>
              <h2 className="font-mono text-xs tracking-widest text-tx-2 uppercase mb-4">MULTILINGUAL COVERAGE</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { lang: 'فارسی', flag: '🇮🇷', title: 'جنگی که هیچ‌کس برنامه‌ریزی نکرده بود', dir: 'rtl', font: 'font-arabic' },
                  { lang: 'العربية', flag: '🇸🇦', title: 'الحرب التي لم يخطط لها أحد', dir: 'rtl', font: 'font-arabic' },
                  { lang: 'Türkçe', flag: '🇹🇷', title: 'Kimsenin Planlamadığı Savaş', dir: 'ltr', font: 'font-body' },
                  { lang: 'Español', flag: '🇪🇸', title: 'La Guerra que Nadie Planeó', dir: 'ltr', font: 'font-body' },
                ].map((item) => (
                  <div key={item.lang} className="bg-bg-2 border border-border rounded-lg p-4 hover:border-border-hover transition-colors cursor-pointer" dir={item.dir as any}>
                    <div className="flex items-center gap-2 mb-2">
                      <span>{item.flag}</span>
                      <span className="font-mono text-[10px] text-tx-3 uppercase">{item.lang}</span>
                    </div>
                    <p className={`${item.font} text-tx-1 text-sm leading-snug`}>{item.title}</p>
                    <span className="font-mono text-[9px] text-accent-gold mt-2 inline-block">Coming soon →</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Sidebar */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from 'next';
import MarketTicker from '@/components/MarketTicker';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import AdZone from '@/components/AdZone';
import Footer from '@/components/Footer';
import PowerMap from '@/components/PowerMap';

export const metadata: Metadata = {
  title: 'Power Map — Alliances & Actors',
  description: 'Track every state actor, proxy force, and diplomatic player in Operation Epic Fury. Coalition blocs, strategic resources, and UNSC alignment.',
  keywords: ['power map', 'iran war alliances', 'us coalition', 'axis of resistance', 'irgc', 'hezbollah', 'geopolitical actors'],
  openGraph: {
    title: 'Power Map — GeoWire',
    description: 'Every actor in the US–Iran conflict: coalition blocs, proxy forces, strategic resources, and diplomatic positions.',
    url: 'https://geowire.org/powermap',
  },
};

export default function PowerMapPage() {
  return (
    <div className="min-h-screen bg-bg-0">
      <MarketTicker />
      <Header />
      <Navigation />

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 pt-6">
        <AdZone size="leaderboard" className="mb-6" />

        <div className="mb-8">
          <div className="font-mono text-[10px] tracking-widest text-accent-red uppercase mb-2">
            ▲ GEOPOLITICAL STRUCTURE
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-tx-0 mb-3">Power Map</h1>
          <p className="text-tx-2 text-sm max-w-2xl leading-relaxed">
            Every state actor, proxy force, and diplomatic player shaping Operation Epic Fury.
            Click any actor to expand capabilities and intelligence notes.
          </p>
        </div>

        <PowerMap />

        <AdZone size="leaderboard" className="mt-8" />
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from 'next';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import NarrativeWar from '@/components/NarrativeWar';
import AdZone from '@/components/AdZone';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Narrative War — Information Operations',
  description: 'Track how Operation Epic Fury is being told across 6 global narratives. US/Western, Iranian, Russian, Chinese, Arab, and Global South framings with disinformation tracker.',
  keywords: ['narrative war', 'information operations', 'iran propaganda', 'us iran media', 'disinformation tracker', 'info ops'],
  openGraph: {
    title: 'Narrative War — GeoWire',
    description: 'Six competing narratives on Operation Epic Fury. Who is saying what, and why it matters.',
    url: 'https://geowire.org/narrative-war',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narrative War — GeoWire',
    description: 'Six competing narratives on Operation Epic Fury. Who is saying what, and why it matters.',
  },
};

export default function NarrativeWarPage() {
  return (
    <div className="min-h-screen bg-bg-0">
      <MarketTicker />
      <Header />
      <Navigation />

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 pt-6">
        <AdZone size="leaderboard" className="mb-6" />

        <div className="mb-8 pb-4 border-b border-border-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-accent-red text-sm">▲</span>
            <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">Information War</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-tx-0 mb-2">Narrative War</h1>
          <p className="text-tx-2 text-sm max-w-2xl">
            Every conflict has multiple truths. Track how Operation Epic Fury is being told — and by whom — across the global information environment.
          </p>
        </div>

        <NarrativeWar />
      </main>

      <Footer />
    </div>
  );
}

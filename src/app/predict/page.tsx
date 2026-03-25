import type { Metadata } from 'next';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import Scenarios from '@/components/Scenarios';
import AdZone from '@/components/AdZone';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Predict — Conflict Scenario Modeling',
  description: 'Interactive scenario modeling for the US–Iran conflict. Adjust conflict parameters to explore outcomes: ceasefire, escalation, regional war, and nuclear threshold scenarios.',
  keywords: ['iran war scenarios', 'conflict prediction', 'geopolitical forecast', 'war outcome modeling', 'iran nuclear'],
  openGraph: {
    title: 'Predict — GeoWire Scenario Modeling',
    description: 'Model the possible outcomes of Operation Epic Fury. Ceasefire, escalation, and beyond.',
    url: 'https://geowire.org/predict',
  },
};

export default function PredictPage() {
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
            <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">Scenario Modeling</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-tx-0 mb-2">Predict</h1>
          <p className="text-tx-2 text-sm">
            Interactive scenario modeling for the US–Iran conflict. Adjust parameters to explore outcomes.
          </p>
        </div>

        <Scenarios />
      </main>

      <Footer />
    </div>
  );
}

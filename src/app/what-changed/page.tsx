import type { Metadata } from 'next';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import WhatChanged from '@/components/WhatChanged';
import AdZone from '@/components/AdZone';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'What Changed — 24-Hour Intelligence Delta',
  description: 'The 24-hour intelligence delta for Operation Epic Fury. Military, economic, diplomatic, humanitarian and political updates with market impact tracking.',
  keywords: ['what changed', 'iran war updates', 'daily intelligence briefing', 'war news today', 'geopolitical updates'],
  openGraph: {
    title: 'What Changed — GeoWire',
    description: 'Everything that moved in the last 24 hours: military ops, diplomatic signals, market shocks.',
    url: 'https://geowire.org/what-changed',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Changed — GeoWire',
    description: 'Everything that moved in the last 24 hours: military ops, diplomatic signals, market shocks.',
  },
};

export default function WhatChangedPage() {
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
            <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">24-Hour Delta</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-tx-0 mb-2">What Changed</h1>
          <p className="text-tx-2 text-sm max-w-2xl">
            The 24-hour intelligence delta — what moved, what shifted, and what it means for Operation Epic Fury.
          </p>
        </div>

        <WhatChanged />
      </main>

      <Footer />
    </div>
  );
}

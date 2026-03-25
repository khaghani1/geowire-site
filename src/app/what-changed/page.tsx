'use client';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import WhatChanged from '@/components/WhatChanged';
import AdZone from '@/components/AdZone';
import Footer from '@/components/Footer';

export default function WhatChangedPage() {
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
            <span className="font-mono text-xs tracking-widest text-tx-2 uppercase">24-Hour Delta</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-tx-0 mb-2">What Changed</h1>
          <p className="text-tx-2 text-sm">
            The 24-hour intelligence delta — what moved, what shifted, and what it means for Operation Epic Fury.
          </p>
        </div>

        <WhatChanged />
      </main>

      <Footer />
    </div>
  );
}

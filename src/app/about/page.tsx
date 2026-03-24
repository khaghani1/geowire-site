'use client';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-0">
      <MarketTicker />
      <Header />
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl sm:text-4xl text-tx-0 mb-6">About GeoWire</h1>

        <div className="space-y-6 text-tx-1 leading-relaxed">
          <p className="text-lg">
            GeoWire is an independent global intelligence platform providing real-time geopolitical analysis,
            economic impact tracking, and conflict monitoring. Our mission is to make the kind of analysis
            typically reserved for government briefing rooms accessible to everyone.
          </p>

          <h2 className="font-display text-2xl text-tx-0 mt-10">What We Cover</h2>
          <p>
            We track armed conflicts, energy markets, sanctions regimes, great power competition, and their
            intersecting economic impacts. Our primary coverage areas include the Middle East, US-China relations,
            Russia-Ukraine, energy security, and global financial markets.
          </p>

          <h2 className="font-display text-2xl text-tx-0 mt-10">Our Approach</h2>
          <p>
            GeoWire combines real-time data from 27+ sources with editorial analysis from experienced geopolitical
            researchers. We believe in data-driven intelligence: every claim is grounded in verifiable information,
            every assessment includes confidence levels, and every analysis acknowledges uncertainty.
          </p>

          <h2 className="font-display text-2xl text-tx-0 mt-10">Data Sources</h2>
          <p>Our analysis draws on the following public and open-source data:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {[
              'FRED (Federal Reserve)',
              'EIA (Energy Information)',
              'ACLED (Armed Conflict)',
              'GDELT (Global Events)',
              'NASA FIRMS (Satellite)',
              'OpenSanctions',
              'CoinGecko (Crypto)',
              'Yahoo Finance',
              'ReliefWeb (UN)',
            ].map((source) => (
              <div key={source} className="bg-bg-2 border border-border rounded px-3 py-2 text-sm font-mono text-tx-2">
                {source}
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-tx-0 mt-10">The GeoWire Analysis Desk</h2>
          <p>
            Our analysis is produced by the GeoWire Analysis Desk — a team dedicated to providing rigorous,
            independent geopolitical intelligence. We maintain strict editorial independence and are not
            affiliated with any government, military, or political organization.
          </p>

          <h2 className="font-display text-2xl text-tx-0 mt-10">Contact</h2>
          <div className="space-y-2">
            <p>Follow us on <a href="https://x.com/Geowire_org" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">X / Twitter</a></p>
            <p>General inquiries: <span className="text-accent-gold">contact@geowire.org</span></p>
          </div>

          <div className="mt-12 pt-6 border-t border-border text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="gw-gradient w-8 h-8 rounded flex items-center justify-center">
                <span className="text-bg-0 font-display font-bold text-sm">GW</span>
              </div>
              <span className="font-display text-lg text-tx-0">GeoWire</span>
            </div>
            <p className="font-mono text-xs text-tx-3">
              A GeoWire Media publication &middot; Chicago, IL<br />
              Independent global intelligence for everyone
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from 'next'
import Header from '@/components/Header'
import MarketTicker from '@/components/MarketTicker'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About GeoWire',
  description:
    'GeoWire delivers Bloomberg-grade geopolitical intelligence and crisis monitoring to a global audience in six languages.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <MarketTicker />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-display text-gw-tx-0 mb-6">
          About <span className="text-gw-gold">GeoWire</span>
        </h1>

        <div className="space-y-6 text-gw-tx-1 leading-relaxed">
          <p>
            GeoWire is a next-generation intelligence platform delivering
            Bloomberg-grade geopolitical analysis, crisis monitoring, and market
            impact assessment to a global audience.
          </p>

          <p>
            In an era of accelerating geopolitical volatility — from great-power
            competition to energy supply shocks and regional conflicts — access
            to timely, accurate, and actionable intelligence has never been more
            critical.
          </p>

          <h2 className="text-xl font-display text-gw-tx-0 mt-8 mb-3">
            Our Mission
          </h2>
          <p>
            We believe geopolitical intelligence should be accessible, not
            gatekept. GeoWire combines real-time data from authoritative sources
            — FRED, CoinGecko, LBMA, and more — with expert analysis to
            deliver insights that matter.
          </p>

          <h2 className="text-xl font-display text-gw-tx-0 mt-8 mb-3">
            Six Languages, One Standard
          </h2>
          <p>
            The world's crises don't respect language barriers. GeoWire
            publishes in English, Farsi, Arabic, Turkish, Spanish, and Chinese —
            ensuring critical intelligence reaches the communities most affected
            by global events.
          </p>

          <h2 className="text-xl font-display text-gw-tx-0 mt-8 mb-3">
            What We Cover
          </h2>
          <p>
            Our coverage spans active conflicts, sanctions and trade policy,
            energy markets, elections, and emerging security threats across every
            region. The Crisis Dashboard provides real-time threat assessment
            with market impact correlation.
          </p>

          <h2 className="text-xl font-display text-gw-tx-0 mt-8 mb-3">
            Intelligence Without Agenda
          </h2>
          <p>
            GeoWire is committed to factual, source-driven reporting. We
            present verified information and clearly delineate between
            established facts and analytical assessment.
          </p>

          <div className="mt-10 pt-6 border-t border-gw-border">
            <p className="text-sm text-gw-tx-3 font-mono">
              Contact: intel@geowire.org
            </p>
            <p className="text-sm text-gw-tx-3 font-mono mt-1">
              &copy; {new Date().getFullYear()} GeoWire Media. All rights
              reserved.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
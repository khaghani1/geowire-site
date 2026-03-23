import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gw-border bg-gw-bg-1 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-display font-bold">
              Geo<span className="text-gw-gold">Wire</span>
            </Link>
            <p className="mt-3 text-sm text-gw-tx-2 leading-relaxed">
              Bloomberg-grade geopolitical intelligence. Real-time crisis
              monitoring, market analysis, and strategic assessment.
            </p>
            <p className="mt-4 text-xs text-gw-tx-3 font-mono">
              &copy; {new Date().getFullYear()} GeoWire Media
            </p>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-xs font-mono text-gw-tx-3 uppercase tracking-wider mb-3">
              Coverage
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/category/iran-war', label: 'Iran War' },
                { href: '/category/energy', label: 'Energy' },
                { href: '/category/us-china', label: 'US-China' },
                { href: '/category/russia-ukraine', label: 'Russia-Ukraine' },
                { href: '/category/markets', label: 'Markets' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gw-tx-2 hover:text-gw-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-gw-tx-3 uppercase tracking-wider mb-3">
              Regions
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/category/mena', label: 'MENA' },
                { href: '/category/asia-pacific', label: 'Asia-Pacific' },
                { href: '/category/africa', label: 'Africa' },
                { href: '/category/americas', label: 'Americas' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gw-tx-2 hover:text-gw-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-gw-tx-3 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/dashboard', label: 'Crisis Dashboard' },
                { href: '/about', label: 'About GeoWire' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gw-tx-2 hover:text-gw-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gw-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gw-tx-3 font-mono">
            Intelligence you can trust. Analysis without agenda.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-gw-tx-3 font-mono">
              Data: FRED · CoinGecko · LBMA · ICE
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
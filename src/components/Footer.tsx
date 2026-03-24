'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-1 border-t border-border mt-12">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Regions */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-tx-3 uppercase mb-4">Regions</h4>
            <div className="space-y-2">
              {['Middle East', 'Asia-Pacific', 'Europe', 'Africa', 'Americas'].map((r) => (
                <Link key={r} href={`/category/${r.toLowerCase().replace(/\s/g, '-')}`} className="block text-sm text-tx-2 hover:text-tx-0">{r}</Link>
              ))}
            </div>
          </div>
          {/* Topics */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-tx-3 uppercase mb-4">Topics</h4>
            <div className="space-y-2">
              {['Iran War', 'Energy', 'Markets', 'Sanctions', 'US-China'].map((t) => (
                <Link key={t} href={`/category/${t.toLowerCase().replace(/\s/g, '-')}`} className="block text-sm text-tx-2 hover:text-tx-0">{t}</Link>
              ))}
            </div>
          </div>
          {/* Tools */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-tx-3 uppercase mb-4">Tools</h4>
            <div className="space-y-2">
              <Link href="/globe" className="block text-sm text-tx-2 hover:text-tx-0">3D Globe</Link>
              <Link href="/dashboard" className="block text-sm text-tx-2 hover:text-tx-0">Dashboard</Link>
              <Link href="/cost" className="block text-sm text-tx-2 hover:text-tx-0">War Cost Calculator</Link>
              <Link href="/predict" className="block text-sm text-tx-2 hover:text-tx-0">Predict the War</Link>
              <Link href="/map" className="block text-sm text-tx-2 hover:text-tx-0">War Map</Link>
            </div>
          </div>
          {/* Languages */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-tx-3 uppercase mb-4">Languages</h4>
            <div className="space-y-2">
              {['English', 'فارسی', 'العربية', 'Türkçe', 'Español', '中文'].map((l) => (
                <span key={l} className="block text-sm text-tx-2">{l}</span>
              ))}
            </div>
          </div>
          {/* Connect */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-tx-3 uppercase mb-4">Connect</h4>
            <div className="space-y-2">
              <a href="https://x.com/Geowire_org" target="_blank" rel="noopener noreferrer" className="block text-sm text-tx-2 hover:text-tx-0">X / Twitter</a>
              <a href="#" className="block text-sm text-tx-2 hover:text-tx-0">Telegram</a>
              <a href="#" className="block text-sm text-tx-2 hover:text-tx-0">LinkedIn</a>
              <a href="#" className="block text-sm text-tx-2 hover:text-tx-0">RSS Feed</a>
              <Link href="/about" className="block text-sm text-tx-2 hover:text-tx-0">About</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="gw-gradient w-6 h-6 rounded flex items-center justify-center">
              <span className="text-bg-0 font-display font-bold text-xs">GW</span>
            </div>
            <span className="font-mono text-[10px] text-tx-3">
              A GeoWire Media publication
            </span>
          </div>
          <div className="font-mono text-[10px] text-tx-3 text-center sm:text-right">
            &copy; {new Date().getFullYear()} GeoWire Media &middot; Chicago, IL &middot; Independent global intelligence
          </div>
        </div>

        {/* Disclaimers */}
        <div className="mt-6 font-mono text-[9px] text-tx-3/60 leading-relaxed text-center max-w-3xl mx-auto">
          GeoWire provides analysis and commentary for informational purposes only. Nothing on this site constitutes investment advice,
          legal counsel, or an official government position. All data is sourced from public APIs and open-source intelligence.
          Not affiliated with any government or military organization.
        </div>
      </div>
    </footer>
  );
}

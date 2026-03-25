'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getWarDay, LANGUAGES } from '@/lib/constants';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/globe', label: 'War Map' },
  { href: '/cost', label: 'Cost Calculator' },
  { href: '/what-changed', label: 'What Changed' },
  { href: '/narrative-war', label: 'Narrative War' },
  { href: '/category/iran-war', label: 'Iran War' },
  { href: '/category/energy', label: 'Energy' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [time, setTime] = useState('');
  const [warDay, setWarDay] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
      setWarDay(getWarDay());
    }
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <header className="bg-bg-1 border-b border-border sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="gw-gradient w-9 h-9 rounded-md flex items-center justify-center">
              <span className="text-bg-0 font-display font-bold text-lg leading-none">GW</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl text-tx-0 leading-tight tracking-tight">GeoWire</span>
              <span className="text-[10px] font-mono text-tx-3 tracking-widest uppercase hidden sm:block">Global Intelligence</span>
            </div>
          </Link>
          {/* Live indicator */}
          <div className="hidden md:flex items-center gap-2 bg-accent-red/10 border border-accent-red/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-red live-dot" />
            <span className="font-mono text-xs text-accent-red font-semibold tracking-wider">
              LIVE — IRAN WAR DAY {warDay}
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-tx-2 hover:text-tx-0 transition-colors rounded hover:bg-bg-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Language + Time + Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-tx-2 hover:text-tx-0 font-mono text-xs border border-border rounded px-2 py-1"
            >
              EN <span className="text-tx-3">&#9660;</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-bg-2 border border-border rounded shadow-xl z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className="block w-full text-left px-4 py-2 text-sm text-tx-1 hover:bg-bg-3 hover:text-tx-0 font-mono"
                    onClick={() => setLangOpen(false)}
                  >
                    {lang.label} <span className="text-tx-3 ml-2">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time */}
          <div className="hidden sm:block font-mono text-xs text-tx-2">
            {time}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 text-tx-2 hover:text-tx-0"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Live indicator */}
      <div className="md:hidden flex items-center justify-center gap-2 bg-accent-red/10 border-t border-accent-red/30 px-4 py-1.5">
        <span className="w-2 h-2 rounded-full bg-accent-red live-dot" />
        <span className="font-mono text-xs text-accent-red font-semibold tracking-wider">
          LIVE — IRAN WAR DAY {warDay}
        </span>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-bg-1 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm text-tx-1 hover:text-tx-0 hover:bg-bg-2 rounded transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

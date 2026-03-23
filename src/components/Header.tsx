'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LANGUAGES, Language } from '@/lib/types'

export default function Header() {
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const currentLang: Language = 'en'

  return (
    <header className="sticky top-0 z-50 bg-gw-bg-0/95 backdrop-blur-md border-b border-gw-border">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo + Live */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold tracking-tight text-gw-tx-0">
              Geo<span className="text-gw-gold">Wire</span>
            </span>
          </Link>
          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-gw-red/15 border border-gw-red/30 rounded text-[11px] font-mono text-gw-red uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-gw-red rounded-full animate-pulse-live" />
            Live
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: '/', label: 'Home' },
            { href: '/dashboard', label: 'Crisis Dashboard' },
            { href: '/category/iran-war', label: 'Iran War' },
            { href: '/category/energy', label: 'Energy' },
            { href: '/category/markets', label: 'Markets' },
            { href: '/about', label: 'About' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-gw-tx-2 hover:text-gw-tx-0 transition-colors rounded hover:bg-gw-bg-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Language + Mobile toggle */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-gw-tx-2 hover:text-gw-tx-0 border border-gw-border rounded hover:bg-gw-bg-2 transition-colors"
            >
              {LANGUAGES[currentLang].nativeLabel}
              <svg
                className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-gw-bg-1 border border-gw-border rounded-lg shadow-xl overflow-hidden z-50">
                {(Object.keys(LANGUAGES) as Language[]).map((code) => (
                  <Link
                    key={code}
                    href={code === 'en' ? '/' : `/${code}`}
                    onClick={() => setLangOpen(false)}
                    className={`block px-3 py-2 text-sm hover:bg-gw-bg-2 transition-colors ${
                      code === currentLang ? 'text-gw-gold' : 'text-gw-tx-1'
                    }`}
                  >
                    <span className="font-mono text-xs text-gw-tx-3 mr-2">
                      {code.toUpperCase()}
                    </span>
                    {LANGUAGES[code].nativeLabel}
                    <span className="text-gw-tx-3 ml-1 text-xs">
                      {LANGUAGES[code].label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-gw-tx-2 hover:text-gw-tx-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gw-border bg-gw-bg-1 px-4 py-3 space-y-1">
          {[
            { href: '/', label: 'Home' },
            { href: '/dashboard', label: 'Crisis Dashboard' },
            { href: '/category/iran-war', label: 'Iran War' },
            { href: '/category/energy', label: 'Energy' },
            { href: '/category/markets', label: 'Markets' },
            { href: '/about', label: 'About' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-gw-tx-1 hover:text-gw-tx-0 hover:bg-gw-bg-2 rounded transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'GeoWire \u2014 Global Intelligence Brief',
    template: '%s | GeoWire',
  },
  description:
    'Real-time geopolitical intelligence, market analysis, and crisis monitoring. Bloomberg-grade insights for a world on edge.',
  keywords: [
    'geopolitics',
    'intelligence',
    'iran',
    'market analysis',
    'crisis monitoring',
    'sanctions',
    'global affairs',
  ],
  metadataBase: new URL('https://geowire.org'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://geowire.org',
    siteName: 'GeoWire',
    title: 'GeoWire \u2014 Global Intelligence Brief',
    description:
      'Real-time geopolitical intelligence, market analysis, and crisis monitoring.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GeoWire \u2014 Global Intelligence Brief',
    description:
      'Real-time geopolitical intelligence, market analysis, and crisis monitoring.',
  },
  robots: { index: true, follow: true },
  alternates: {
    languages: {
      en: 'https://geowire.org',
      fa: 'https://geowire.org/fa',
      ar: 'https://geowire.org/ar',
      tr: 'https://geowire.org/tr',
      es: 'https://geowire.org/es',
      zh: 'https://geowire.org/zh',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-gw-bg-0 text-gw-tx-0 font-sans">
        {children}
      </body>
    </html>
  )
}
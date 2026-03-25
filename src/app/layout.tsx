import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

// Google AdSense Publisher ID — update after AdSense approval
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

export const metadata: Metadata = {
  title: {
    default: 'GeoWire — Global Intelligence Platform',
    template: '%s — GeoWire',
  },
  description: 'Real-time geopolitical intelligence, conflict analysis, and economic impact tracking. Independent analysis for a complex world.',
  keywords: ['geopolitical intelligence', 'iran war', 'conflict analysis', 'oil prices', 'global security'],
  authors: [{ name: 'GeoWire Analysis Desk' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://geowire.org',
    siteName: 'GeoWire',
    title: 'GeoWire — Global Intelligence Platform',
    description: 'Real-time geopolitical intelligence, conflict analysis, and economic impact tracking.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Geowire_org',
    title: 'GeoWire — Global Intelligence Platform',
    description: 'Real-time geopolitical intelligence and conflict analysis.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#08080a" />
        {ADSENSE_PUBLISHER_ID && (
          <meta name="google-adsense-account" content={ADSENSE_PUBLISHER_ID} />
        )}
      </head>
      <body className="bg-bg-0 text-tx-0 font-body">
        {children}
        {ADSENSE_PUBLISHER_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
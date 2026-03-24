import type { Metadata } from 'next';
import './globals.css';

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
      </head>
      <body className="bg-bg-0 text-tx-0 font-body">
        {children}
      </body>
    </html>
  );
}
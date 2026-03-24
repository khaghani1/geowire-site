import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GeoWire — Global Intelligence Platform',
  description: 'Real-time economic cascading effects tracking for geopolitical crises',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg-primary antialiased">{children}</body>
    </html>
  );
}

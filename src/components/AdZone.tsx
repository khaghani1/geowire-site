'use client';

import { useEffect } from 'react';

interface AdZoneProps {
  size: 'leaderboard' | 'sidebar' | 'in-article' | 'sticky-mobile';
  slot?: string;
  className?: string;
}

const SIZES = {
  leaderboard: { w: '728px', h: '90px', label: 'AD — 728×90' },
  sidebar: { w: '300px', h: '250px', label: 'AD — 300×250' },
  'in-article': { w: '100%', h: '120px', label: 'AD — RESPONSIVE' },
  'sticky-mobile': { w: '100%', h: '50px', label: 'AD — MOBILE' },
};

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

export default function AdZone({ size, slot, className = '' }: AdZoneProps) {
  const s = SIZES[size];

  useEffect(() => {
    if (PUB_ID && slot) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // ignore adsbygoogle errors
      }
    }
  }, [slot]);

  if (PUB_ID && slot) {
    // Real AdSense slot — render Google ad unit
    return (
      <div className={`ad-zone ${className}`} style={{ maxWidth: s.w, width: '100%', margin: '0 auto', overflow: 'hidden' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={PUB_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder shown before AdSense is approved / when no slot provided
  return (
    <div
      className={`ad-zone rounded ${className}`}
      style={{ maxWidth: s.w, height: s.h, width: '100%', margin: '0 auto' }}
    >
      <span>{s.label}</span>
    </div>
  );
}

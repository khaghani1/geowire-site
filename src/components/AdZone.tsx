'use client';

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

export default function AdZone({ size, slot, className = '' }: AdZoneProps) {
  const s = SIZES[size];

  if (slot) {
    // Real AdSense slot — render Google ad code
    return (
      <div className={`ad-zone ${className}`} style={{ maxWidth: s.w, height: s.h, width: '100%', margin: '0 auto' }}>
        {/* Google AdSense will be inserted here */}
        <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-XXXXXXX" data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
      </div>
    );
  }

  return (
    <div
      className={`ad-zone rounded ${className}`}
      style={{ maxWidth: s.w, height: s.h, width: '100%', margin: '0 auto' }}
    >
      <span>{s.label}</span>
    </div>
  );
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GeoWire — Global Intelligence Platform';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const STATS = [
  { label: 'BRENT CRUDE', value: '$112/bbl', change: '+64.7%', up: true },
  { label: 'WAR COST', value: '$43.9B', change: 'DAY 26', up: false },
  { label: 'HORMUZ', value: '3% cap.', change: '20M bbl/day', up: false },
  { label: 'USD INDEX', value: '99.15', change: '-4.7%', up: false },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#08080a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 60px',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Top red accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#d63031', display: 'flex' }} />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div
            style={{
              background: '#d63031',
              width: '52px',
              height: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
            }}
          >
            <span style={{ color: 'white', fontSize: '22px', fontWeight: '900', letterSpacing: '-1px' }}>GW</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#ffffff', fontSize: '26px', fontWeight: '700', letterSpacing: '3px' }}>GEOWIRE</span>
            <span style={{ color: '#555', fontSize: '11px', letterSpacing: '4px', marginTop: '2px' }}>GLOBAL INTELLIGENCE</span>
          </div>

          {/* LIVE badge */}
          <div
            style={{
              marginLeft: 'auto',
              background: '#1a0505',
              border: '1px solid #d63031',
              borderRadius: '4px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d63031', display: 'flex' }} />
            <span style={{ color: '#d63031', fontSize: '12px', fontWeight: '700', letterSpacing: '2px' }}>LIVE — IRAN WAR DAY 26</span>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '36px' }}>
          <span style={{ color: '#d63031', fontSize: '13px', letterSpacing: '4px', marginBottom: '12px', display: 'flex' }}>
            ▲ OPERATION EPIC FURY
          </span>
          <span
            style={{
              color: '#ffffff',
              fontSize: '54px',
              fontWeight: '800',
              lineHeight: '1.05',
              letterSpacing: '-1px',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            Real-Time War Intelligence
          </span>
          <span style={{ color: '#888', fontSize: '18px', marginTop: '14px', display: 'flex' }}>
            Military · Economic · Diplomatic · Narrative
          </span>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: '#0f0f11',
                border: '1px solid #1e1e22',
                borderRadius: '6px',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: '#555', fontSize: '10px', letterSpacing: '2px', marginBottom: '8px', display: 'flex' }}>{s.label}</span>
              <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700', display: 'flex' }}>{s.value}</span>
              <span style={{ color: s.up ? '#00b894' : '#d63031', fontSize: '12px', marginTop: '6px', display: 'flex' }}>{s.change}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid #1a1a1e',
          }}
        >
          <span style={{ color: '#444', fontSize: '13px', letterSpacing: '3px', display: 'flex' }}>GEOWIRE.ORG</span>
          <span style={{ color: '#444', fontSize: '12px', display: 'flex' }}>Independent Geopolitical Intelligence · @Geowire_org</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

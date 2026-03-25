import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Narrative War — Information Operations Tracker';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NARRATIVES = [
  { flag: '🇺🇸', source: 'US / Western', frame: 'Surgical counter-proliferation', color: '#4a9eff' },
  { flag: '🇮🇷', source: 'Islamic Republic', frame: 'American imperialism & resistance', color: '#d63031' },
  { flag: '🇷🇺', source: 'Russia / RT', frame: 'US hegemony collapsing', color: '#ff6b35' },
  { flag: '🇨🇳', source: 'PRC / Xinhua', frame: 'Western double standards', color: '#f39c12' },
  { flag: '🌍', source: 'Arab Street', frame: 'Palestinian solidarity frame', color: '#00b894' },
  { flag: '🌐', source: 'Global South', frame: 'Neo-colonial resource war', color: '#a29bfe' },
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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#d63031', display: 'flex' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: '#d63031', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
              <span style={{ color: 'white', fontSize: '19px', fontWeight: '900' }}>GW</span>
            </div>
            <span style={{ color: '#ffffff', fontSize: '22px', fontWeight: '700', letterSpacing: '3px' }}>GEOWIRE</span>
          </div>
          <span style={{ color: '#555', fontSize: '12px', letterSpacing: '3px', display: 'flex' }}>INFORMATION OPERATIONS</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#d63031', fontSize: '12px', letterSpacing: '4px', marginBottom: '10px', display: 'flex' }}>▲ NARRATIVE WAR</span>
          <span style={{ color: '#ffffff', fontSize: '52px', fontWeight: '800', lineHeight: '1.0', display: 'flex' }}>6 Competing Truths</span>
          <span style={{ color: '#888', fontSize: '16px', marginTop: '12px', display: 'flex' }}>How Operation Epic Fury is being told — and by whom</span>
        </div>

        {/* Narratives grid */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
          {NARRATIVES.map((n, i) => (
            <div
              key={i}
              style={{
                background: '#0f0f11',
                border: `1px solid ${n.color}30`,
                borderLeft: `3px solid ${n.color}`,
                borderRadius: '4px',
                padding: '12px 16px',
                width: '340px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span style={{ color: '#aaa', fontSize: '13px', display: 'flex' }}>{n.flag} {n.source}</span>
              <span style={{ color: '#ddd', fontSize: '13px', fontStyle: 'italic', display: 'flex' }}>"{n.frame}"</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #1a1a1e' }}>
          <span style={{ color: '#444', fontSize: '12px', letterSpacing: '2px', display: 'flex' }}>GEOWIRE.ORG/NARRATIVE-WAR</span>
          <span style={{ color: '#444', fontSize: '12px', display: 'flex' }}>@Geowire_org</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

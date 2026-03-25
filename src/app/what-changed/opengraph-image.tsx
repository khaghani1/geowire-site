import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'What Changed — 24-Hour Intelligence Delta';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const UPDATES = [
  { type: 'MILITARY', text: 'US sortie count: 14 additional strikes on Fordow support facilities' },
  { type: 'ECONOMIC', text: 'Brent crude +2.1% after tanker convoy incident in Gulf of Oman' },
  { type: 'DIPLOMATIC', text: 'Qatar back-channel: 72-hour humanitarian pause proposal rejected by IRGC' },
  { type: 'MILITARY', text: 'Houthi ASBM strike on MV Aegean Star — crew evacuated, vessel adrift' },
];

const TYPE_COLOR: Record<string, string> = {
  MILITARY: '#d63031',
  ECONOMIC: '#f39c12',
  DIPLOMATIC: '#00b894',
  HUMANITARIAN: '#74b9ff',
};

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
          <span style={{ color: '#555', fontSize: '12px', letterSpacing: '3px', display: 'flex' }}>GEOWIRE.ORG</span>
        </div>

        {/* Page title */}
        <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#d63031', fontSize: '12px', letterSpacing: '4px', marginBottom: '10px', display: 'flex' }}>▲ 24-HOUR DELTA</span>
          <span style={{ color: '#ffffff', fontSize: '52px', fontWeight: '800', lineHeight: '1.0', display: 'flex' }}>What Changed</span>
          <span style={{ color: '#888', fontSize: '16px', marginTop: '12px', display: 'flex' }}>Everything that moved in the last 24 hours of Operation Epic Fury</span>
        </div>

        {/* Update list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          {UPDATES.map((u, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: '#0f0f11',
                border: '1px solid #1e1e22',
                borderRadius: '4px',
                padding: '12px 18px',
              }}
            >
              <span
                style={{
                  color: TYPE_COLOR[u.type] || '#888',
                  fontSize: '10px',
                  letterSpacing: '1px',
                  minWidth: '90px',
                  display: 'flex',
                }}
              >
                {u.type}
              </span>
              <span style={{ color: '#cccccc', fontSize: '14px', display: 'flex' }}>{u.text}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #1a1a1e' }}>
          <span style={{ color: '#444', fontSize: '12px', letterSpacing: '2px', display: 'flex' }}>12 UPDATES TODAY</span>
          <span style={{ color: '#444', fontSize: '12px', display: 'flex' }}>@Geowire_org</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

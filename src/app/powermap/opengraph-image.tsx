import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Power Map — Alliances & Actors in Operation Epic Fury';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ACTORS = [
  { side: 'US COALITION', color: '#4a9eff', bg: '#0a1628', border: '#1a3050', parties: ['🇺🇸 United States', '🇮🇱 Israel', '🇬🇧 United Kingdom', '🇸🇦 Saudi Arabia', '🇦🇪 UAE'] },
  { side: 'AXIS OF RESISTANCE', color: '#d63031', bg: '#1a0808', border: '#3a1010', parties: ['🇮🇷 Iran (IRGC)', '🇾🇪 Houthis', '🇱🇧 Hezbollah', '🇮🇶 PMF (Iraq)', 'Quds Force'] },
  { side: 'NEUTRAL / MEDIATING', color: '#f39c12', bg: '#181208', border: '#362808', parties: ['🇷🇺 Russia', '🇨🇳 China', '🇶🇦 Qatar', '🌐 UN / IAEA'] },
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
          <span style={{ color: '#555', fontSize: '12px', letterSpacing: '3px', display: 'flex' }}>14 ACTORS TRACKED</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#d63031', fontSize: '12px', letterSpacing: '4px', marginBottom: '10px', display: 'flex' }}>▲ GEOPOLITICAL STRUCTURE</span>
          <span style={{ color: '#ffffff', fontSize: '52px', fontWeight: '800', lineHeight: '1.0', display: 'flex' }}>Power Map</span>
          <span style={{ color: '#888', fontSize: '16px', marginTop: '12px', display: 'flex' }}>Every state actor, proxy force, and diplomatic player in Operation Epic Fury</span>
        </div>

        {/* Blocs */}
        <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
          {ACTORS.map((bloc) => (
            <div
              key={bloc.side}
              style={{
                flex: 1,
                background: bloc.bg,
                border: `1px solid ${bloc.border}`,
                borderTop: `3px solid ${bloc.color}`,
                borderRadius: '6px',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: bloc.color, fontSize: '11px', letterSpacing: '2px', marginBottom: '14px', fontWeight: '700', display: 'flex' }}>{bloc.side}</span>
              {bloc.parties.map((p) => (
                <span key={p} style={{ color: '#cccccc', fontSize: '13px', marginBottom: '8px', display: 'flex' }}>{p}</span>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #1a1a1e' }}>
          <span style={{ color: '#444', fontSize: '12px', letterSpacing: '2px', display: 'flex' }}>GEOWIRE.ORG/POWERMAP</span>
          <span style={{ color: '#444', fontSize: '12px', display: 'flex' }}>@Geowire_org</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

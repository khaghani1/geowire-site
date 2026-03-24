'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getWarDay } from '@/lib/constants';

interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'conflict' | 'energy' | 'trade' | 'humanitarian' | 'base';
  threat: 'critical' | 'elevated' | 'moderate' | 'stable';
  label: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  // Iran War Theater
  { id: 'tehran', name: 'Tehran', lat: 35.6892, lng: 51.389, type: 'conflict', threat: 'critical', label: 'TEHRAN', description: 'Iranian capital — sustained US air campaign targeting military infrastructure' },
  { id: 'hormuz', name: 'Strait of Hormuz', lat: 26.5667, lng: 56.25, type: 'energy', threat: 'critical', label: 'HORMUZ', description: 'Closed since Day 1 — 20M bbl/day removed from global supply' },
  { id: 'isfahan', name: 'Isfahan Nuclear', lat: 32.6546, lng: 51.6680, type: 'conflict', threat: 'critical', label: 'ISFAHAN', description: 'Nuclear enrichment facility — primary US strike target' },
  { id: 'bushehr', name: 'Bushehr', lat: 28.9684, lng: 50.8385, type: 'conflict', threat: 'critical', label: 'BUSHEHR', description: 'Nuclear power plant — surrounded by Iranian naval forces' },
  { id: 'bandar', name: 'Bandar Abbas', lat: 27.1865, lng: 56.2808, type: 'conflict', threat: 'critical', label: 'BANDAR ABBAS', description: 'IRGC Navy HQ — Iranian mine-laying operations launched from here' },

  // US Military Bases
  { id: 'centcom', name: 'CENTCOM Tampa', lat: 27.9506, lng: -82.4572, type: 'base', threat: 'stable', label: 'CENTCOM', description: 'US Central Command HQ — coordinating Operation Epic Fury' },
  { id: 'bahrain', name: 'NSA Bahrain', lat: 26.2285, lng: 50.5860, type: 'base', threat: 'elevated', label: 'US 5TH FLEET', description: 'US Naval Forces Central Command — targeted by Iranian missiles Day 1' },
  { id: 'qatar', name: 'Al Udeid AB', lat: 25.1174, lng: 51.3150, type: 'base', threat: 'elevated', label: 'AL UDEID', description: 'CENTCOM forward HQ — primary air operations center' },
  { id: 'diego', name: 'Diego Garcia', lat: -7.3195, lng: 72.4229, type: 'base', threat: 'stable', label: 'DIEGO GARCIA', description: 'B-2 bomber staging area for long-range strikes' },

  // Energy Infrastructure
  { id: 'ras-tanura', name: 'Ras Tanura', lat: 26.6440, lng: 50.1520, type: 'energy', threat: 'elevated', label: 'RAS TANURA', description: 'Saudi Arabia — world\'s largest oil export terminal' },
  { id: 'abqaiq', name: 'Abqaiq', lat: 25.9389, lng: 49.6774, type: 'energy', threat: 'elevated', label: 'ABQAIQ', description: 'Saudi oil processing — handles 7M bbl/day' },
  { id: 'fujairah', name: 'Fujairah', lat: 25.1288, lng: 56.3264, type: 'energy', threat: 'critical', label: 'FUJAIRAH', description: 'UAE — alternative pipeline terminus, bypassing Hormuz' },

  // Global Impact Points
  { id: 'shanghai', name: 'Shanghai', lat: 31.2304, lng: 121.4737, type: 'trade', threat: 'elevated', label: 'SHANGHAI', description: 'China\'s financial center — markets down 15%+' },
  { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lng: 72.8777, type: 'trade', threat: 'elevated', label: 'MUMBAI', description: 'India — 85% oil import dependent, inflation surging' },
  { id: 'rotterdam', name: 'Rotterdam', lat: 51.9244, lng: 4.4777, type: 'energy', threat: 'moderate', label: 'ROTTERDAM', description: 'Europe\'s largest port — oil shipments rerouting' },
  { id: 'tokyo', name: 'Tokyo', lat: 35.6762, lng: 139.6503, type: 'trade', threat: 'elevated', label: 'TOKYO', description: 'Japan — 90% energy import dependent, Nikkei in freefall' },
  { id: 'suez', name: 'Suez Canal', lat: 30.0131, lng: 32.5767, type: 'trade', threat: 'moderate', label: 'SUEZ', description: 'Shipping rerouting around Africa — transit times doubled' },

  // Humanitarian
  { id: 'sanaa', name: 'Sanaa', lat: 15.3694, lng: 44.1910, type: 'humanitarian', threat: 'critical', label: 'YEMEN', description: 'Houthi forces launching attacks on Red Sea shipping' },
  { id: 'beirut', name: 'Beirut', lat: 33.8938, lng: 35.5018, type: 'humanitarian', threat: 'elevated', label: 'LEBANON', description: 'Hezbollah on high alert — border tensions with Israel' },
  { id: 'baghdad', name: 'Baghdad', lat: 33.3152, lng: 44.3661, type: 'conflict', threat: 'elevated', label: 'IRAQ', description: 'Iran-backed militias targeting US forces — 3 bases under fire' },
];

// Convert lat/lng to 3D sphere coordinates
function latLngToXYZ(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

// Project 3D point to 2D canvas
function project(x: number, y: number, z: number, rotY: number, rotX: number, cx: number, cy: number, scale: number) {
  // Rotate Y
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  let rx = x * cosY - z * sinY;
  let rz = x * sinY + z * cosY;
  let ry = y;

  // Rotate X
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const ry2 = ry * cosX - rz * sinX;
  const rz2 = ry * sinX + rz * cosX;

  return {
    x: cx + rx * scale,
    y: cy - ry2 * scale,
    z: rz2,
    visible: rz2 > 0,
  };
}

export default function GlobePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: -0.2, y: -0.8 }); // Start looking at Middle East
  const [hoveredSpot, setHoveredSpot] = useState<Hotspot | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Hotspot | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const animRef = useRef<number>(0);
  const warDay = getWarDay();

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.35;
    const scale = radius;

    ctx.clearRect(0, 0, w, h);

    // Globe background glow
    const glow = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.3);
    glow.addColorStop(0, 'rgba(214, 48, 49, 0.05)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Globe sphere
    const grad = ctx.createRadialGradient(cx - radius * 0.15, cy - radius * 0.15, 0, cx, cy, radius);
    grad.addColorStop(0, '#1a1a22');
    grad.addColorStop(0.7, '#111118');
    grad.addColorStop(1, '#08080a');
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(212, 168, 67, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(85, 83, 94, 0.2)';
      ctx.lineWidth = 0.5;
      let first = true;
      for (let lng = -180; lng <= 180; lng += 5) {
        const p = latLngToXYZ(lat, lng, 1);
        const proj = project(p.x, p.y, p.z, rotation.y, rotation.x, cx, cy, scale);
        if (proj.visible) {
          if (first) { ctx.moveTo(proj.x, proj.y); first = false; }
          else ctx.lineTo(proj.x, proj.y);
        } else { first = true; }
      }
      ctx.stroke();
    }

    // Longitude lines
    for (let lng = -180; lng < 180; lng += 30) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(85, 83, 94, 0.15)';
      ctx.lineWidth = 0.5;
      let first = true;
      for (let lat = -90; lat <= 90; lat += 5) {
        const p = latLngToXYZ(lat, lng, 1);
        const proj = project(p.x, p.y, p.z, rotation.y, rotation.x, cx, cy, scale);
        if (proj.visible) {
          if (first) { ctx.moveTo(proj.x, proj.y); first = false; }
          else ctx.lineTo(proj.x, proj.y);
        } else { first = true; }
      }
      ctx.stroke();
    }

    // Hotspots
    const filteredSpots = filter === 'all' ? HOTSPOTS : HOTSPOTS.filter(h => h.type === filter);
    const projectedSpots: { spot: Hotspot; px: number; py: number; visible: boolean }[] = [];

    filteredSpots.forEach(spot => {
      const p = latLngToXYZ(spot.lat, spot.lng, 1.02);
      const proj = project(p.x, p.y, p.z, rotation.y, rotation.x, cx, cy, scale);

      projectedSpots.push({ spot, px: proj.x, py: proj.y, visible: proj.visible });

      if (!proj.visible) return;

      const colors: Record<string, string> = {
        critical: '#d63031',
        elevated: '#e17055',
        moderate: '#d4a843',
        stable: '#27ae60',
      };
      const color = colors[spot.threat] || '#d4a843';
      const isHovered = hoveredSpot?.id === spot.id;
      const isSelected = selectedSpot?.id === spot.id;
      const dotSize = isHovered || isSelected ? 6 : 4;

      // Pulse ring for critical
      if (spot.threat === 'critical') {
        const pulseSize = dotSize + 4 + Math.sin(Date.now() / 400) * 3;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `${color}22`;
        ctx.fill();
      }

      // Dot
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, dotSize + 2, 0, Math.PI * 2);
      ctx.fillStyle = `${color}33`;
      ctx.fill();

      // Label
      if (isHovered || isSelected || spot.threat === 'critical') {
        ctx.font = `bold ${isHovered || isSelected ? 11 : 9}px "IBM Plex Mono", monospace`;
        ctx.fillStyle = isHovered || isSelected ? '#f0eeeb' : `${color}cc`;
        ctx.textAlign = 'left';
        ctx.fillText(spot.label, proj.x + dotSize + 4, proj.y + 3);
      }
    });

    return projectedSpots;
  }, [rotation, hoveredSpot, selectedSpot, filter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth * 2;
      canvas.height = container.clientHeight * 2;
      canvas.style.width = container.clientWidth + 'px';
      canvas.style.height = container.clientHeight + 'px';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (autoRotate && !isDragging) {
        setRotation(r => ({ ...r, y: r.y + 0.001 }));
      }
      draw(canvas);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [draw, autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = (e.clientX - dragStart.x) * 0.005;
      const dy = (e.clientY - dragStart.y) * 0.005;
      setRotation(r => ({ x: Math.max(-1.2, Math.min(1.2, r.x + dy)), y: r.y + dx }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }

    // Hit test for hotspots
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;

    let found: Hotspot | null = null;
    const filteredSpots = filter === 'all' ? HOTSPOTS : HOTSPOTS.filter(h => h.type === filter);
    for (const spot of filteredSpots) {
      const p = latLngToXYZ(spot.lat, spot.lng, 1.02);
      const proj = project(p.x, p.y, p.z, rotation.y, rotation.x, cx, cy, radius);
      if (proj.visible && Math.hypot(proj.x - mx, proj.y - my) < 15) {
        found = spot;
        break;
      }
    }
    setHoveredSpot(found);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const t = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: t.clientX, y: t.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const t = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = t.clientX - rect.left;
    const my = t.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;
    const dx = (t.clientX - dragStart.x) * 0.005;
    const dy = (t.clientY - dragStart.y) * 0.005;
    setRotation(r => ({ x: Math.max(-1.2, Math.min(1.2, r.x + dy)), y: r.y + dx }));
    setDragStart({ x: t.clientX, y: t.clientY });
    // Hit test for hotspots on touch
    let found: Hotspot | null = null;
    const filteredSpots = filter === 'all' ? HOTSPOTS : HOTSPOTS.filter(h => h.type === filter);
    for (const spot of filteredSpots) {
      const p = latLngToXYZ(spot.lat, spot.lng, 1.02);
      const proj = project(p.x, p.y, p.z, rotation.y, rotation.x, cx, cy, radius);
      if (proj.visible && Math.hypot(proj.x - mx, proj.y - my) < 20) {
        found = spot;
        break;
      }
    }
    setHoveredSpot(found);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    if (hoveredSpot) {
      setSelectedSpot(hoveredSpot.id === selectedSpot?.id ? null : hoveredSpot);
    }
  };


  const handleClick = (e: React.MouseEvent) => {
    if (hoveredSpot) {
      setSelectedSpot(hoveredSpot.id === selectedSpot?.id ? null : hoveredSpot);
    } else {
      setSelectedSpot(null);
    }
  };

  const typeColors: Record<string, string> = {
    conflict: 'bg-accent-red/20 text-accent-red border-accent-red/30',
    energy: 'bg-accent-orange/20 text-accent-orange border-accent-orange/30',
    trade: 'bg-accent-gold/20 text-accent-gold border-accent-gold/30',
    humanitarian: 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30',
    base: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
  };

  return (
    <main className="min-h-screen bg-bg-0 pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-tx-0">War Map</h1>
            <p className="text-tx-2 font-mono text-sm mt-1">
              OPERATION EPIC FURY — DAY {warDay} — INTERACTIVE THEATER MAP
            </p>
          </div>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`font-mono text-xs px-3 py-1.5 rounded border ${
              autoRotate ? 'border-accent-gold text-accent-gold' : 'border-bg-3 text-tx-3'
            }`}
          >
            {autoRotate ? '● AUTO-ROTATE' : '○ PAUSED'}
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {[
            { key: 'all', label: 'ALL', count: HOTSPOTS.length },
            { key: 'conflict', label: 'CONFLICT ZONES', count: HOTSPOTS.filter(h => h.type === 'conflict').length },
            { key: 'energy', label: 'ENERGY', count: HOTSPOTS.filter(h => h.type === 'energy').length },
            { key: 'base', label: 'US BASES', count: HOTSPOTS.filter(h => h.type === 'base').length },
            { key: 'trade', label: 'TRADE', count: HOTSPOTS.filter(h => h.type === 'trade').length },
            { key: 'humanitarian', label: 'HUMANITARIAN', count: HOTSPOTS.filter(h => h.type === 'humanitarian').length },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`font-mono text-[10px] px-3 py-1.5 rounded tracking-wider ${
                filter === f.key ? 'bg-accent-gold text-bg-0' : 'bg-bg-2 text-tx-2 hover:text-tx-0'
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Globe Canvas */}
          <div className="lg:col-span-3">
            <div className="relative bg-bg-1 rounded-lg border border-bg-3 overflow-hidden" style={{ height: "min(600px, 70vh)" }}>
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
                onClick={handleClick}
              />

              {/* Hover Tooltip */}
              {hoveredSpot && !selectedSpot && (
                <div className="absolute bottom-4 left-4 right-4 bg-bg-0/95 border border-bg-3 rounded-lg p-4 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${typeColors[hoveredSpot.type]}`}>
                      {hoveredSpot.type.toUpperCase()}
                    </span>
                    <span className="font-mono text-tx-0 text-sm font-bold">{hoveredSpot.name}</span>
                  </div>
                  <p className="text-tx-2 text-xs mt-1">{hoveredSpot.description}</p>
                </div>
              )}

              {/* Legend */}
              <div className="absolute top-4 right-4 bg-bg-0/80 border border-bg-3 rounded p-3 backdrop-blur">
                <div className="font-mono text-[10px] text-tx-3 mb-2">THREAT LEVEL</div>
                {[
                  { level: 'CRITICAL', color: '#d63031' },
                  { level: 'ELEVATED', color: '#e17055' },
                  { level: 'MODERATE', color: '#d4a843' },
                  { level: 'STABLE', color: '#27ae60' },
                ].map(l => (
                  <div key={l.level} className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="font-mono text-[9px] text-tx-2">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — Selected Spot or List */}
          <div className="space-y-4">
            {selectedSpot ? (
              <div className={`bg-bg-1 rounded-lg border p-5 ${typeColors[selectedSpot.type]?.split(' ')[2] || 'border-bg-3'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${typeColors[selectedSpot.type]}`}>
                    {selectedSpot.type.toUpperCase()}
                  </span>
                  <button onClick={() => setSelectedSpot(null)} className="text-tx-3 text-xs hover:text-tx-0">✕</button>
                </div>
                <h3 className="font-display text-xl text-tx-0 mb-1">{selectedSpot.name}</h3>
                <div className="font-mono text-[10px] text-tx-3 mb-3">
                  {selectedSpot.lat.toFixed(4)}°N, {selectedSpot.lng.toFixed(4)}°E
                </div>
                <p className="text-tx-1 text-sm leading-relaxed">{selectedSpot.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-tx-3">THREAT:</span>
                  <span className={`font-mono text-xs font-bold ${
                    selectedSpot.threat === 'critical' ? 'text-accent-red' :
                    selectedSpot.threat === 'elevated' ? 'text-accent-orange' :
                    selectedSpot.threat === 'moderate' ? 'text-accent-gold' : 'text-accent-green'
                  }`}>
                    {selectedSpot.threat.toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-bg-1 rounded-lg border border-bg-3 p-4">
                <h3 className="font-mono text-xs text-accent-gold tracking-widest mb-3">ACTIVE HOTSPOTS</h3>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {(filter === 'all' ? HOTSPOTS : HOTSPOTS.filter(h => h.type === filter)).map(spot => (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedSpot(spot)}
                      className="w-full text-left bg-bg-2 rounded p-2.5 hover:bg-bg-3 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          spot.threat === 'critical' ? 'bg-accent-red' :
                          spot.threat === 'elevated' ? 'bg-accent-orange' :
                          spot.threat === 'moderate' ? 'bg-accent-gold' : 'bg-accent-green'
                        }`} />
                        <span className="text-tx-0 text-sm font-medium">{spot.name}</span>
                        <span className={`ml-auto font-mono text-[9px] px-1.5 py-0.5 rounded ${typeColors[spot.type]}`}>
                          {spot.type.toUpperCase()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-bg-1 rounded-lg border border-accent-red/30 p-4">
              <h3 className="font-mono text-xs text-accent-red tracking-widest mb-3">THEATER STATUS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-tx-2 text-xs">Conflict Zones</span>
                  <span className="font-mono text-xs text-accent-red">{HOTSPOTS.filter(h => h.type === 'conflict').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tx-2 text-xs">Critical Threats</span>
                  <span className="font-mono text-xs text-accent-red">{HOTSPOTS.filter(h => h.threat === 'critical').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tx-2 text-xs">US Bases Active</span>
                  <span className="font-mono text-xs text-accent-blue">{HOTSPOTS.filter(h => h.type === 'base').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tx-2 text-xs">Energy At Risk</span>
                  <span className="font-mono text-xs text-accent-orange">{HOTSPOTS.filter(h => h.type === 'energy').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

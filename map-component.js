// map-component.js — GeoWire MapLibre conflict map integration
// Phase 2 stub: provides MAP global object with init/update API.
// Full MapLibre GL JS integration loads on demand when API key is provided.
// Until then, renders a styled placeholder with hover-ready container.

const MAP = (() => {

  // ── Configuration
  const CONFIG = {
    center:   [53.0, 32.0],   // Iran center
    zoom:     4.5,
    style:    'https://demotiles.maplibre.org/style.json',  // free demo tiles
    minZoom:  2,
    maxZoom:  12,
  };

  // ── Strike / incident data layer (seed — updated by API in Phase 3)
  const STRIKE_DATA = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Point', coordinates: [51.4231, 35.6892] }, properties: { name: 'Tehran', type: 'strike', severity: 'high',    label: 'IRGC HQ complex', date: '2026-02-28' }},
      { type: 'Feature', geometry: { type: 'Point', coordinates: [51.6754, 32.6546] }, properties: { name: 'Isfahan', type: 'strike', severity: 'critical', label: 'Natanz access roads', date: '2026-02-28' }},
      { type: 'Feature', geometry: { type: 'Point', coordinates: [50.8288, 29.2900] }, properties: { name: 'Kharg Island', type: 'strike', severity: 'critical', label: 'Oil export terminal', date: '2026-03-02' }},
      { type: 'Feature', geometry: { type: 'Point', coordinates: [48.3282, 30.4271] }, properties: { name: 'Ahvaz', type: 'strike', severity: 'high',    label: 'IRGC ground forces', date: '2026-03-01' }},
      { type: 'Feature', geometry: { type: 'Point', coordinates: [56.2800, 27.1832] }, properties: { name: 'Strait of Hormuz', type: 'naval', severity: 'critical', label: '3% flow capacity', date: '2026-02-28' }},
      { type: 'Feature', geometry: { type: 'Point', coordinates: [54.3773, 24.4539] }, properties: { name: 'UAE (Al Dhafra)', type: 'base', severity: 'medium', label: 'US air ops base', date: '' }},
      { type: 'Feature', geometry: { type: 'Point', coordinates: [50.5860, 26.2235] }, properties: { name: 'Bahrain (5th Fleet)', type: 'base', severity: 'medium', label: 'US Naval HQ — missile strike', date: '2026-02-28' }},
      { type: 'Feature', geometry: { type: 'Point', coordinates: [44.4009, 33.3157] }, properties: { name: 'Baghdad', type: 'political', severity: 'medium', label: 'Green Zone lockdown', date: '' }},
      { type: 'Feature', geometry: { type: 'Point', coordinates: [35.2137, 31.7683] }, properties: { name: 'Israel', type: 'ally', severity: 'low', label: 'Joint strike ops (Nevatim)', date: '' }},
    ]
  };

  // ── Naval routes (for Phase 3 arc layer)
  const NAVAL_ROUTES = [
    { from: [51.5, 25.0], to: [43.0, 12.8], label: 'US Carrier Group 1', status: 'active' },
    { from: [56.5, 24.5], to: [60.0, 22.0], label: 'US Carrier Group 2', status: 'active' },
    { from: [75.0, 20.0], to: [56.0, 27.0], label: 'China Naval Watch', status: 'watching' },
  ];

  // ── Refugee flow arrows (Phase 3)
  const REFUGEE_FLOWS = [
    { from: [51.4, 35.7], to: [44.5, 34.5], count: 45000,  label: 'Tehran → Iraq border' },
    { from: [51.4, 35.7], to: [44.0, 39.9], count: 28000,  label: 'Tehran → Turkey border' },
  ];

  let _map = null;
  let _initialized = false;

  // ── Color coding for severity
  function severityColor(severity) {
    const colors = { critical: '#ff3b3b', high: '#ff8c00', medium: '#ffb800', low: '#00ff88' };
    return colors[severity] || '#4a9eff';
  }

  // ── Render placeholder (no MapLibre loaded)
  function renderPlaceholder(containerId, opts = {}) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const height = opts.height || '400px';
    el.style.height = height;
    el.style.background = '#0a0a0a';
    el.style.border = '1px solid #242424';
    el.style.borderRadius = '12px';
    el.style.overflow = 'hidden';
    el.style.position = 'relative';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';

    // Dot overlay representing strike points
    const dots = STRIKE_DATA.features.map(f => {
      const [lon, lat] = f.geometry.coordinates;
      // Very rough lat/lon to percentage position for illustration
      const left = ((lon - 20) / 80 * 100).toFixed(1);
      const top  = ((1 - (lat - 10) / 55) * 100).toFixed(1);
      const color = severityColor(f.properties.severity);
      return `<div class="map-dot" style="left:${left}%;top:${top}%;background:${color};" title="${f.properties.name}: ${f.properties.label}"></div>`;
    }).join('');

    el.innerHTML = `
      <div class="map-placeholder-overlay">
        ${dots}
        <div class="map-placeholder-center">
          <div style="font-size:36px;margin-bottom:12px;">🗺️</div>
          <div style="font-size:16px;font-weight:700;color:#f4f4f4;margin-bottom:6px;">Interactive Conflict Map</div>
          <div style="font-size:13px;color:#888;margin-bottom:12px;">MapLibre GL JS — loads when tile key is configured</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
            <span style="font-size:12px;padding:4px 10px;border-radius:20px;background:rgba(255,59,59,.15);color:#ff3b3b;">● Critical strikes</span>
            <span style="font-size:12px;padding:4px 10px;border-radius:20px;background:rgba(255,140,0,.15);color:#ff8c00;">● High activity</span>
            <span style="font-size:12px;padding:4px 10px;border-radius:20px;background:rgba(74,158,255,.15);color:#4a9eff;">● US bases</span>
            <span style="font-size:12px;padding:4px 10px;border-radius:20px;background:rgba(0,255,136,.15);color:#00ff88;">● Allies</span>
          </div>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .map-placeholder-overlay { position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
      .map-placeholder-center  { position:relative; z-index:2; text-align:center; padding:24px; }
      .map-dot { position:absolute; width:10px; height:10px; border-radius:50%; transform:translate(-50%,-50%); opacity:.8; cursor:pointer; transition:transform .2s; }
      .map-dot:hover { transform:translate(-50%,-50%) scale(1.8); opacity:1; }
    `;
    document.head.appendChild(style);
  }

  // ── Attempt to init real MapLibre map
  async function init(containerId, opts = {}) {
    const el = document.getElementById(containerId);
    if (!el) return;

    // Check if MapLibre is loaded
    if (typeof maplibregl === 'undefined') {
      // Try to load it dynamically
      await loadMapLibre();
    }

    if (typeof maplibregl === 'undefined') {
      // MapLibre not available — render placeholder
      renderPlaceholder(containerId, opts);
      return;
    }

    try {
      _map = new maplibregl.Map({
        container: containerId,
        style: CONFIG.style,
        center: CONFIG.center,
        zoom: CONFIG.zoom,
        minZoom: CONFIG.minZoom,
        maxZoom: CONFIG.maxZoom,
        attributionControl: false,
      });

      _map.on('load', () => {
        addStrikeLayer();
        addHormuzMarker();
        if (opts.showNavigation !== false) {
          _map.addControl(new maplibregl.NavigationControl(), 'top-right');
        }
        _initialized = true;
        console.log('[MAP] MapLibre conflict map initialized');
      });

    } catch (e) {
      console.warn('[MAP] MapLibre init failed:', e.message);
      renderPlaceholder(containerId, opts);
    }
  }

  // ── Add strike point layer to real map
  function addStrikeLayer() {
    if (!_map) return;
    _map.addSource('strikes', { type: 'geojson', data: STRIKE_DATA });

    _map.addLayer({
      id: 'strike-circles',
      type: 'circle',
      source: 'strikes',
      paint: {
        'circle-radius': 8,
        'circle-color': [
          'match', ['get', 'severity'],
          'critical', '#ff3b3b',
          'high',     '#ff8c00',
          'medium',   '#ffb800',
          'low',      '#00ff88',
          '#4a9eff'
        ],
        'circle-opacity': 0.85,
        'circle-stroke-color': '#0a0a0a',
        'circle-stroke-width': 1.5,
      }
    });

    // Popup on click
    _map.on('click', 'strike-circles', (e) => {
      const props = e.features[0].properties;
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${props.name}</strong><br/>${props.label}${props.date ? `<br/><small>${props.date}</small>` : ''}`)
        .addTo(_map);
    });
    _map.on('mouseenter', 'strike-circles', () => { _map.getCanvas().style.cursor = 'pointer'; });
    _map.on('mouseleave', 'strike-circles', () => { _map.getCanvas().style.cursor = ''; });
  }

  function addHormuzMarker() {
    if (!_map) return;
    const el = document.createElement('div');
    el.className = 'hormuz-marker';
    el.style.cssText = 'width:16px;height:16px;background:#ff3b3b;border-radius:50%;border:2px solid #fff;animation:pulse 2s infinite;';
    new maplibregl.Marker({ element: el })
      .setLngLat([56.28, 27.18])
      .setPopup(new maplibregl.Popup().setHTML('<strong>Strait of Hormuz</strong><br/>3% flow capacity — CRITICAL'))
      .addTo(_map);
  }

  // ── Lazy-load MapLibre from CDN
  function loadMapLibre() {
    return new Promise((resolve) => {
      if (typeof maplibregl !== 'undefined') { resolve(); return; }
      const script = document.createElement('script');
      const link   = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = 'https://unpkg.com/maplibre-gl@4.1.3/dist/maplibre-gl.css';
      script.src  = 'https://unpkg.com/maplibre-gl@4.1.3/dist/maplibre-gl.js';
      script.onload  = resolve;
      script.onerror = resolve; // fail gracefully
      document.head.appendChild(link);
      document.head.appendChild(script);
    });
  }

  // ── Public API
  return {
    init,
    renderPlaceholder,
    getStrikeData:   () => STRIKE_DATA,
    getNavalRoutes:  () => NAVAL_ROUTES,
    getRefugeeFlows: () => REFUGEE_FLOWS,
    getMap:          () => _map,
    isInitialized:   () => _initialized,
  };

})();

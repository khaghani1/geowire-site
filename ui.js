// ui.js — GeoWire shared rendering functions
// All HTML generation lives here. Pages call these; no duplicated markup.

const UI = (() => {

  // ─── INTERNAL HELPERS ───────────────────────────────────────────────────────

  function _getLang() {
    return localStorage.getItem('geowire-lang') || 'en';
  }

  function _t(enText, faText) {
    return _getLang() === 'fa' ? faText : enText;
  }

  function _warDay() {
    const start = new Date(GEOWIRE.siteMeta.warStartDate);
    const now = new Date();
    return Math.max(1, Math.ceil((now - start) / 86400000));
  }

  function _encode(str) {
    return encodeURIComponent(str);
  }

  // ─── CONFIDENCE BADGE ────────────────────────────────────────────────────────
  function renderConfidenceBadge(level) {
    const conf = GEOWIRE.confidenceLevels[level] || GEOWIRE.confidenceLevels.inferred;
    return `<span class="confidence-badge confidence-${level}" title="${conf.description}">${conf.emoji} ${conf.label}</span>`;
  }

  // ─── SOURCE LABEL ────────────────────────────────────────────────────────────
  function renderSourceLabel(source, freshness) {
    const time = freshness ? `<span class="freshness">${_fmtTime(freshness)}</span>` : '';
    return `<span class="source-label">Source: <strong>${source}</strong>${time}</span>`;
  }

  function _fmtTime(iso) {
    try {
      const d = new Date(iso);
      const diff = Math.floor((Date.now() - d) / 60000);
      if (diff < 60) return `${diff}m ago`;
      if (diff < 1440) return `${Math.floor(diff/60)}h ago`;
      return d.toLocaleDateString('en-GB', { day:'numeric', month:'short' });
    } catch { return iso; }
  }

  // ─── LIVE / DEMO BADGE ───────────────────────────────────────────────────────
  function renderLiveBadge(isLive) {
    return isLive
      ? `<span class="badge badge-live" aria-label="Live data"><span class="live-pulse"></span>LIVE</span>`
      : `<span class="badge badge-demo" aria-label="Demo data">DEMO</span>`;
  }

  // ─── SHARE BUTTONS ───────────────────────────────────────────────────────────
  function renderShareButtons(text, url) {
    const fullText = `${text} via @Geowire_org ${url} #GeoWire #IranWar`;
    return `
      <div class="share-cluster" aria-label="Share this">
        <a class="share-btn share-x" href="https://x.com/intent/tweet?text=${_encode(fullText)}" target="_blank" rel="noopener" aria-label="Share on X">𝕏 Share</a>
        <a class="share-btn share-tg" href="https://t.me/share/url?url=${_encode(url)}&text=${_encode(text)}" target="_blank" rel="noopener" aria-label="Share on Telegram">✈ Telegram</a>
        <a class="share-btn share-wa" href="https://wa.me/?text=${_encode(fullText)}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">📱 WhatsApp</a>
      </div>`;
  }

  // ─── AD SLOT ─────────────────────────────────────────────────────────────────
  function renderAdSlot(name) {
    return `<div class="ad-slot" data-slot="${name}" aria-label="Advertisement">
      <span class="ad-label">Advertisement</span>
    </div>`;
  }

  // ─── SECTION HEADING ─────────────────────────────────────────────────────────
  function renderSectionHeading(title, subtitle) {
    return `<div class="section-heading">
      <h2>${title}</h2>
      ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
    </div>`;
  }

  // ─── METRIC ROW ──────────────────────────────────────────────────────────────
  function renderMetricRow(item) {
    const changeClass = item.change >= 0 ? 'positive' : 'negative';
    const changeStr = item.change >= 0 ? `+${item.change.toFixed(1)}%` : `${item.change.toFixed(1)}%`;
    return `<div class="metric-row">
      <span class="metric-label">${item.label}</span>
      <span class="metric-value">${typeof item.value === 'number' && item.unit === '$M' ? '$' + item.value.toLocaleString() : item.value.toLocaleString()}${item.unit && !item.unit.startsWith('$') ? ' ' + item.unit : ''}</span>
      <span class="metric-change ${changeClass}">${changeStr}</span>
      ${renderConfidenceBadge(item.confidence)}
      ${renderSourceLabel(item.source, item.lastUpdated)}
    </div>`;
  }

  // ─── NEWS CARD ───────────────────────────────────────────────────────────────
  function renderNewsCard(item) {
    const url = item.url && item.url !== '#' ? item.url : (GEOWIRE.siteMeta.baseUrl + '/');
    return `<article class="news-card">
      <div class="news-card-meta">
        ${renderConfidenceBadge(item.confidence)}
        <span class="news-timestamp">${_fmtTime(item.timestamp)}</span>
      </div>
      <h3 class="news-headline">
        ${item.url && item.url !== '#' ? `<a href="${item.url}" target="_blank" rel="noopener">${item.headline}</a>` : item.headline}
        ${item.url === '#' ? '<span class="coming-soon">Demo</span>' : ''}
      </h3>
      <p class="news-summary">${item.summary}</p>
      <div class="news-footer">
        ${renderSourceLabel(item.source, item.timestamp)}
        ${renderShareButtons(item.headline, url)}
      </div>
    </article>`;
  }

  // ─── ARTICLE CARD ────────────────────────────────────────────────────────────
  function renderArticleCard(article) {
    const isComingSoon = !article.link || article.link === '#';
    return `<article class="article-card ${article.featured ? 'article-card-featured' : ''}">
      <div class="article-card-meta">
        <span class="article-category">${article.category}</span>
        ${renderConfidenceBadge(article.confidence)}
        ${isComingSoon ? '<span class="coming-soon">Coming soon</span>' : ''}
      </div>
      <h3 class="article-card-title">
        ${!isComingSoon ? `<a href="${article.link}">${article.title}</a>` : article.title}
      </h3>
      <p class="article-card-subtitle">${article.subtitle}</p>
      <p class="article-card-summary">${article.summary}</p>
      <div class="article-card-footer">
        <span class="article-date">${_fmtDate(article.date)}</span>
        <span class="article-readtime">${article.readTime} min read</span>
        ${renderSourceLabel(article.source)}
        ${!isComingSoon ? renderShareButtons(article.title, GEOWIRE.siteMeta.baseUrl + '/' + article.link) : ''}
        ${!isComingSoon ? `<a href="${article.link}" class="btn-read">Read →</a>` : ''}
      </div>
    </article>`;
  }

  function _fmtDate(dateStr) {
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
    } catch { return dateStr; }
  }

  // ─── CONTRADICTION FLAG ──────────────────────────────────────────────────────
  function renderContradictionFlag(item) {
    return `<div class="contradiction-card">
      <div class="contradiction-header">⚠️ <strong>Disputed</strong> — Conflicting claims</div>
      <div class="contradiction-body">
        <div class="claim claim-a"><strong>${item.sourceA}:</strong> ${item.claimA}</div>
        <div class="vs">vs.</div>
        <div class="claim claim-b"><strong>${item.sourceB}:</strong> ${item.claimB}</div>
      </div>
      ${renderSourceLabel('Multiple sources')}
    </div>`;
  }

  // ─── UPDATE LOG ──────────────────────────────────────────────────────────────
  function renderUpdateLog(entries) {
    if (!entries || entries.length === 0) {
      return '<p class="no-updates">No updates found for this period.</p>';
    }
    return `<ul class="update-log">
      ${entries.map(e => `
        <li class="update-entry">
          <span class="update-category tag-${e.category.toLowerCase()}">${e.category}</span>
          <div class="update-body">
            <strong>${e.item}</strong>
            <span class="update-change">${e.change}</span>
          </div>
          <div class="update-meta">
            ${renderConfidenceBadge(e.confidence)}
            ${renderSourceLabel(e.source, e.timestamp)}
          </div>
        </li>`).join('')}
    </ul>`;
  }

  // ─── LANGUAGE TOGGLE ─────────────────────────────────────────────────────────
  function renderLanguageToggle() {
    const lang = _getLang();
    return `<div class="lang-toggle" role="group" aria-label="Language selector">
      <button class="lang-btn ${lang === 'en' ? 'active' : ''}" onclick="UI.setLang('en')" aria-pressed="${lang === 'en'}">EN</button>
      <button class="lang-btn ${lang === 'fa' ? 'active' : ''}" onclick="UI.setLang('fa')" aria-pressed="${lang === 'fa'}">FA</button>
    </div>`;
  }

  function setLang(lang) {
    localStorage.setItem('geowire-lang', lang);
    _applyLang(lang);
  }

  function _applyLang(lang) {
    const fa = GEOWIRE.farsiLabels;
    const isFa = lang === 'fa';

    // Site title
    const titleEl = document.querySelector('.site-title');
    if (titleEl) {
      titleEl.textContent = isFa ? fa.siteTitle : GEOWIRE.siteMeta.title.split('—')[0].trim();
      titleEl.dir = isFa ? 'rtl' : 'ltr';
    }

    // Headline
    const headlineEl = document.querySelector('.homepage-headline');
    if (headlineEl) {
      headlineEl.textContent = isFa ? fa.homepageHeadline : headlineEl.dataset.en;
      headlineEl.dir = isFa ? 'rtl' : 'ltr';
    }

    // Nav labels
    document.querySelectorAll('[data-nav-label]').forEach(el => {
      const enLabel = el.dataset.navLabel;
      el.textContent = isFa ? (fa.navItems[enLabel] || enLabel) : enLabel;
      el.dir = isFa ? 'rtl' : 'ltr';
    });

    // Ticker labels
    document.querySelectorAll('[data-ticker-label]').forEach(el => {
      const key = el.dataset.tickerLabel;
      el.textContent = isFa ? (fa.tickerLabels[key] || el.dataset.en) : el.dataset.en;
      el.dir = isFa ? 'rtl' : 'ltr';
    });

    // Update toggle button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
      btn.setAttribute('aria-pressed', btn.textContent === lang.toUpperCase());
    });
  }

  // ─── EMAIL CAPTURE ───────────────────────────────────────────────────────────
  function stubEmailCapture(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return { success: false, message: 'Please enter a valid email address.' };
    // TODO: connect to Beehiiv API or Supabase
    console.log('[GeoWire] Email captured (stub):', email);
    return { success: true, message: "You're on the list. First brief coming soon." };
  }

  function renderEmailCapture() {
    return `<div class="email-capture">
      <div class="email-capture-inner">
        <h3>Get the GeoWire Daily Brief — Free</h3>
        <p>Conflict intelligence, market signals, and analysis — every morning.</p>
        <form class="email-form" onsubmit="UI.handleEmailSubmit(event)" novalidate>
          <input type="email" id="email-input" class="email-input" placeholder="your@email.com" aria-label="Email address" required>
          <button type="submit" class="btn-subscribe">Subscribe</button>
        </form>
        <p id="email-msg" class="email-msg" aria-live="polite"></p>
      </div>
    </div>`;
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('email-input');
    const msg = document.getElementById('email-msg');
    if (!input || !msg) return;
    const result = stubEmailCapture(input.value.trim());
    msg.textContent = result.message;
    msg.className = `email-msg ${result.success ? 'email-msg-success' : 'email-msg-error'}`;
    if (result.success) input.value = '';
  }

  // ─── HEADER ──────────────────────────────────────────────────────────────────
  function renderHeader() {
    const day = _warDay();
    return `<header class="site-header" role="banner">
      <div class="header-inner container">
        <div class="header-left">
          <a href="index.html" class="logo-link" aria-label="GeoWire home">
            <span class="logo-mark">GW</span>
            <span class="site-title">GeoWire</span>
          </a>
          <div class="war-status-pill" aria-label="Recession status" style="background:rgba(74,158,255,.12);border-color:rgba(74,158,255,.3);color:#4a9eff">
            <span class="pulse-dot" aria-hidden="true" style="background:#4a9eff"></span>
            <span>RECESSION RISK 42% · RISING</span>
          </div>
        </div>
        <div class="header-right">
          ${renderLanguageToggle()}
          <div class="utc-clock" id="utc-clock" aria-label="Current UTC time">--:--:-- UTC</div>
          <button class="hamburger" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="main-nav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>`;
  }

  // ─── NAV ─────────────────────────────────────────────────────────────────────
  function renderNav(activePage) {
    const items = GEOWIRE.navigationItems.map(item => {
      const isActive = item.href === activePage || item.href.replace('.html','') === activePage;
      return `<a href="${item.href}" class="nav-link ${isActive ? 'nav-link-active' : ''}" data-nav-label="${item.label}" aria-current="${isActive ? 'page' : 'false'}">${item.label}</a>`;
    }).join('');
    return `<nav class="main-nav" id="main-nav" role="navigation" aria-label="Main navigation">
      <div class="nav-inner container">${items}</div>
    </nav>`;
  }

  // ─── FOOTER ──────────────────────────────────────────────────────────────────
  function renderFooter() {
    const year = new Date().getFullYear();
    const secondaryLinks = (GEOWIRE.secondaryNavItems || [])
      .map(n => `<a href="${n.href}" style="color:var(--text-3,#8b949e);font-size:12px;text-decoration:none">${n.label}</a>`)
      .join('<span style="color:var(--text-3,#8b949e);font-size:12px"> · </span>');
    return `<footer class="site-footer" role="contentinfo">
      <div class="footer-inner container">
        <div class="footer-brand">
          <span class="logo-mark small">GW</span>
          <span><strong>GeoWire</strong> — Recession Intelligence Platform</span>
        </div>
        <div class="footer-links">
          ${GEOWIRE.navigationItems.map(n=>`<a href="${n.href}">${n.label}</a>`).join('')}
        </div>
        ${secondaryLinks ? `<div class="footer-secondary-links" style="margin-top:12px;line-height:2">${secondaryLinks}</div>` : ''}
        <div class="footer-legal">
          <p>© ${year} GeoWire. All analysis is original unless attributed. Confidence badges indicate source methodology, not certainty.</p>
          <p class="footer-disclaimer">GeoWire is an independent recession intelligence platform. All analysis is original unless attributed. Confidence badges indicate source methodology, not certainty. Not financial or political advice.</p>
        </div>
      </div>
    </footer>`;
  }

  // ─── UTC CLOCK ───────────────────────────────────────────────────────────────
  function startClock() {
    function tick() {
      const el = document.getElementById('utc-clock');
      if (!el) return;
      const now = new Date();
      el.textContent = now.toISOString().slice(11,19) + ' UTC';
    }
    tick();
    setInterval(tick, 1000);
  }

  // ─── WAR COST TICKER ─────────────────────────────────────────────────────────
  function renderWarCostTicker() {
    const wc = GEOWIRE.warCost;
    const start = new Date(wc.startDate).getTime();
    const day = _warDay();
    return `<div class="war-cost-module">
      <div class="war-cost-header">
        ${renderSectionHeading('War Cost Tracker', 'US-Iran — Operation Epic Fury')}
        ${renderConfidenceBadge('inferred')}
        ${renderSourceLabel(wc.source)}
        ${renderLiveBadge(false)}
      </div>
      <div class="war-cost-grid">
        <div class="war-cost-card">
          <span class="war-cost-label">Total Estimated Cost</span>
          <span class="war-cost-value" id="total-cost">Calculating...</span>
        </div>
        <div class="war-cost-card">
          <span class="war-cost-label">Daily Rate</span>
          <span class="war-cost-value">$${(wc.dailyCostUSD/1e9).toFixed(2)}B/day</span>
        </div>
        <div class="war-cost-card">
          <span class="war-cost-label">Per Second</span>
          <span class="war-cost-value">$${wc.perSecond.toLocaleString()}</span>
        </div>
        <div class="war-cost-card">
          <span class="war-cost-label">Day</span>
          <span class="war-cost-value">${day}</span>
        </div>
      </div>
      <p class="war-cost-note">${wc.note}</p>
    </div>`;
  }

  function startWarCostCounter() {
    const wc = GEOWIRE.warCost;
    const start = new Date(wc.startDate).getTime();
    function tick() {
      const el = document.getElementById('total-cost');
      if (!el) return;
      const elapsed = (Date.now() - start) / 1000;
      const total = elapsed * wc.perSecond;
      el.textContent = '$' + _fmtBig(total);
    }
    tick();
    setInterval(tick, 1000);
  }

  function _fmtBig(n) {
    if (n >= 1e12) return (n/1e12).toFixed(3) + 'T';
    if (n >= 1e9)  return (n/1e9).toFixed(3) + 'B';
    if (n >= 1e6)  return (n/1e6).toFixed(2) + 'M';
    return n.toLocaleString();
  }

  // ─── TIMELINE ────────────────────────────────────────────────────────────────
  function renderTimeline(events) {
    const items = (events || GEOWIRE.timelineEvents).map(ev => `
      <li class="timeline-entry timeline-${ev.type}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <div class="timeline-body">
          <span class="timeline-date">${_fmtDate(ev.date)}</span>
          <span class="timeline-type tag-${ev.type}">${ev.type}</span>
          <p class="timeline-text">${ev.text}</p>
          <div class="timeline-meta">
            ${renderConfidenceBadge(ev.confidence)}
            ${renderSourceLabel(ev.source)}
          </div>
        </div>
      </li>`).join('');
    return `<ol class="timeline" aria-label="Conflict timeline">${items}</ol>`;
  }

  // ─── RISK HEATMAP ────────────────────────────────────────────────────────────
  function renderRiskHeatmap() {
    const top5 = GEOWIRE.countries.slice(0, 5);
    return `<div class="risk-heatmap">
      ${top5.map(c => `
        <div class="heatmap-card threat-${c.threatLevel}">
          <span class="heatmap-flag">${c.flag}</span>
          <div class="heatmap-body">
            <strong>${c.name}</strong>
            <span class="threat-label threat-${c.threatLevel}">${c.threatLevel.toUpperCase()}</span>
            <span class="heatmap-action">${c.latestAction.slice(0,80)}${c.latestAction.length>80?'...':''}</span>
          </div>
          ${renderConfidenceBadge(c.confidence)}
        </div>`).join('')}
    </div>`;
  }

  // ─── SUPPLY CHAIN STATUS ─────────────────────────────────────────────────────
  function renderSupplyChain() {
    const routes = GEOWIRE.tradeData.shippingRoutes;
    return `<div class="supply-chain">
      ${routes.map(r => `
        <div class="supply-row">
          <span class="supply-route">${r.route}</span>
          <span class="supply-status status-${r.risk}">${r.status}</span>
          ${renderConfidenceBadge(r.confidence)}
          ${renderSourceLabel(r.source)}
        </div>`).join('')}
    </div>`;
  }

  // ─── MARKET TICKER (static render, api.js updates values) ───────────────────
  function renderMarketTicker() {
    const md = GEOWIRE.marketData;
    const items = Object.entries(md).map(([key, m]) => {
      const chCls = m.change >= 0 ? 'positive' : 'negative';
      const chStr = m.change >= 0 ? `▲ +${m.change.toFixed(1)}%` : `▼ ${m.change.toFixed(1)}%`;
      return `<div class="ticker-item" id="ticker-${key}">
        <span class="ticker-label" data-ticker-label="${key}" data-en="${m.label}">${m.label}</span>
        <span class="ticker-value">${m.value.toLocaleString()} <small>${m.unit}</small></span>
        <span class="ticker-change ${chCls}">${chStr}</span>
      </div>`;
    }).join('');
    return `<div class="market-ticker" role="marquee" aria-label="Live market data">
      <div class="ticker-badge-row">
        <span id="ticker-live-badge">${renderLiveBadge(false)}</span>
        ${renderSourceLabel('FRED / CoinGecko / EIA')}
      </div>
      <div class="ticker-track">${items}${items}</div>
    </div>`;
  }

  // ─── INIT (call once on page load) ──────────────────────────────────────────
  function init() {
    // Hamburger nav toggle
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', open);
      });
    }
    startClock();
    _applyLang(_getLang());
  }

  // Public API
  return {
    renderConfidenceBadge, renderSourceLabel, renderLiveBadge,
    renderShareButtons, renderAdSlot, renderSectionHeading,
    renderMetricRow, renderNewsCard, renderArticleCard,
    renderContradictionFlag, renderUpdateLog, renderLanguageToggle,
    renderEmailCapture, handleEmailSubmit, stubEmailCapture,
    renderHeader, renderNav, renderFooter,
    renderWarCostTicker, startWarCostCounter, startClock,
    renderTimeline, renderRiskHeatmap, renderSupplyChain,
    renderMarketTicker, setLang, init,
  };
})();

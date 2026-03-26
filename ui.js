// ui.js — GeoWire shared rendering functions
// All HTML generation lives here. Pages call these; no duplicated markup.

const UI = (() => {

  // ─── INTERNAL HELPERS ────────────────────────────────────────────────────────
  function _getLang() { return localStorage.getItem('geowire-lang') || 'en'; }
  function _t(enText, faText) { return _getLang() === 'fa' ? faText : enText; }
  function _warDay() {
    const start = new Date(GEOWIRE.siteMeta.warStartDate);
    return Math.max(1, Math.ceil((Date.now() - start) / 86400000));
  }
  function _encode(str) { return encodeURIComponent(str); }
  function _escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function _fmtTime(iso) {
    try {
      const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
      if (diff < 1) return 'just now';
      if (diff < 60) return `${diff}m ago`;
      if (diff < 1440) return `${Math.floor(diff/60)}h ago`;
      return new Date(iso).toLocaleDateString('en-GB', { day:'numeric', month:'short' });
    } catch { return iso || ''; }
  }
  function _fmtDate(dateStr) {
    try { return new Date(dateStr).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }); }
    catch { return dateStr || ''; }
  }
  function _fmtBig(n) {
    if (n >= 1e12) return (n/1e12).toFixed(3) + 'T';
    if (n >= 1e9)  return (n/1e9).toFixed(3) + 'B';
    if (n >= 1e6)  return (n/1e6).toFixed(2) + 'M';
    return Math.round(n).toLocaleString();
  }

  // ─── CONFIDENCE BADGE ────────────────────────────────────────────────────────
  function renderConfidenceBadge(level) {
    const conf = (GEOWIRE.confidenceLevels || {})[level] || GEOWIRE.confidenceLevels.inferred;
    return `<span class="confidence-badge confidence-${_escHtml(level)}" title="${_escHtml(conf.description)}">${conf.emoji} ${conf.label}</span>`;
  }

  // ─── SOURCE LABEL ────────────────────────────────────────────────────────────
  function renderSourceLabel(source, freshness) {
    const time = freshness ? ` <span class="freshness">${_fmtTime(freshness)}</span>` : '';
    return `<span class="source-label">Source: <strong>${_escHtml(source || '—')}</strong>${time}</span>`;
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
    return `<div class="share-cluster" aria-label="Share this">
      <a class="share-btn share-x"    href="https://x.com/intent/tweet?text=${_encode(fullText)}" target="_blank" rel="noopener" aria-label="Share on X">𝕏 Share</a>
      <a class="share-btn share-tg"   href="https://t.me/share/url?url=${_encode(url)}&text=${_encode(text)}" target="_blank" rel="noopener" aria-label="Share on Telegram">✈ Telegram</a>
      <a class="share-btn share-wa"   href="https://wa.me/?text=${_encode(fullText)}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">📱 WhatsApp</a>
      <button class="share-btn share-copy share-btn-copy" type="button" aria-label="Copy link" onclick="UI._copyLink('${_encode(url)}',this)">🔗 Copy<span class="copy-toast">Copied!</span></button>
    </div>`;
  }

  function _copyLink(encodedUrl, btn) {
    navigator.clipboard.writeText(decodeURIComponent(encodedUrl)).then(() => {
      const toast = btn.querySelector('.copy-toast');
      if (toast) { toast.style.opacity='1'; setTimeout(()=>{ toast.style.opacity=''; },1800); }
    });
  }

  // ─── AD SLOT ─────────────────────────────────────────────────────────────────
  function renderAdSlot(name) {
    return `<div class="ad-slot" data-slot="${_escHtml(name)}" aria-label="Advertisement"><span class="ad-label">Advertisement</span><ins class="adsbygoogle" style="display:block;width:100%;min-height:90px;" data-ad-client="ca-pub-5068519853957013" data-ad-slot="${_escHtml(name)}" data-ad-format="auto" data-full-width-responsive="true"></ins></div>`;
  }

  // ─── SECTION HEADING ─────────────────────────────────────────────────────────
  function renderSectionHeading(title, subtitle) {
    return `<div class="section-heading"><h2>${_escHtml(title)}</h2>${subtitle ? `<p class="section-subtitle">${_escHtml(subtitle)}</p>` : ''}</div>`;
  }

  // ─── LANGUAGE TOGGLE ─────────────────────────────────────────────────────────
  function renderLanguageToggle() {
    const lang = _getLang();
    return `<div class="lang-toggle" role="group" aria-label="Language selector">
      <button class="lang-btn ${lang==='en'?'active':''}" onclick="UI.setLang('en')" aria-pressed="${lang==='en'}">EN</button>
      <button class="lang-btn ${lang==='fa'?'active':''}" onclick="UI.setLang('fa')" aria-pressed="${lang==='fa'}">FA</button>
    </div>`;
  }

  function setLang(lang) {
    localStorage.setItem('geowire-lang', lang);
    _applyLang(lang);
  }

  function _applyLang(lang) {
    const fa = GEOWIRE.farsiLabels;
    const isFa = lang === 'fa';
    const titleEl = document.querySelector('.site-title');
    if (titleEl) { titleEl.textContent = isFa ? fa.siteTitle : 'GeoWire'; titleEl.dir = isFa ? 'rtl' : 'ltr'; }
    const headlineEl = document.querySelector('.homepage-headline');
    if (headlineEl) { headlineEl.textContent = isFa ? fa.homepageHeadline : (headlineEl.dataset.en || headlineEl.textContent); headlineEl.dir = isFa ? 'rtl' : 'ltr'; }
    document.querySelectorAll('[data-nav-label]').forEach(el => {
      const k = el.dataset.navLabel;
      el.textContent = isFa ? (fa.navItems[k] || k) : k;
      el.dir = isFa ? 'rtl' : 'ltr';
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
      btn.setAttribute('aria-pressed', btn.textContent === lang.toUpperCase());
    });
  }

  // ─── EMAIL CAPTURE ───────────────────────────────────────────────────────────
  const EMAIL_KEY = 'geowire-subscribed';
  function isSubscribed() { try { return !!localStorage.getItem(EMAIL_KEY); } catch(_) { return false; } }
  function markSubscribed(email) { try { localStorage.setItem(EMAIL_KEY, email); } catch(_) {} }

  function stubEmailCapture(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return { success: false, message: 'Please enter a valid email address.' };
    markSubscribed(email);
    return { success: true, message: "You're on the list. First brief coming tomorrow." };
  }

  function renderEmailCapture() {
    if (isSubscribed()) return renderEmailCaptureSuccess();
    const isFa = _getLang() === 'fa';
    const title = isFa ? 'خبرنامه روزانه GeoWire — رایگان' : 'Get the GeoWire Daily Brief — Free';
    const sub   = isFa ? 'هوش تعارض، سیگنال‌های بازار و تحلیل — هر روز صبح.' : 'Conflict intelligence, market signals, and analysis — every morning.';
    const ph    = isFa ? 'ایمیل شما' : 'your@email.com';
    const btn   = isFa ? 'عضویت' : 'Subscribe Free';
    return `<div class="email-capture" id="email-capture-block" dir="${isFa?'rtl':'ltr'}">
      <div class="email-capture-inner">
        <div class="email-capture-icon">📬</div>
        <h3 class="email-capture-title">${title}</h3>
        <p class="email-capture-sub">${sub}</p>
        <form class="email-form" onsubmit="UI.handleEmailSubmit(event)" novalidate>
          <div class="email-form-row">
            <input type="email" id="email-input" class="email-input" placeholder="${ph}" aria-label="Email address" required autocomplete="email">
            <button type="submit" class="btn-subscribe">${btn}</button>
          </div>
        </form>
        <p id="email-msg" class="email-msg" aria-live="polite"></p>
        <p class="email-note">📭 No spam. Unsubscribe anytime.</p>
      </div>
    </div>`;
  }

  function renderEmailCaptureSuccess() {
    return `<div class="email-capture email-capture-done"><div class="email-capture-inner" style="text-align:center;"><div style="font-size:40px;margin-bottom:12px;">✅</div><h3 class="email-capture-title">You're on the list</h3><p class="email-capture-sub">First brief coming tomorrow morning.</p></div></div>`;
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('email-input');
    const msg   = document.getElementById('email-msg');
    if (!input || !msg) return;
    const result = stubEmailCapture(input.value.trim());
    msg.textContent = result.message;
    msg.className = `email-msg ${result.success ? 'email-msg-success' : 'email-msg-error'}`;
    if (result.success) {
      input.value = '';
      setTimeout(() => { const b = document.getElementById('email-capture-block'); if (b) b.outerHTML = renderEmailCaptureSuccess(); }, 1800);
    }
  }

  // ─── HEADER ──────────────────────────────────────────────────────────────────
  function renderHeader() {
    const day = _warDay();
    return `<header class="site-header" role="banner">
      <div class="header-inner container">
        <div class="header-left">
          <a href="index.html" class="logo-link" aria-label="GeoWire home">
            <span class="logo-mark">GW</span>
            <div class="logo-text-group">
              <span class="site-title">GeoWire</span>
              <span class="site-tagline">GLOBAL INTELLIGENCE</span>
            </div>
          </a>
          <div class="war-status-pill" aria-label="Conflict status">
            <span class="pulse-dot" aria-hidden="true"></span>
            <span>LIVE — IRAN WAR DAY ${day}</span>
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
      const isActive = item.href === activePage || item.href === activePage + '.html' || item.href.replace('.html','') === activePage;
      return `<a href="${_escHtml(item.href)}" class="nav-link ${isActive ? 'nav-link-active' : ''}" data-nav-label="${_escHtml(item.label)}" aria-current="${isActive ? 'page' : 'false'}">${_escHtml(item.label)}</a>`;
    }).join('');
    return `<nav class="main-nav" id="main-nav" role="navigation" aria-label="Main navigation">
      <div class="nav-inner container">${items}</div>
    </nav>`;
  }

  // ─── FOOTER ──────────────────────────────────────────────────────────────────
  function renderFooter() {
    const year = new Date().getFullYear();
    const links = GEOWIRE.navigationItems.map(n=>`<a href="${_escHtml(n.href)}">${_escHtml(n.label)}</a>`).join('');
    return `<footer class="site-footer" role="contentinfo">
      <div class="footer-inner container">
        <div class="footer-brand">
          <span class="logo-mark small">GW</span>
          <span><strong>GeoWire</strong> — Global Intelligence Platform</span>
        </div>
        <div class="footer-links">${links}</div>
        <div class="footer-legal">
          <p>© ${year} GeoWire. All analysis is original unless attributed. Confidence badges indicate source methodology, not certainty.</p>
          <p class="footer-disclaimer">GeoWire is an independent intelligence platform. Seed data is editorial/demo content unless marked LIVE. Not financial or political advice.</p>
        </div>
      </div>
    </footer>`;
  }

  // ─── UTC CLOCK ───────────────────────────────────────────────────────────────
  function startClock() {
    function tick() {
      const el = document.getElementById('utc-clock');
      if (!el) return;
      el.textContent = new Date().toISOString().slice(11,19) + ' UTC';
    }
    tick();
    setInterval(tick, 1000);
  }

  // ─── WAR COST TICKER ─────────────────────────────────────────────────────────
  function renderWarCostTicker() {
    const wc = GEOWIRE.warCost;
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
          <span class="war-cost-value" id="total-cost">Calculating…</span>
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
          <span class="war-cost-label">Conflict Day</span>
          <span class="war-cost-value">${day}</span>
        </div>
      </div>
      <p class="war-cost-note">${_escHtml(wc.note)}</p>
    </div>`;
  }

  function startWarCostCounter() {
    const start = new Date(GEOWIRE.warCost.startDate).getTime();
    const perSec = GEOWIRE.warCost.perSecond;
    function tick() {
      const el = document.getElementById('total-cost');
      if (!el) return;
      el.textContent = '$' + _fmtBig((Date.now() - start) / 1000 * perSec);
    }
    tick();
    setInterval(tick, 1000);
  }

  // ─── MARKET TICKER ───────────────────────────────────────────────────────────
  function renderMarketTicker() {
    const md = GEOWIRE.marketData;
    const items = Object.entries(md).map(([key, m]) => {
      if (m.status === 'CLOSED') {
        return `<div class="ticker-item" id="ticker-${key}">
          <span class="ticker-label" data-ticker-label="${key}" data-en="${_escHtml(m.label)}">${_escHtml(m.label)}</span>
          <span class="ticker-value"><strong class="ticker-closed">CLOSED</strong></span>
          <span class="ticker-change negative">▼ ${Math.abs(m.change).toFixed(1)}%</span>
        </div>`;
      }
      const chCls = m.change >= 0 ? 'positive' : 'negative';
      const chStr = m.change >= 0 ? `▲ +${m.change.toFixed(1)}%` : `▼ ${Math.abs(m.change).toFixed(1)}%`;
      const valStr = typeof m.value === 'number' && m.value > 1000 ? m.value.toLocaleString() : m.value;
      return `<div class="ticker-item" id="ticker-${key}">
        <span class="ticker-label" data-ticker-label="${key}" data-en="${_escHtml(m.label)}">${_escHtml(m.label)}</span>
        <span class="ticker-value">${valStr} <small>${_escHtml(m.unit||'')}</small></span>
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

  // ─── TIMELINE ────────────────────────────────────────────────────────────────
  function renderTimeline(events) {
    const evs = events || GEOWIRE.timelineEvents;
    const items = evs.map(ev => `
      <li class="timeline-entry timeline-${_escHtml(ev.type)}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <div class="timeline-body">
          <span class="timeline-date">${_fmtDate(ev.date)}</span>
          <span class="timeline-type tag-${_escHtml(ev.type)}">${_escHtml(ev.type.toUpperCase())}</span>
          <p class="timeline-text">${_escHtml(ev.text)}</p>
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
    const cards = top5.map(c => `
      <div class="heatmap-card threat-border-${c.threatLevel}">
        <span class="heatmap-flag">${c.flag}</span>
        <div class="heatmap-body">
          <div class="heatmap-name">${_escHtml(c.name)}</div>
          <span class="threat-label threat-${_escHtml(c.threatLevel)}">${c.threatLevel.toUpperCase()}</span>
          <span class="heatmap-action">${_escHtml(c.latestAction.slice(0,90))}${c.latestAction.length>90?'…':''}</span>
        </div>
        ${renderConfidenceBadge(c.confidence)}
      </div>`).join('');
    return `<div class="risk-heatmap">${cards}</div>`;
  }

  // ─── SUPPLY CHAIN STATUS ─────────────────────────────────────────────────────
  function renderSupplyChain() {
    const routes = GEOWIRE.tradeData.shippingRoutes;
    const rows = routes.map(r => `
      <div class="supply-row">
        <span class="supply-route">${_escHtml(r.route)}</span>
        <span class="supply-status status-${_escHtml(r.risk)}">${_escHtml(r.status)}</span>
        ${renderConfidenceBadge(r.confidence)}
        ${renderSourceLabel(r.source)}
      </div>`).join('');
    return `<div class="supply-chain">${rows}</div>`;
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
        ${item.url && item.url !== '#' ? `<a href="${_escHtml(item.url)}" target="_blank" rel="noopener">${_escHtml(item.headline)}</a>` : _escHtml(item.headline)}
        ${item.url === '#' ? '<span class="coming-soon">Demo</span>' : ''}
      </h3>
      <p class="news-summary">${_escHtml(item.summary)}</p>
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
        <span class="article-category">${_escHtml(article.category)}</span>
        ${renderConfidenceBadge(article.confidence)}
        ${isComingSoon ? '<span class="coming-soon">Coming soon</span>' : ''}
      </div>
      <h3 class="article-card-title">
        ${!isComingSoon ? `<a href="${_escHtml(article.link)}">${_escHtml(article.title)}</a>` : _escHtml(article.title)}
      </h3>
      <p class="article-card-subtitle">${_escHtml(article.subtitle)}</p>
      <p class="article-card-summary">${_escHtml(article.summary)}</p>
      <div class="article-card-footer">
        <span class="article-date">${_fmtDate(article.date)}</span>
        <span class="article-readtime">${article.readTime} min read</span>
        ${renderSourceLabel(article.source)}
        ${!isComingSoon ? renderShareButtons(article.title, GEOWIRE.siteMeta.baseUrl + '/' + article.link) : ''}
        ${!isComingSoon ? `<a href="${_escHtml(article.link)}" class="btn-read">Read →</a>` : ''}
      </div>
    </article>`;
  }

  // ─── UPDATE LOG ──────────────────────────────────────────────────────────────
  function renderUpdateLog(entries) {
    if (!entries || entries.length === 0) return '<p class="no-updates">No updates found for this period.</p>';
    return `<ul class="update-log">${entries.map(e => `
      <li class="update-entry">
        <span class="update-category tag-${_escHtml((e.category||'').toLowerCase())}">${_escHtml(e.category||'UPDATE')}</span>
        <div class="update-body">
          <strong>${_escHtml(e.item||'')}</strong>
          <span class="update-change">${_escHtml(e.change||'')}</span>
        </div>
        <div class="update-meta">
          ${renderConfidenceBadge(e.confidence)}
          ${renderSourceLabel(e.source, e.timestamp)}
        </div>
      </li>`).join('')}
    </ul>`;
  }

  // ─── CONTRADICTION FLAG ──────────────────────────────────────────────────────
  function renderContradictionFlag(item) {
    return `<div class="contradiction-card">
      <div class="contradiction-header">⚠️ <strong>Disputed</strong> — Conflicting claims</div>
      <div class="contradiction-body">
        <div class="claim claim-a"><strong>${_escHtml(item.sourceA)}:</strong> ${_escHtml(item.claimA)}</div>
        <div class="vs">vs.</div>
        <div class="claim claim-b"><strong>${_escHtml(item.sourceB)}:</strong> ${_escHtml(item.claimB)}</div>
      </div>
      ${renderSourceLabel('Multiple sources')}
    </div>`;
  }

  // ─── INIT ────────────────────────────────────────────────────────────────────
  function init() {
    const toggle = document.getElementById('nav-toggle');
    const nav    = document.getElementById('main-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', open);
        toggle.classList.toggle('is-open', open);
      });
    }
    startClock();
    _applyLang(_getLang());
    // Copy link buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.share-btn-copy');
      if (!btn) return;
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        const toast = btn.querySelector('.copy-toast');
        if (toast) { toast.style.opacity='1'; setTimeout(()=>{ toast.style.opacity=''; }, 1800); }
      }).catch(()=>{});
    });
  }

  // ─── RECESSION GAUGE ────────────────────────────────────────────────────────
  function renderRecessionGauge(probability, momentum, confidence, lastUpdated) {
    // SVG semicircle gauge: 280px wide, 160px tall arc
    const W = 280, H = 160, cx = W / 2, cy = H - 10, r = 120;
    const toRad = (deg) => (deg * Math.PI) / 180;

    // Arc from 180° to 0° (left to right) = 0% to 100%
    function arcPoint(pct) {
      const angle = 180 - pct * 180;
      return {
        x: cx + r * Math.cos(toRad(angle)),
        y: cy - r * Math.sin(toRad(angle)),
      };
    }

    function describeArc(startPct, endPct, fillR) {
      const s = arcPoint(startPct), e = arcPoint(endPct);
      const large = (endPct - startPct) > 0.5 ? 1 : 0;
      return `M ${s.x} ${s.y} A ${fillR} ${fillR} 0 ${large} 1 ${e.x} ${e.y}`;
    }

    // Zone arcs (track)
    const zones = [
      { start: 0,    end: 0.20, color: '#2D6A4F' },
      { start: 0.20, end: 0.35, color: '#F59E0B' },
      { start: 0.35, end: 0.50, color: '#EA580C' },
      { start: 0.50, end: 1.00, color: '#E63946' },
    ];

    const trackArcs = zones.map(z =>
      `<path d="${describeArc(z.start, z.end, r)}" stroke="${z.color}" stroke-width="14" fill="none" stroke-linecap="butt" opacity="0.7"/>`
    ).join('');

    // Needle
    const needlePct = Math.min(1, Math.max(0, probability / 100));
    const np = arcPoint(needlePct);
    const needleColor = needlePct < 0.2 ? '#2D6A4F' : needlePct < 0.35 ? '#F59E0B' : needlePct < 0.5 ? '#EA580C' : '#E63946';

    // Relative time
    let updatedStr = '';
    if (lastUpdated) {
      const diff = (Date.now() - new Date(lastUpdated)) / 3600000;
      if (diff < 1) updatedStr = 'Updated < 1 hour ago';
      else if (diff < 24) updatedStr = `Updated ${Math.round(diff)}h ago`;
      else updatedStr = `Updated ${Math.round(diff / 24)}d ago`;
    }

    // Momentum + confidence badge colors
    const momColor = momentum === 'RISING' ? '#f87171' : momentum === 'FALLING' ? '#4ade80' : '#fbbf24';
    const momArrow = momentum === 'RISING' ? '↑' : momentum === 'FALLING' ? '↓' : '→';
    const confColor = confidence === 'HIGH' ? '#4ade80' : confidence === 'MEDIUM' ? '#fbbf24' : '#94a3b8';

    return `
      <div class="recession-gauge">
        <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
          <!-- Background track -->
          <path d="${describeArc(0, 1, r)}" stroke="#334155" stroke-width="14" fill="none" stroke-linecap="butt"/>
          <!-- Colored zones -->
          ${trackArcs}
          <!-- Needle -->
          <line x1="${cx}" y1="${cy}" x2="${np.x}" y2="${np.y}" stroke="${needleColor}" stroke-width="3" stroke-linecap="round"/>
          <circle cx="${cx}" cy="${cy}" r="6" fill="${needleColor}"/>
          <!-- Zone labels -->
          <text x="18" y="${H - 14}" fill="#4ade80" font-size="9" font-family="monospace">LOW</text>
          <text x="${W - 30}" y="${H - 14}" fill="#f87171" font-size="9" font-family="monospace">HIGH</text>
        </svg>
        <div class="gauge-prob-number" style="color:${needleColor}">${probability}%</div>
        <div class="gauge-label">6-Month Recession Probability</div>
        <div class="gauge-badges">
          <span class="status-badge" style="background:rgba(0,0,0,.3);color:${momColor};border-color:${momColor}40">${momentum} ${momArrow}</span>
          <span class="status-badge" style="background:rgba(0,0,0,.3);color:${confColor};border-color:${confColor}40">${confidence} CONFIDENCE</span>
        </div>
        ${updatedStr ? `<div class="gauge-updated">${updatedStr}</div>` : ''}
      </div>`;
  }

  // ─── FACTOR HEATMAP ─────────────────────────────────────────────────────────
  function renderFactorHeatmap(factorScores) {
    const cards = Object.entries(factorScores).map(([key, factor]) => {
      const name = (typeof RecessionModel !== 'undefined') ? RecessionModel.formatFactorName(key) : key;
      const statusClass = (typeof RecessionModel !== 'undefined') ? RecessionModel.getStatusClass(factor.status) : 'status-stable';
      const fillColor = (typeof RecessionModel !== 'undefined') ? RecessionModel.getStatusColor(factor.status) : '#94A3B8';
      const weight = Math.round((factor.weight || 0) * 100);
      return `
        <a class="factor-card" href="macro.html?factor=${key}" data-status="${factor.status}">
          <div class="factor-card-header">
            <span class="factor-card-name">${name}</span>
            <span class="status-badge ${statusClass}">${factor.status}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px;">
            <div class="factor-score-bar" style="flex:1">
              <div class="factor-score-fill" style="width:${factor.score}%;background:${fillColor}"></div>
            </div>
            <span style="font-size:12px;font-weight:700;color:${fillColor};flex-shrink:0">${factor.score}</span>
          </div>
          <div class="factor-driver">${factor.topDriver}</div>
          <div style="margin-top:6px;font-size:10px;color:var(--gw-text-secondary)">Weight: ${weight}%</div>
        </a>`;
    });
    return `<div class="factor-heatmap">${cards.join('')}</div>`;
  }

  // ─── WHAT CHANGED TODAY ──────────────────────────────────────────────────────
  function renderWhatChangedToday(items) {
    const rows = (items || []).map(item => {
      const impactClass = item.impact === 'POSITIVE' ? 'impact-positive' : item.impact === 'NEGATIVE' ? 'impact-negative' : 'impact-neutral';
      return `
        <div class="what-changed-item">
          <div class="wc-time">${item.time || ''}</div>
          <div class="wc-body">
            <div class="wc-factor">${item.factor}</div>
            <div class="wc-change">${item.change}</div>
            <div class="wc-source">Source: ${item.source || 'GeoWire'}</div>
          </div>
          <div class="what-changed-impact ${impactClass}">${item.impact}</div>
        </div>`;
    });
    return `<div class="what-changed-list">${rows.join('')}</div>`;
  }

  // ─── HISTORICAL COMPARISON ───────────────────────────────────────────────────
  function renderHistoricalComparison(comparisons) {
    const cards = (comparisons || []).map(c => `
      <div class="historical-card">
        <div class="historical-event">${c.event}</div>
        <div class="historical-stat"><span class="historical-stat-label">Oil shock</span><span class="historical-stat-value">${c.oilChange}</span></div>
        <div class="historical-stat"><span class="historical-stat-label">Recession lag</span><span class="historical-stat-value">${c.recessionLag}</span></div>
        <div class="similarity-bar"><div class="similarity-fill" style="width:${c.similarity}%"></div></div>
        <div class="similarity-label">${c.similarity}% similarity to current crisis</div>
        <div class="historical-notes">${c.notes}</div>
      </div>`);
    return `<div class="historical-grid">${cards.join('')}</div>`;
  }

  // ─── DIVERGENCE STRIP ────────────────────────────────────────────────────────
  function renderDivergenceStrip(divergences) {
    const cards = (divergences || []).map(d => `
      <div class="divergence-card">
        <div class="divergence-title">${d.title}</div>
        <div class="divergence-row">
          <span class="divergence-label">Our model:</span>
          <span class="divergence-value">${d.ours}</span>
        </div>
        <div class="divergence-row">
          <span class="divergence-label">Market:</span>
          <span class="divergence-value">${d.market}</span>
        </div>
        <div class="divergence-thesis">${d.thesis}</div>
      </div>`);
    return `<div class="divergence-strip">${cards.join('')}</div>`;
  }

  // ─── METRIC CARD ─────────────────────────────────────────────────────────────
  function renderMetricCard(label, value, delta, unit, source, deltaClass) {
    const dc = deltaClass || (typeof delta === 'number' ? (delta > 0 ? 'positive' : delta < 0 ? 'negative' : '') : '');
    const deltaArrow = typeof delta === 'number' ? (delta > 0 ? '▲' : delta < 0 ? '▼' : '—') : '';
    const deltaStr = typeof delta === 'number' ? `${deltaArrow} ${Math.abs(delta)}%` : (delta || '');
    return `
      <div class="metric-card">
        <div class="metric-label">${label}</div>
        <div class="metric-value">${value}${unit ? `<small style="font-size:14px;font-weight:400;color:var(--gw-text-secondary);margin-left:4px">${unit}</small>` : ''}</div>
        ${deltaStr ? `<div class="metric-delta ${dc}">${deltaStr}</div>` : ''}
        ${source ? `<div class="source-label">Source: ${source}</div>` : ''}
      </div>`;
  }

  // ─── RECESSION HOMEPAGE WIDGET ────────────────────────────────────────────────
  function renderRecessionWidget(recData) {
    if (!recData) return '';
    const { probability, momentum, confidence, factorScores } = recData;
    // Compute top 3 drivers
    let topDriverKeys = [];
    if (typeof RecessionModel !== 'undefined') {
      const { topDrivers } = RecessionModel.calcProbability(factorScores);
      topDriverKeys = topDrivers;
    } else {
      topDriverKeys = Object.keys(factorScores).slice(0, 3);
    }
    const momArrow = momentum === 'RISING' ? '↑' : momentum === 'FALLING' ? '↓' : '→';
    const momColor = momentum === 'RISING' ? '#f87171' : momentum === 'FALLING' ? '#4ade80' : '#fbbf24';
    const needleColor = probability < 20 ? '#2D6A4F' : probability < 35 ? '#F59E0B' : probability < 50 ? '#EA580C' : '#E63946';

    // Mini gauge SVG (200px)
    const W = 200, H = 115, cx = W/2, cy = H - 8, r = 86;
    const toRad = d => d * Math.PI / 180;
    const arcPt = p => ({ x: cx + r * Math.cos(toRad(180 - p*180)), y: cy - r * Math.sin(toRad(180 - p*180)) });
    const arc = (s,e,fillR) => { const a=arcPt(s),b=arcPt(e),lg=(e-s)>.5?1:0; return `M${a.x} ${a.y} A${fillR} ${fillR} 0 ${lg} 1 ${b.x} ${b.y}`; };
    const np = arcPt(Math.min(1, probability/100));
    const miniGauge = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <path d="${arc(0,1,r)}" stroke="#334155" stroke-width="10" fill="none"/>
      <path d="${arc(0,.20,r)}" stroke="#2D6A4F" stroke-width="10" fill="none" opacity=".7"/>
      <path d="${arc(.20,.35,r)}" stroke="#F59E0B" stroke-width="10" fill="none" opacity=".7"/>
      <path d="${arc(.35,.50,r)}" stroke="#EA580C" stroke-width="10" fill="none" opacity=".7"/>
      <path d="${arc(.50,1,r)}" stroke="#E63946" stroke-width="10" fill="none" opacity=".7"/>
      <line x1="${cx}" y1="${cy}" x2="${np.x}" y2="${np.y}" stroke="${needleColor}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="5" fill="${needleColor}"/>
    </svg>`;

    const formatName = k => typeof RecessionModel !== 'undefined' ? RecessionModel.formatFactorName(k) : k;
    const driverItems = topDriverKeys.map(k => `
      <div class="rw-driver-item">${formatName(k)}: ${(factorScores[k]||{}).topDriver || ''}</div>`).join('');

    return `
      <div class="recession-widget">
        <div class="rw-gauge-side">${miniGauge}</div>
        <div class="rw-info-side">
          <div class="rw-prob-display">
            <span class="rw-prob-number" style="color:${needleColor}">${probability}%</span>
            <span class="rw-prob-label">6-mo recession probability</span>
            <span class="status-badge" style="margin-left:4px;background:rgba(0,0,0,.3);color:${momColor};border-color:${momColor}40">${momentum} ${momArrow}</span>
          </div>
          <div class="rw-drivers">
            <div class="rw-drivers-label">Top drivers</div>
            ${driverItems}
          </div>
          <a href="recession.html" class="rw-cta">See Full Recession Dashboard →</a>
        </div>
      </div>`;
  }

  // Public API
  return {
    renderConfidenceBadge, renderSourceLabel, renderLiveBadge,
    renderShareButtons, renderAdSlot, renderSectionHeading,
    renderNewsCard, renderArticleCard, renderContradictionFlag,
    renderUpdateLog, renderLanguageToggle, renderEmailCapture,
    renderEmailCaptureSuccess, handleEmailSubmit,
    stubEmailCapture, isSubscribed,
    renderHeader, renderNav, renderFooter,
    renderWarCostTicker, startWarCostCounter, startClock,
    renderTimeline, renderRiskHeatmap, renderSupplyChain,
    renderMarketTicker, setLang, init, _copyLink,
    renderRecessionGauge, renderFactorHeatmap, renderWhatChangedToday,
    renderHistoricalComparison, renderDivergenceStrip, renderMetricCard,
    renderRecessionWidget,
  };
})();

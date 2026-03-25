/**
 * GeoWire — ui.js
 * All shared render functions. No page-specific logic.
 * Depends on: content.js (window.GW)
 */

(function () {
  'use strict';
  const GW = window.GW;

  // ─── HELPERS ───────────────────────────────────────────────────────────────

  function isFarsi() {
    return localStorage.getItem(GW.meta.lang.farsiKey) === 'fa';
  }

  function t(en, fa) {
    return isFarsi() && fa ? fa : en;
  }

  function daysSinceConflict() {
    const start = new Date(GW.meta.conflictStart);
    const now = new Date();
    return Math.floor((now - start) / 86400000) + 1;
  }

  function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─── CONFIDENCE BADGE ──────────────────────────────────────────────────────

  function confidenceBadge(key) {
    const c = GW.confidence[key] || GW.confidence.inferred;
    return `<span class="confidence-badge conf-${escHtml(key)}" title="${escHtml(t(c.label, c.labelFa))}">${escHtml(c.icon)} ${escHtml(t(c.label, c.labelFa))}</span>`;
  }

  // ─── LIVE / DEMO BADGE ─────────────────────────────────────────────────────

  function liveBadge(isLive) {
    return isLive
      ? `<span class="badge badge-live"><span class="pulse-dot"></span>LIVE</span>`
      : `<span class="badge badge-demo">DEMO</span>`;
  }

  // ─── CONFLICT CLOCK ────────────────────────────────────────────────────────

  function renderConflictClock(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const day = daysSinceConflict();
    const start = new Date(GW.meta.conflictStart);
    el.innerHTML = `
      <div class="conflict-clock">
        <div class="clock-label">${escHtml(t('Operation Epic Fury', 'عملیات اپیک فیوری'))}</div>
        <div class="clock-day">DAY <span class="clock-num">${day}</span></div>
        <div class="clock-started">Started ${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
      </div>`;
  }

  // ─── TICKER BAR ────────────────────────────────────────────────────────────

  function renderTicker(liveData) {
    const tickers = [
      { id: 'wti',   label: 'WTI' },
      { id: 'brent', label: 'Brent' },
      { id: 'gold',  label: 'Gold' },
      { id: 'dxy',   label: 'DXY' },
      { id: 'btc',   label: 'BTC' },
      { id: 'sp500', label: 'S&P' },
      { id: 'us10y', label: '10Y' },
    ];

    const el = document.getElementById('ticker-inner');
    if (!el) return;

    const items = tickers.map(({ id, label }) => {
      const d = (liveData && liveData[id]) || GW.seedData[id];
      if (!d) return '';
      return `<span class="ticker-item">${escHtml(label)}: <strong>${escHtml(String(d.value))} ${escHtml(d.unit)}</strong></span>`;
    }).join('<span class="ticker-sep">|</span>');

    el.innerHTML = items + items; // duplicate for seamless scroll
  }

  // ─── ARTICLE CARD ──────────────────────────────────────────────────────────

  function articleCard(article) {
    const fa = isFarsi();
    const title = escHtml(fa && article.titleFa ? article.titleFa : article.title);
    const summary = escHtml(fa && article.summaryFa ? article.summaryFa : article.summary);
    const date = new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const tags = (article.tags || []).map(tag =>
      `<span class="tag">${escHtml(tag)}</span>`
    ).join('');

    return `
      <article class="article-card" data-id="${escHtml(article.id)}" data-section="${escHtml(article.section)}">
        <div class="article-meta">
          <span class="article-date">${escHtml(date)}</span>
          ${confidenceBadge(article.confidence)}
          <span class="article-section-tag sect-${escHtml(article.section)}">${escHtml(article.section.toUpperCase())}</span>
        </div>
        <h3 class="article-title">${title}</h3>
        <p class="article-summary">${summary}</p>
        <div class="article-footer">
          <div class="tag-list">${tags}</div>
          <button class="btn-read-more" onclick="GW.ui.openArticle('${escHtml(article.id)}')">Read More →</button>
        </div>
      </article>`;
  }

  // ─── ARTICLE MODAL ─────────────────────────────────────────────────────────

  function openArticle(id) {
    const article = GW.articles.find(a => a.id === id);
    if (!article) return;

    const fa = isFarsi();
    const title = escHtml(fa && article.titleFa ? article.titleFa : article.title);
    const bodyHtml = escHtml(article.body).replace(/\n/g, '<br>').replace(/• /g, '&bull; ');
    const date = new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const modal = document.getElementById('article-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-article">
        <div class="modal-meta">
          <span class="article-date">${escHtml(date)}</span>
          ${confidenceBadge(article.confidence)}
        </div>
        <h2 class="modal-title">${title}</h2>
        <div class="modal-body-text">${bodyHtml}</div>
        <div class="tag-list">${(article.tags || []).map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}</div>
      </div>`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('article-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ─── ARTICLE GRID ──────────────────────────────────────────────────────────

  function renderArticleGrid(targetId, section, limit) {
    const el = document.getElementById(targetId);
    if (!el) return;

    let articles = GW.articles;
    if (section) {
      articles = articles.filter(a => a.section === section);
    }
    if (limit) {
      articles = articles.slice(0, limit);
    }

    if (articles.length === 0) {
      el.innerHTML = `<p class="empty-state">No articles yet for this section.</p>`;
      return;
    }

    el.innerHTML = articles.map(articleCard).join('');
  }

  // ─── MARKET WIDGET ─────────────────────────────────────────────────────────

  function renderMarketWidget(targetId, liveData, isLive) {
    const el = document.getElementById(targetId);
    if (!el) return;

    const items = Object.keys(GW.seedData).map(key => {
      const seed = GW.seedData[key];
      const live = liveData && liveData[key];
      const d = live || seed;
      return `
        <div class="market-item">
          <span class="market-label">${escHtml(d.label)}</span>
          <span class="market-value">${escHtml(String(d.value))} <small>${escHtml(d.unit)}</small></span>
          ${live ? liveBadge(true) : liveBadge(false)}
        </div>`;
    }).join('');

    el.innerHTML = `
      <div class="market-widget">
        <div class="widget-header">
          <h3>${t('Markets', 'بازارها')}</h3>
          ${liveBadge(isLive)}
        </div>
        <div class="market-grid">${items}</div>
      </div>`;
  }

  // ─── DATA TABLE ────────────────────────────────────────────────────────────

  function renderTable(targetId, columns, rows) {
    const el = document.getElementById(targetId);
    if (!el) return;

    const thead = `<tr>${columns.map(c => `<th>${escHtml(c)}</th>`).join('')}</tr>`;
    const tbody = rows.map(row =>
      `<tr>${Object.values(row).map(v => `<td>${escHtml(String(v))}</td>`).join('')}</tr>`
    ).join('');

    el.innerHTML = `
      <div class="table-wrap">
        <table class="gw-table">
          <thead>${thead}</thead>
          <tbody>${tbody}</tbody>
        </table>
      </div>`;
  }

  // ─── CHOKEPOINT STATUS ─────────────────────────────────────────────────────

  function renderChokepointStatus(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;

    const cards = GW.energy.chokepoints.map(cp => {
      const statusClass = `status-${cp.status}`;
      const label = isFarsi() && cp.statusLabelFa ? cp.statusLabelFa : cp.statusLabel;
      const name = isFarsi() && cp.nameFa ? cp.nameFa : cp.name;
      return `
        <div class="chokepoint-card ${statusClass}">
          <div class="cp-header">
            <span class="cp-name">${escHtml(name)}</span>
            <span class="cp-status-pill ${statusClass}">${escHtml(label)}</span>
          </div>
          <div class="cp-flow">Flow: ${escHtml(cp.flow)}</div>
          <p class="cp-notes">${escHtml(cp.notes)}</p>
        </div>`;
    }).join('');

    el.innerHTML = `<div class="chokepoint-grid">${cards}</div>`;
  }

  // ─── COUNTRY CARDS ─────────────────────────────────────────────────────────

  function renderCountryCards(targetId, stanceFilter) {
    const el = document.getElementById(targetId);
    if (!el) return;

    let countries = GW.countries;
    if (stanceFilter) {
      countries = countries.filter(c => c.stance === stanceFilter);
    }

    const cards = countries.map(c => {
      const name = isFarsi() && c.nameFa ? c.nameFa : c.name;
      const role = isFarsi() && c.roleFa ? c.roleFa : c.role;
      const facts = c.keyFacts.map(f => `<li>${escHtml(f)}</li>`).join('');
      return `
        <div class="country-card stance-${escHtml(c.stance)}">
          <div class="country-header">
            <span class="country-flag">${c.flag}</span>
            <div>
              <div class="country-name">${escHtml(name)}</div>
              <div class="country-role">${escHtml(role)}</div>
            </div>
          </div>
          <ul class="country-facts">${facts}</ul>
          <p class="country-status">${escHtml(c.currentStatus)}</p>
        </div>`;
    }).join('');

    el.innerHTML = `<div class="country-grid">${cards}</div>`;
  }

  // ─── HUMANITARIAN SUMMARY ──────────────────────────────────────────────────

  function renderHumanitarianSummary(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const h = GW.humanitarian;

    el.innerHTML = `
      <div class="humanitarian-summary">
        <div class="hum-stat-row">
          <div class="hum-stat">
            <div class="hum-num">${formatNumber(h.idpEstimate)}</div>
            <div class="hum-label">Internally Displaced</div>
          </div>
          <div class="hum-stat">
            <div class="hum-num">${formatNumber(h.refugeeEstimate)}</div>
            <div class="hum-label">Cross-border Refugees</div>
          </div>
          <div class="hum-stat">
            <div class="hum-num">${h.casualties.civilian.confirmed.toLocaleString()}</div>
            <div class="hum-label">Civilian Casualties (est.)</div>
          </div>
          <div class="hum-stat">
            <div class="hum-num">${h.casualties.military.confirmed.toLocaleString()}</div>
            <div class="hum-label">Military Casualties (confirmed)</div>
          </div>
        </div>
      </div>`;
  }

  // ─── NAV BAR ───────────────────────────────────────────────────────────────

  function renderNav(activeSection) {
    const el = document.getElementById('main-nav');
    if (!el) return;

    const links = GW.nav.map(item => {
      const label = isFarsi() && item.labelFa ? item.labelFa : item.label;
      const active = item.id === activeSection ? 'active' : '';
      return `<a href="${escHtml(item.href)}" class="nav-link ${active}">${escHtml(label)}</a>`;
    }).join('');

    el.innerHTML = `
      <nav class="navbar">
        <a href="index.html" class="nav-logo">
          <span class="logo-text">GeoWire</span>
          <span class="logo-sub">${escHtml(t('Signal Through the Noise', 'سیگنال از میان سروصدا'))}</span>
        </a>
        <div class="nav-links">${links}</div>
        <div class="nav-controls">
          <button class="lang-toggle" onclick="GW.ui.toggleLang()" title="Toggle Farsi / English">
            <span id="lang-label">${isFarsi() ? 'EN' : 'فا'}</span>
          </button>
        </div>
      </nav>`;
  }

  // ─── FOOTER ────────────────────────────────────────────────────────────────

  function renderFooter(targetId) {
    const el = document.getElementById(targetId || 'main-footer');
    if (!el) return;
    el.innerHTML = `
      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <strong>GeoWire</strong> — Signal Through the Noise
          </div>
          <div class="footer-links">
            ${GW.nav.map(n => `<a href="${escHtml(n.href)}">${escHtml(n.label)}</a>`).join('')}
          </div>
          <div class="footer-legal">
            Data sourced from FRED, EIA, CoinGecko, GDELT. Seed fallbacks used when APIs unavailable.
            ${confidenceBadge('inferred')} = model inference, not verified fact.
          </div>
          <div class="footer-ads">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-5068519853957013" data-ad-slot="footer" data-ad-format="auto" data-full-width-responsive="true"></ins>
          </div>
        </div>
      </footer>`;
    // Push AdSense ad
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }

  // ─── LANG TOGGLE ───────────────────────────────────────────────────────────

  function toggleLang() {
    const current = localStorage.getItem(GW.meta.lang.farsiKey);
    if (current === 'fa') {
      localStorage.removeItem(GW.meta.lang.farsiKey);
    } else {
      localStorage.setItem(GW.meta.lang.farsiKey, 'fa');
    }
    window.location.reload();
  }

  // ─── MODAL SETUP ───────────────────────────────────────────────────────────

  function setupModal() {
    // Create modal if not already in DOM
    if (!document.getElementById('article-modal')) {
      const m = document.createElement('div');
      m.id = 'article-modal';
      m.className = 'modal-overlay';
      m.innerHTML = `
        <div class="modal-container">
          <button class="modal-close" onclick="GW.ui.closeModal()">✕</button>
          <div id="modal-body"></div>
        </div>`;
      document.body.appendChild(m);
    }

    // Close on overlay click
    document.getElementById('article-modal').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ─── ADSENSE INIT ──────────────────────────────────────────────────────────

  function initAdsense() {
    if (!GW.meta.adsenseId) return;
    if (document.querySelector('script[src*="adsbygoogle"]')) return;
    const s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GW.meta.adsenseId}`;
    document.head.appendChild(s);
  }

  // ─── SECTION HEADER ────────────────────────────────────────────────────────

  function renderSectionHeader(targetId, title, subtitle) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">${escHtml(title)}</h1>
        ${subtitle ? `<p class="section-subtitle">${escHtml(subtitle)}</p>` : ''}
        <div class="section-divider"></div>
      </div>`;
  }

  // ─── SCENARIO CARD ─────────────────────────────────────────────────────────

  function scenarioCard(article) {
    const fa = isFarsi();
    const title = escHtml(fa && article.titleFa ? article.titleFa : article.title);
    const summary = escHtml(fa && article.summaryFa ? article.summaryFa : article.summary);

    // Extract probability from body
    const probMatch = article.body.match(/Probability estimate:\s*([\d%]+)/);
    const prob = probMatch ? probMatch[1] : '—';

    return `
      <div class="scenario-card" data-id="${escHtml(article.id)}">
        <div class="scenario-header">
          <span class="scenario-prob-badge">${escHtml(prob)}</span>
          ${confidenceBadge(article.confidence)}
        </div>
        <h3 class="scenario-title">${title}</h3>
        <p class="scenario-summary">${summary}</p>
        <button class="btn-read-more" onclick="GW.ui.openArticle('${escHtml(article.id)}')">Full Analysis →</button>
      </div>`;
  }

  function renderScenarios(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const scenarios = GW.articles.filter(a => a.section === 'scenarios');
    if (scenarios.length === 0) {
      el.innerHTML = '<p class="empty-state">No scenarios yet.</p>';
      return;
    }
    el.innerHTML = `<div class="scenario-grid">${scenarios.map(scenarioCard).join('')}</div>`;
  }

  // ─── ANALYSIS Q&A ──────────────────────────────────────────────────────────

  function renderAnalysisQA(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const items = GW.analysis.keyQuestions.map(item => {
      const q = escHtml(isFarsi() && item.qFa ? item.qFa : item.q);
      return `
        <div class="qa-item">
          <div class="qa-question">${q}</div>
          <div class="qa-answer">${escHtml(item.shortAnswer)} ${confidenceBadge(item.confidence)}</div>
        </div>`;
    }).join('');
    el.innerHTML = `<div class="qa-list">${items}</div>`;
  }

  // ─── INIT PAGE ─────────────────────────────────────────────────────────────

  function initPage(activeSection) {
    // RTL for Farsi
    if (isFarsi()) {
      document.documentElement.setAttribute('lang', 'fa');
      document.documentElement.setAttribute('dir', 'rtl');
    }

    renderNav(activeSection);
    setupModal();
    initAdsense();

    // Trigger API fetches (api.js will call back to populate data)
    if (window.GW && GW.api && typeof GW.api.fetchAll === 'function') {
      GW.api.fetchAll().then(liveData => {
        renderTicker(liveData);
        // Dispatch event for page-specific listeners
        document.dispatchEvent(new CustomEvent('gw:livedata', { detail: liveData }));
      }).catch(() => {
        renderTicker(null); // fallback to seed
      });
    } else {
      renderTicker(null);
    }
  }

  // ─── EXPORT ────────────────────────────────────────────────────────────────
  GW.ui = {
    isFarsi,
    t,
    daysSinceConflict,
    confidenceBadge,
    liveBadge,
    renderConflictClock,
    renderTicker,
    articleCard,
    openArticle,
    closeModal,
    renderArticleGrid,
    renderMarketWidget,
    renderTable,
    renderChokepointStatus,
    renderCountryCards,
    renderHumanitarianSummary,
    renderNav,
    renderFooter,
    toggleLang,
    setupModal,
    initAdsense,
    renderSectionHeader,
    scenarioCard,
    renderScenarios,
    renderAnalysisQA,
    initPage,
    formatNumber,
  };

  window.GW = GW;
})();

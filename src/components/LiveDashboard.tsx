'use client';

import LiveMetricCard from './LiveMetricCard';
import { TradingViewTicker } from './TradingViewWidget';
import { useLiveData, useMetrics, useNews, fmt, fmtCurrency } from '@/lib/hooks';
import { COMMODITIES_DATA, TIMELINE_EVENTS, COUNTRIES_DATA } from '@/lib/constants';
import { SEED_LATEST } from '@/lib/seed';

export default function LiveDashboard() {
  const { data: live, loading: liveLoading, lastUpdate } = useLiveData(30000); // 30s refresh
  const { data: metrics } = useMetrics(undefined, 60000);
  const { news } = useNews(10, 120000);

  const warDay = Math.floor((Date.now() - new Date('2026-02-28').getTime()) / 86400000) + 1;

  // Seed data fallback lookup
  const seedMap = Object.fromEntries(SEED_LATEST.map(s => [s.id, s]));

  // Helper to get live value with seed fallback
  const lv = (id: string) => live[id]?.value ?? seedMap[id]?.value ?? null;
  const lb = (id: string) => live[id]?.baseline ?? seedMap[id]?.baseline ?? null;
  const lc = (id: string) => live[id]?.change_pct ?? null;
  const ls = (id: string) => live[id]?.source ?? seedMap[id]?.source ?? '';
  const lu = (id: string) => live[id]?.updated_at ?? '';

  // Top 5 most vulnerable countries
  const topVulnerable = [...COUNTRIES_DATA]
    .sort((a, b) => b.vulnerability - a.vulnerability)
    .slice(0, 5);

  // Supply chain status
  const supplyChainStatus = [
    { name: 'Oil Supply', status: 'critical', pct: 8, statusLabel: 'Near-Blocked' },
    { name: 'LNG Supply', status: 'critical', pct: 6, statusLabel: 'Near-Blocked' },
    { name: 'Fertilizer', status: 'warning', pct: 45, statusLabel: 'Constrained' },
    { name: 'Food Grains', status: 'warning', pct: 62, statusLabel: 'Elevated' },
    { name: 'Metals Supply', status: 'normal', pct: 78, statusLabel: 'Stable' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'critical') return 'text-accent-red';
    if (status === 'warning') return 'text-accent-orange';
    return 'text-accent-green';
  };

  const getStatusDot = (status: string) => {
    if (status === 'critical') return 'bg-accent-red';
    if (status === 'warning') return 'bg-accent-orange';
    return 'bg-accent-green';
  };

  return (
    <div className="space-y-4">
      {/* TradingView Ticker Tape */}
      <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
        <TradingViewTicker />
      </div>

      {/* War Status Banner */}
      <div className="bg-accent-red/10 border border-accent-red/30 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-2">
              <div className="text-accent-red font-heading font-bold text-3xl">Operation Epic Fury</div>
              <div className="text-5xl font-mono font-bold text-accent-orange">Day {warDay}</div>
            </div>
            <div className="text-txt-secondary text-sm font-semibold">
              {metrics['war.ultimatum']?.value || 'Active Ultimatum: 48hr power plant strike threat (Mar 21)'}
            </div>
            <div className="text-txt-dim text-xs mt-2">Started Feb 28, 2026 • {warDay} days of intensive operations</div>
          </div>
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-accent-red">{metrics['war.targets']?.value || '8000'}</div>
              <div className="text-xs text-txt-dim uppercase tracking-wider mt-1">TARGETS STRUCK</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-accent-gold">{metrics['war.us.kia']?.value || '13'}</div>
              <div className="text-xs text-txt-dim uppercase tracking-wider mt-1">US KIA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-accent-orange">{metrics['iran.dead.hrana']?.value || '3220'}</div>
              <div className="text-xs text-txt-dim uppercase tracking-wider mt-1">IRAN DEAD (HRANA)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid - Live from database */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        <LiveMetricCard label="Brent Crude" value={lv('oil.brent')} baseline={lb('oil.brent')} unit="/bbl" source={ls('oil.brent')} prefix="$" updatedAt={lu('oil.brent')} />
        <LiveMetricCard label="WTI Crude" value={lv('oil.wti')} baseline={lb('oil.wti')} unit="/bbl" source={ls('oil.wti')} prefix="$" updatedAt={lu('oil.wti')} />
        <LiveMetricCard label="US Gas Avg" value={lv('gas.national')} baseline={lb('gas.national')} unit="/gal" source={ls('gas.national')} prefix="$" updatedAt={lu('gas.national')} />
        <LiveMetricCard label="S&P 500" value={lv('market.sp500')} baseline={lb('market.sp500')} source={ls('market.sp500')} invertColor updatedAt={lu('market.sp500')} />
        <LiveMetricCard label="Gold" value={lv('metal.gold')} baseline={lb('metal.gold')} unit="/oz" source={ls('metal.gold')} prefix="$" invertColor updatedAt={lu('metal.gold')} />
        <LiveMetricCard label="Hormuz Flow" value={lv('hormuz.oil')} baseline={lb('hormuz.oil')} unit="M bbl/d" source={ls('hormuz.oil')} updatedAt={lu('hormuz.oil')} />
        <LiveMetricCard label="Displacement" value={3200000} baseline={0} unit="people" source="UNHCR" newStat />
        <LiveMetricCard label="Iran Dead" value={parseInt(metrics['iran.dead.hrana']?.value || '3220')} baseline={0} unit="people" source="HRANA" newStat />
      </div>

      {/* Additional Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        <LiveMetricCard label="VIX" value={lv('market.vix')} baseline={lb('market.vix')} source={ls('market.vix')} updatedAt={lu('market.vix')} />
        <LiveMetricCard label="10Y Treasury" value={lv('rate.10y')} baseline={lb('rate.10y')} unit="%" source={ls('rate.10y')} updatedAt={lu('rate.10y')} />
        <LiveMetricCard label="Dollar Index" value={lv('fx.dxy')} baseline={lb('fx.dxy')} source={ls('fx.dxy')} updatedAt={lu('fx.dxy')} />
        <LiveMetricCard label="Bitcoin" value={lv('crypto.btc')} baseline={lb('crypto.btc')} prefix="$" source={ls('crypto.btc')} invertColor updatedAt={lu('crypto.btc')} />
        <LiveMetricCard label="Wheat" value={lv('food.wheat')} baseline={lb('food.wheat')} unit="/bu" prefix="$" source={ls('food.wheat')} updatedAt={lu('food.wheat')} />
        <LiveMetricCard label="Urea" value={lv('fert.urea')} baseline={lb('fert.urea')} unit="/ton" prefix="$" source={ls('fert.urea')} updatedAt={lu('fert.urea')} />
        <LiveMetricCard label="Nasdaq" value={lv('market.nasdaq')} baseline={lb('market.nasdaq')} source={ls('market.nasdaq')} invertColor updatedAt={lu('market.nasdaq')} />
        <LiveMetricCard label="Dow Jones" value={lv('market.dow')} baseline={lb('market.dow')} source={ls('market.dow')} invertColor updatedAt={lu('market.dow')} />
      </div>

      {/* Three Column Layout */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Commodity Impact Summary */}
        <div className="lg:col-span-1 bg-bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-txt-primary mb-4 text-sm uppercase tracking-wider">Commodity Impact Summary</h3>
          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2">
            {COMMODITIES_DATA.slice(0, 12).map(c => {
              const change = +((c.current - c.prewar) / c.prewar * 100).toFixed(1);
              return (
                <div key={c.symbol} className="flex items-center justify-between py-2 px-2 border-b border-border/20 hover:bg-bg-secondary/40 rounded transition-colors">
                  <div>
                    <div className="text-sm font-semibold text-txt-primary">{c.symbol}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-mono text-txt-primary">{c.current}</div>
                    </div>
                    <div className={`text-xs font-mono font-semibold w-16 text-right ${change >= 0 ? 'text-accent-red' : 'text-accent-green'}`}>
                      {change >= 0 ? '+' : ''}{change}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-1 bg-bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-txt-primary mb-4 text-sm uppercase tracking-wider">Conflict Timeline (Recent)</h3>
          <div className="space-y-4 max-h-[450px] overflow-y-auto">
            {TIMELINE_EVENTS.slice(0, 6).map((e, i) => (
              <div key={i} className="border-l-2 border-accent-red/40 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-txt-dim">{e.date}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    e.category === 'military' ? 'bg-accent-red/20 text-accent-red' :
                    e.category === 'humanitarian' ? 'bg-purple-500/20 text-purple-400' :
                    e.category === 'diplomatic' ? 'bg-accent-cyan/20 text-accent-cyan' :
                    'bg-accent-gold/20 text-accent-gold'
                  }`}>
                    {e.category}
                  </span>
                </div>
                <p className="text-xs text-txt-secondary leading-relaxed">{e.event}</p>
                <p className="text-[9px] text-txt-dim mt-0.5">{e.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live News + Risk Heatmap */}
        <div className="lg:col-span-1 space-y-4">
          {/* Live News Feed */}
          <div className="bg-bg-card border border-border rounded-lg p-4">
            <h3 className="font-heading font-semibold text-txt-primary mb-4 text-sm uppercase tracking-wider">
              Live News Feed
              <span className="ml-2 inline-block w-2 h-2 bg-accent-red rounded-full animate-pulse" />
            </h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {news.length > 0 ? news.slice(0, 8).map((n, i) => (
                <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
                   className="block py-1.5 border-b border-border/20 hover:bg-bg-secondary/40 rounded px-1 transition-colors">
                  <div className="text-xs text-txt-primary leading-snug line-clamp-2">{n.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] text-accent-cyan">{n.source_name}</span>
                    <span className="text-[9px] text-txt-dim">{n.published_at ? new Date(n.published_at).toLocaleDateString() : ''}</span>
                  </div>
                </a>
              )) : (
                <div className="text-xs text-txt-dim italic">News feeds will populate automatically...</div>
              )}
            </div>
          </div>

          {/* Risk Heatmap */}
          <div className="bg-bg-card border border-border rounded-lg p-4">
            <h3 className="font-heading font-semibold text-txt-primary mb-3 text-sm uppercase tracking-wider">Global Risk Heatmap (Top 5)</h3>
            <div className="space-y-3">
              {topVulnerable.map(c => (
                <div key={c.code} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-txt-primary">{c.flag} {c.name}</span>
                    <span className={`text-xs font-mono font-bold ${
                      c.vulnerability > 85 ? 'text-accent-red' :
                      c.vulnerability > 70 ? 'text-accent-orange' :
                      'text-accent-gold'
                    }`}>{c.vulnerability}%</span>
                  </div>
                  <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        c.vulnerability > 85 ? 'bg-accent-red' :
                        c.vulnerability > 70 ? 'bg-accent-orange' :
                        'bg-accent-gold'
                      }`}
                      style={{ width: `${c.vulnerability}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-txt-dim">
                    <span>Oil: {c.oil_dependency_pct}%</span>
                    <span>LNG: {c.lng_dependency_pct || 0}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Supply Chain + War Cost */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Supply Chain Status */}
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-txt-primary mb-4 text-sm uppercase tracking-wider">Supply Chain Status</h3>
          <div className="space-y-3">
            {supplyChainStatus.map(s => (
              <div key={s.name} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${getStatusDot(s.status)}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-txt-primary font-medium">{s.name}</span>
                    <span className={`text-xs font-mono font-bold ${getStatusColor(s.status)}`}>{s.statusLabel}</span>
                  </div>
                  <div className="w-full h-1.5 bg-bg-secondary rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getStatusDot(s.status)}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* War Cost Ticker */}
        <div className="bg-bg-card border border-accent-red/30 rounded-lg p-4">
          <h3 className="font-heading font-semibold text-accent-red mb-3 text-sm uppercase tracking-wider">War Cost to US Taxpayers</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-txt-dim uppercase">Daily Cost</div>
              <div className="text-2xl font-mono font-bold text-accent-red">$1.75B</div>
            </div>
            <div>
              <div className="text-[10px] text-txt-dim uppercase">Total ({warDay} Days)</div>
              <div className="text-2xl font-mono font-bold text-accent-orange">${(1.75 * warDay).toFixed(1)}B</div>
            </div>
          </div>
          <div className="mt-3 bg-bg-primary rounded p-2 border border-border/30">
            <div className="text-[10px] text-txt-dim uppercase mb-1">Live Cost Ticker</div>
            <div className="text-lg font-mono font-bold text-accent-red">
              ${(1.75e9 / 1440).toLocaleString('en-US', { maximumFractionDigits: 0 })}/minute
            </div>
            <div className="text-[9px] text-txt-dim">= ${(1.75e9 / 86400).toLocaleString('en-US', { maximumFractionDigits: 0 })}/second</div>
          </div>
        </div>
      </div>

      {/* Data Freshness Indicator */}
      <div className="text-center text-[9px] text-txt-dim">
        {liveLoading ? 'Loading live data...' : `Last data refresh: ${lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : 'N/A'}`}
        {' '} • Data sources: Bloomberg, Yahoo Finance, FRED, EIA, CoinGecko, Kpler, UNHCR
      </div>
    </div>
  );
}

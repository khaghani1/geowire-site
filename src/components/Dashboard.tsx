'use client';
import MetricCard from './MetricCard';
import { BASELINE, CURRENT_METRICS, COMMODITIES_DATA, TIMELINE_EVENTS, COUNTRIES_DATA } from '@/lib/constants';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard() {
  const m = CURRENT_METRICS;
  const warDay = Math.floor((Date.now() - new Date('2026-02-28').getTime()) / 86400000) + 1;

  // Generate 22-day trend data (from Feb 28 to Mar 22)
  const genTrend = (start: number, end: number) => {
    return Array.from({ length: 22 }, (_, i) =>
      Math.round(start + ((end - start) * (Math.pow(i / 21, 0.8))))
    );
  };

  const oilVals = genTrend(71, 107);
  const sp500Vals = genTrend(6878, 6506);
  const goldVals = genTrend(5226, 4492);
  const gasVals = genTrend(298, 386);

  // Merge all trends into single dataset
  const marketPulseData = Array.from({ length: 22 }, (_, i) => ({
    day: i + 1,
    date: `Day ${i + 1}`,
    Brent: oilVals[i],
    SP500: Math.round(sp500Vals[i] / 100),
    Gold: Math.round(goldVals[i] / 100),
    GasPrice: gasVals[i],
  }));

  // Top 5 most vulnerable countries
  const topVulnerable = [...COUNTRIES_DATA]
    .sort((a, b) => b.vulnerability - a.vulnerability)
    .slice(0, 5);

  // Supply chain status (simulated data)
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
    <div className="space-y-6">
      {/* War Status Banner - Enhanced */}
      <div className="bg-accent-red/10 border border-accent-red/30 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-2">
              <div className="text-accent-red font-heading font-bold text-3xl">Operation Epic Fury</div>
              <div className="text-5xl font-mono font-bold text-accent-orange">Day {warDay}</div>
            </div>
            <div className="text-txt-secondary text-sm font-semibold">Active Ultimatum: 48hr power plant strike threat (Mar 21 6:44 PM)</div>
            <div className="text-txt-dim text-xs mt-2">Started Feb 28, 2026 • 22 days of intensive operations</div>
          </div>
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-accent-red">{m['war.targets.struck'].value}</div>
              <div className="text-xs text-txt-dim uppercase tracking-wider mt-1">TARGETS STRUCK</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-accent-gold">{m['war.us.kia'].value}</div>
              <div className="text-xs text-txt-dim uppercase tracking-wider mt-1">US KIA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-accent-orange">{m['iran.dead.hrana'].value}</div>
              <div className="text-xs text-txt-dim uppercase tracking-wider mt-1">IRAN DEAD (HRANA)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid - 8 Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        <MetricCard label="Brent Crude" value="$107" prewar="$71" change={50.7} unit="/bbl" source="Bloomberg" color="text-accent-red" />
        <MetricCard label="WTI Crude" value="$95" prewar="$66.50" change={42.9} unit="/bbl" source="Bloomberg" color="text-accent-red" />
        <MetricCard label="US Gas Avg" value="$3.86" prewar="$2.98" change={29.5} unit="/gal" source="AAA" color="text-accent-orange" />
        <MetricCard label="S&P 500" value="6,506" prewar="6,878" change={-5.4} source="Yahoo Finance" color="text-accent-red" />
        <MetricCard label="Gold" value="$4,492" prewar="$5,226" change={-14.1} unit="/oz" source="Yahoo Finance" color="text-accent-green" />
        <MetricCard label="Hormuz Flow" value="0.6" prewar="20" change={-97} unit="M bbl/d" source="Kpler/est" color="text-accent-red" />
        <MetricCard label="Displacement" value="3.2M" prewar="0" unit="people" source="UNHCR" color="text-accent-red" newStat />
        <MetricCard label="Iran Dead (Range)" value="1.4K–5.9K" prewar="0" unit="people" source="Multiple" color="text-accent-red" newStat />
      </div>

      {/* Market Pulse - 4 Mini Area Charts */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-4 text-lg">Market Pulse — 22-Day Trends</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Brent Oil Trend */}
          <div className="bg-bg-primary rounded border border-border/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-txt-secondary">Brent Crude ($/bbl)</h4>
              <div className="text-2xl font-mono font-bold text-accent-red">$107</div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={marketPulseData}>
                <defs>
                  <linearGradient id="colorBrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #1a2535', borderRadius: 8, color: '#e2e8f0', fontSize: 11 }} />
                <Area type="monotone" dataKey="Brent" stroke="#ef4444" fillOpacity={1} fill="url(#colorBrent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* S&P 500 Trend */}
          <div className="bg-bg-primary rounded border border-border/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-txt-secondary">S&P 500 Index</h4>
              <div className="text-2xl font-mono font-bold text-accent-red">6,506</div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={marketPulseData}>
                <defs>
                  <linearGradient id="colorSP500" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #1a2535', borderRadius: 8, color: '#e2e8f0', fontSize: 11 }} />
                <Area type="monotone" dataKey="SP500" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSP500)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gold Trend */}
          <div className="bg-bg-primary rounded border border-border/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-txt-secondary">Gold ($/oz)</h4>
              <div className="text-2xl font-mono font-bold text-accent-green">$4,492</div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={marketPulseData}>
                <defs>
                  <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #1a2535', borderRadius: 8, color: '#e2e8f0', fontSize: 11 }} />
                <Area type="monotone" dataKey="Gold" stroke="#fbbf24" fillOpacity={1} fill="url(#colorGold)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gas Price Trend */}
          <div className="bg-bg-primary rounded border border-border/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-txt-secondary">US Gas Avg ($/gal)</h4>
              <div className="text-2xl font-mono font-bold text-accent-orange">$3.86</div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={marketPulseData}>
                <defs>
                  <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #1a2535', borderRadius: 8, color: '#e2e8f0', fontSize: 11 }} />
                <Area type="monotone" dataKey="GasPrice" stroke="#f97316" fillOpacity={1} fill="url(#colorGas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Commodity Impact Summary */}
        <div className="lg:col-span-1 bg-bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-txt-primary mb-4 text-sm uppercase tracking-wider">Commodity Impact Summary</h3>
          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2">
            {COMMODITIES_DATA.slice(0, 12).map(c => {
              const change = +((c.current - c.prewar) / c.prewar * 100).toFixed(1);
              return (
                <div key={c.symbol} className="flex items-center justify-between py-2 px-2 border-b border-border/20 hover:bg-bg-secondary/40 rounded transition-colors">
                  <span className="text-xs text-txt-secondary font-mono">{c.symbol}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-txt-primary whitespace-nowrap">{typeof c.current === 'number' && c.current >= 100 ? c.current.toLocaleString() : c.current}</span>
                    <span className={`font-mono text-xs w-14 text-right font-bold ${change > 0 ? 'text-accent-red' : 'text-accent-green'}`}>
                      {change > 0 ? '+' : ''}{change.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conflict Timeline */}
        <div className="lg:col-span-1 bg-bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-txt-primary mb-4 text-sm uppercase tracking-wider">Conflict Timeline (Recent)</h3>
          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
            {TIMELINE_EVENTS.slice(-8).reverse().map((e, i) => (
              <div key={i} className="flex gap-3 text-xs pb-3 border-b border-border/20">
                <div className="text-txt-dim font-mono whitespace-nowrap flex-shrink-0">{e.date.slice(5)}</div>
                <div className="flex-1 min-w-0">
                  <div className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase mb-1 mb-1 font-bold ${
                    e.category === 'military' ? 'bg-accent-red/20 text-accent-red' :
                    e.category === 'economic' ? 'bg-accent-gold/20 text-accent-gold' :
                    e.category === 'humanitarian' ? 'bg-accent-orange/20 text-accent-orange' :
                    e.category === 'diplomatic' ? 'bg-accent-blue/20 text-accent-blue' :
                    e.category === 'geopolitical' ? 'bg-accent-purple/20 text-accent-purple' :
                    'bg-accent-cyan/20 text-accent-cyan'
                  }`}>{e.category}</div>
                  <div className="text-txt-secondary leading-tight">{e.event}</div>
                  <div className="text-[9px] text-txt-muted mt-1">{e.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Risk Heatmap */}
        <div className="lg:col-span-1 bg-bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-txt-primary mb-4 text-sm uppercase tracking-wider">Global Risk Heatmap (Top 5)</h3>
          <div className="space-y-3">
            {topVulnerable.map((country) => (
              <div key={country.code}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-txt-secondary">{country.flag} {country.name}</span>
                  <span className="text-xs font-mono font-bold text-accent-red">{country.vulnerability}%</span>
                </div>
                <div className="w-full bg-bg-primary rounded-full overflow-hidden h-2 border border-border/30">
                  <div
                    className="h-full bg-gradient-to-r from-accent-orange to-accent-red transition-all"
                    style={{ width: `${country.vulnerability}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-txt-muted mt-1">
                  <span>Oil: {country.oil_dependency_pct}%</span>
                  <span>LNG: {country.lng_dependency_pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supply Chain Status */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-4">Supply Chain Status Overview</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {supplyChainStatus.map((item) => (
            <div key={item.name} className="bg-bg-primary border border-border/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${getStatusDot(item.status)}`} />
                <div className="text-sm font-semibold text-txt-secondary">{item.name}</div>
              </div>
              <div className={`text-2xl font-bold font-mono ${getStatusColor(item.status)} mb-2`}>{item.pct}%</div>
              <div className="w-full bg-bg-card rounded-full overflow-hidden h-1.5 border border-border/30">
                <div
                  className={`h-full transition-all ${
                    item.status === 'critical' ? 'bg-accent-red' :
                    item.status === 'warning' ? 'bg-accent-orange' :
                    'bg-accent-green'
                  }`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <div className="text-xs text-txt-dim mt-2 font-mono">{item.statusLabel}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Humanitarian Overview */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-4">Humanitarian Overview — Multi-Source Casualty Tracking</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          <MetricCard label="HRANA Count" value="3,220" source="HRANA" color="text-accent-red" size="sm" />
          <MetricCard label="Hengaw Count" value="5,900" source="Hengaw" color="text-accent-red" size="sm" />
          <MetricCard label="Iran Govt Count" value="1,500" source="Iran Health Min" color="text-accent-orange" size="sm" />
          <MetricCard label="Al Jazeera Tracker" value="1,444" source="Al Jazeera" color="text-accent-orange" size="sm" />
          <MetricCard label="Civilians (HRANA)" value="1,398" source="HRANA" color="text-accent-red" size="sm" />
        </div>
        <div className="mt-4 text-xs text-txt-dim border-t border-border/50 pt-3">
          Wide variance (1,444–5,900) reflects different methodologies and severe access constraints under near-total communications blackout (1% internet). HRANA uses verified individual documentation; Hengaw includes extrapolated estimates from Kurdish regions. Civilian toll represents documented non-combatants; 210 children confirmed dead.
        </div>
      </div>
    </div>
  );
}

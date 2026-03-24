'use client';

import { useState, useEffect } from 'react';
import { getWarDay, getTotalWarCost, WAR_COST_PER_DAY } from '@/lib/constants';

interface CommodityData {
  series_id: string;
  value: number;
  prev_value: number;
  baseline: number;
  label: string;
  unit: string;
  category: string;
  change_pct: number;
  updated_at: string;
}

interface TimelineEvent {
  date: string;
  event: string;
  category: string;
  impact_score: number;
  source: string;
}

interface CountryData {
  code: string;
  name: string;
  flag: string;
  vulnerability: number;
  oil_dependency_pct: number;
  lng_dependency_pct: number;
  reserve_days: number;
  gdp_impact_pct: number;
  inflation_impact_pct: number;
  currency_change_pct: number;
  stock_market_change_pct: number;
  food_price_impact_pct: number;
  policy_response: string;
  key_events: string;
}

interface AnalysisItem {
  id: string;
  title: string;
  content: string;
}

export default function DashboardPage() {
  const [liveData, setLiveData] = useState<Record<string, CommodityData>>({});
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisItem[]>([]);
  const [warCost, setWarCost] = useState(getTotalWarCost());
  const [activeTab, setActiveTab] = useState<'overview' | 'energy' | 'countries' | 'timeline'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setWarCost(getTotalWarCost()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [liveRes, timelineRes, countriesRes, analysisRes] = await Promise.allSettled([
          fetch('/api/live/latest'),
          fetch('/api/data/timeline'),
          fetch('/api/data/countries'),
          fetch('/api/data/analysis'),
        ]);

        if (liveRes.status === 'fulfilled' && liveRes.value.ok) {
          const d = await liveRes.value.json();
          setLiveData(d);
        }
        if (timelineRes.status === 'fulfilled' && timelineRes.value.ok) {
          const d = await timelineRes.value.json();
          setTimeline(d.events || []);
        }
        if (countriesRes.status === 'fulfilled' && countriesRes.value.ok) {
          const d = await countriesRes.value.json();
          setCountries(d.countries || []);
        }
        if (analysisRes.status === 'fulfilled' && analysisRes.value.ok) {
          const d = await analysisRes.value.json();
          setAnalysis(d.analyses || d.analysis || []);
        }
      } catch (e) {
        console.error('Dashboard fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
    const interval = setInterval(fetchAll, 60000);
    return () => clearInterval(interval);
  }, []);

  const warDay = getWarDay();
  const formatNum = (n: number) => n.toLocaleString('en-US');
  const formatCost = (n: number) => {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(3)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(3)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    return `$${formatNum(n)}`;
  };

  const liveEntries = Object.values(liveData).filter(d => d && d.value);
  const energyData = liveEntries.filter(d => d.category === 'energy');
  const commodityData = liveEntries.filter(d => d.category === 'commodity' || d.category === 'metal' || d.category === 'crypto');

  const tabs = [
    { id: 'overview' as const, label: 'OVERVIEW', icon: '◉' },
    { id: 'energy' as const, label: 'ENERGY & MARKETS', icon: '⛽' },
    { id: 'countries' as const, label: 'GLOBAL IMPACT', icon: '🌍' },
    { id: 'timeline' as const, label: 'WAR TIMELINE', icon: '📅' },
  ];

  return (
    <main className="min-h-screen bg-bg-0 pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-tx-0">Crisis Dashboard</h1>
            <p className="text-tx-2 font-mono text-sm mt-1">
              IRAN WAR — DAY {warDay} — REAL-TIME INTELLIGENCE
            </p>
          </div>
          <div className="text-right">
            <div className="font-mono text-accent-red text-2xl md:text-3xl font-bold war-cost-flash">
              {formatCost(warCost)}
            </div>
            <div className="text-tx-3 font-mono text-xs">TOTAL WAR COST (EST.)</div>
          </div>
        </div>

        {/* Top Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <MetricCard label="WAR DAY" value={String(warDay)} sub="Since Feb 28" color="red" />
          <MetricCard label="DAILY COST" value={`$${(WAR_COST_PER_DAY / 1e9).toFixed(2)}B`} sub="/day estimated" color="gold" />
          <MetricCard
            label="OIL (WTI)"
            value={liveData['oil.wti'] ? `$${liveData['oil.wti'].value.toFixed(2)}` : '—'}
            sub={liveData['oil.wti'] ? `${liveData['oil.wti'].change_pct > 0 ? '+' : ''}${liveData['oil.wti'].change_pct.toFixed(1)}% from pre-war` : 'Loading...'}
            color={liveData['oil.wti']?.change_pct > 20 ? 'red' : 'orange'}
          />
          <MetricCard
            label="COUNTRIES IMPACTED"
            value={String(countries.length || '—')}
            sub="Major economies tracked"
            color="blue"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 overflow-x-auto border-b border-bg-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-mono text-xs tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-accent-gold border-accent-gold'
                  : 'text-tx-3 border-transparent hover:text-tx-1'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-tx-3 font-mono text-sm animate-pulse">LOADING INTELLIGENCE DATA...</div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewTab
                liveData={liveEntries}
                timeline={timeline}
                countries={countries}
                analysis={analysis}
              />
            )}
            {activeTab === 'energy' && (
              <EnergyTab energy={energyData} commodities={commodityData} allData={liveEntries} />
            )}
            {activeTab === 'countries' && (
              <CountriesTab countries={countries} />
            )}
            {activeTab === 'timeline' && (
              <TimelineTab events={timeline} />
            )}
          </>
        )}
      </div>
    </main>
  );
}

// === METRIC CARD ===
function MetricCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colorMap: Record<string, string> = {
    red: 'text-accent-red border-accent-red/30',
    gold: 'text-accent-gold border-accent-gold/30',
    green: 'text-accent-green border-accent-green/30',
    blue: 'text-accent-blue border-accent-blue/30',
    orange: 'text-accent-orange border-accent-orange/30',
    cyan: 'text-accent-cyan border-accent-cyan/30',
  };

  return (
    <div className={`bg-bg-1 border ${colorMap[color] || colorMap.gold} rounded-lg p-4`}>
      <div className="font-mono text-[10px] text-tx-3 tracking-widest mb-1">{label}</div>
      <div className={`font-mono text-2xl font-bold ${colorMap[color]?.split(' ')[0] || 'text-tx-0'}`}>{value}</div>
      <div className="font-mono text-[10px] text-tx-3 mt-1">{sub}</div>
    </div>
  );
}

// === OVERVIEW TAB ===
function OverviewTab({ liveData, timeline, countries, analysis }: {
  liveData: CommodityData[];
  timeline: TimelineEvent[];
  countries: CountryData[];
  analysis: AnalysisItem[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Live Markets */}
      <div className="lg:col-span-2 space-y-6">
        {/* Market Snapshot */}
        <section className="bg-bg-1 rounded-lg border border-bg-3 p-5">
          <h2 className="font-mono text-xs text-accent-gold tracking-widest mb-4">LIVE MARKET DATA</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {liveData.slice(0, 9).map(item => (
              <div key={item.series_id} className="bg-bg-2 rounded p-3">
                <div className="font-mono text-[10px] text-tx-3 tracking-wider">{item.label}</div>
                <div className="font-mono text-lg text-tx-0 font-bold mt-1">
                  {item.unit === '$/bbl' || item.unit === '$/oz' || item.unit === '$/MMBtu' || item.unit === '$/bu'
                    ? `$${item.value.toFixed(2)}`
                    : item.unit === '%' ? `${item.value.toFixed(2)}%` : item.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
                <div className={`font-mono text-xs mt-1 ${item.change_pct >= 0 ? 'text-accent-red' : 'text-accent-green'}`}>
                  {item.change_pct >= 0 ? '+' : ''}{item.change_pct.toFixed(1)}% from baseline
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Timeline Events */}
        <section className="bg-bg-1 rounded-lg border border-bg-3 p-5">
          <h2 className="font-mono text-xs text-accent-gold tracking-widest mb-4">RECENT EVENTS</h2>
          <div className="space-y-3">
            {timeline.slice(0, 6).map((ev, i) => (
              <div key={i} className="flex items-start gap-3 bg-bg-2 rounded p-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  ev.impact_score >= 9 ? 'bg-accent-red' : ev.impact_score >= 7 ? 'bg-accent-orange' : 'bg-accent-gold'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] text-tx-3">{ev.date} — {ev.source}</div>
                  <div className="text-tx-1 text-sm mt-0.5">{ev.event}</div>
                </div>
                <div className={`font-mono text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                  ev.category === 'military' ? 'bg-accent-red/20 text-accent-red' :
                  ev.category === 'economic' ? 'bg-accent-gold/20 text-accent-gold' :
                  ev.category === 'diplomatic' ? 'bg-accent-blue/20 text-accent-blue' :
                  'bg-bg-3 text-tx-2'
                }`}>
                  {ev.category.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column: Analysis & Vulnerability */}
      <div className="space-y-6">
        {/* Top Vulnerable Countries */}
        <section className="bg-bg-1 rounded-lg border border-bg-3 p-5">
          <h2 className="font-mono text-xs text-accent-gold tracking-widest mb-4">MOST VULNERABLE</h2>
          <div className="space-y-3">
            {countries.sort((a, b) => b.vulnerability - a.vulnerability).slice(0, 5).map(c => (
              <div key={c.code} className="flex items-center gap-3">
                <span className="text-lg">{c.flag}</span>
                <div className="flex-1">
                  <div className="text-tx-0 text-sm font-medium">{c.name}</div>
                  <div className="w-full bg-bg-3 rounded-full h-1.5 mt-1">
                    <div
                      className={`h-1.5 rounded-full ${
                        c.vulnerability >= 90 ? 'bg-accent-red' : c.vulnerability >= 70 ? 'bg-accent-orange' : 'bg-accent-gold'
                      }`}
                      style={{ width: `${c.vulnerability}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-sm text-tx-1">{c.vulnerability}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Intel Briefings */}
        <section className="bg-bg-1 rounded-lg border border-bg-3 p-5">
          <h2 className="font-mono text-xs text-accent-gold tracking-widest mb-4">INTEL BRIEFINGS</h2>
          <div className="space-y-3">
            {analysis.slice(0, 4).map((a, i) => (
              <div key={a.id || i} className="bg-bg-2 rounded p-3">
                <div className="text-tx-0 text-sm font-medium mb-1">{a.title}</div>
                <div className="text-tx-2 text-xs leading-relaxed line-clamp-3">
                  {a.content?.substring(0, 150)}...
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Crisis Severity Index */}
        <section className="bg-bg-1 rounded-lg border border-accent-red/30 p-5">
          <h2 className="font-mono text-xs text-accent-red tracking-widest mb-4">CRISIS SEVERITY INDEX</h2>
          <div className="text-center">
            <div className="font-mono text-5xl font-bold text-accent-red">9.2</div>
            <div className="font-mono text-[10px] text-tx-3 mt-1">OUT OF 10.0</div>
            <div className="mt-3 text-tx-2 text-xs">
              EXTREME — Active multi-front conflict with global economic cascading effects
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <SeverityBar label="Military Escalation" value={95} />
            <SeverityBar label="Economic Impact" value={88} />
            <SeverityBar label="Humanitarian Crisis" value={72} />
            <SeverityBar label="Diplomatic Progress" value={15} />
          </div>
        </section>
      </div>
    </div>
  );
}

function SeverityBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="font-mono text-[10px] text-tx-3 w-28 flex-shrink-0">{label}</div>
      <div className="flex-1 bg-bg-3 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${value >= 80 ? 'bg-accent-red' : value >= 50 ? 'bg-accent-orange' : value >= 30 ? 'bg-accent-gold' : 'bg-accent-green'}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="font-mono text-[10px] text-tx-2 w-8 text-right">{value}%</span>
    </div>
  );
}

// === ENERGY TAB ===
function EnergyTab({ energy, commodities, allData }: {
  energy: CommodityData[];
  commodities: CommodityData[];
  allData: CommodityData[];
}) {
  return (
    <div className="space-y-6">
      {/* Energy Prices */}
      <section className="bg-bg-1 rounded-lg border border-bg-3 p-5">
        <h2 className="font-mono text-xs text-accent-red tracking-widest mb-4">ENERGY SECTOR — CRISIS PRICING</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {energy.map(item => (
            <PriceCard key={item.series_id} data={item} />
          ))}
        </div>
      </section>

      {/* Commodities */}
      <section className="bg-bg-1 rounded-lg border border-bg-3 p-5">
        <h2 className="font-mono text-xs text-accent-gold tracking-widest mb-4">COMMODITIES & METALS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commodities.map(item => (
            <PriceCard key={item.series_id} data={item} />
          ))}
        </div>
      </section>

      {/* All Other Data */}
      {allData.filter(d => d.category !== 'energy' && d.category !== 'commodity' && d.category !== 'metal' && d.category !== 'crypto').length > 0 && (
        <section className="bg-bg-1 rounded-lg border border-bg-3 p-5">
          <h2 className="font-mono text-xs text-accent-blue tracking-widest mb-4">FINANCIAL INDICATORS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allData.filter(d => d.category !== 'energy' && d.category !== 'commodity' && d.category !== 'metal' && d.category !== 'crypto').map(item => (
              <PriceCard key={item.series_id} data={item} />
            ))}
          </div>
        </section>
      )}

      {/* Hormuz Impact Analysis */}
      <section className="bg-bg-1 rounded-lg border border-accent-red/30 p-5">
        <h2 className="font-mono text-xs text-accent-red tracking-widest mb-4">STRAIT OF HORMUZ CLOSURE IMPACT</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="font-mono text-3xl text-accent-red font-bold">20M</div>
            <div className="font-mono text-[10px] text-tx-3 mt-1">BBL/DAY REMOVED</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl text-accent-orange font-bold">21%</div>
            <div className="font-mono text-[10px] text-tx-3 mt-1">GLOBAL SUPPLY CUT</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl text-accent-gold font-bold">$6+</div>
            <div className="font-mono text-[10px] text-tx-3 mt-1">US GAS PRICE EST.</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl text-accent-red font-bold">25</div>
            <div className="font-mono text-[10px] text-tx-3 mt-1">DAYS CLOSED</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PriceCard({ data }: { data: CommodityData }) {
  const isUp = data.change_pct >= 0;
  const isCrisis = Math.abs(data.change_pct) > 20;

  return (
    <div className={`bg-bg-2 rounded-lg p-4 border ${isCrisis ? 'border-accent-red/30' : 'border-bg-3'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-tx-3 tracking-wider">{data.label}</span>
        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
          isCrisis ? 'bg-accent-red/20 text-accent-red' : isUp ? 'bg-accent-orange/20 text-accent-orange' : 'bg-accent-green/20 text-accent-green'
        }`}>
          {isUp ? '+' : ''}{data.change_pct.toFixed(1)}%
        </span>
      </div>
      <div className="font-mono text-2xl text-tx-0 font-bold">
        {data.unit.startsWith('$') ? `$${data.value.toFixed(2)}` : data.value.toFixed(2)}{!data.unit.startsWith('$') && data.unit ? ` ${data.unit}` : ''}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-mono text-[10px] text-tx-3">Pre-war: {data.unit.startsWith('$') ? `$${data.baseline}` : data.baseline}</span>
        <span className="font-mono text-[10px] text-tx-3">{data.source}</span>
      </div>
      {/* Mini bar chart representation */}
      <div className="mt-3 flex items-end gap-0.5 h-8">
        {[...Array(12)].map((_, i) => {
          const h = Math.max(8, Math.min(100, (data.baseline / data.value) * 100 + (i - 6) * (data.change_pct / 3)));
          return (
            <div
              key={i}
              className={`flex-1 rounded-t ${i === 11 ? (isUp ? 'bg-accent-red' : 'bg-accent-green') : 'bg-bg-3'}`}
              style={{ height: `${h}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}

// === COUNTRIES TAB ===
function CountriesTab({ countries }: { countries: CountryData[] }) {
  const [sortBy, setSortBy] = useState<'vulnerability' | 'gdp_impact_pct' | 'inflation_impact_pct'>('vulnerability');

  const sorted = [...countries].sort((a, b) => {
    if (sortBy === 'vulnerability') return b.vulnerability - a.vulnerability;
    if (sortBy === 'gdp_impact_pct') return a.gdp_impact_pct - b.gdp_impact_pct;
    return b.inflation_impact_pct - a.inflation_impact_pct;
  });

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex gap-2 items-center">
        <span className="font-mono text-[10px] text-tx-3 tracking-wider">SORT BY:</span>
        {[
          { key: 'vulnerability' as const, label: 'Vulnerability' },
          { key: 'gdp_impact_pct' as const, label: 'GDP Impact' },
          { key: 'inflation_impact_pct' as const, label: 'Inflation' },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => setSortBy(s.key)}
            className={`font-mono text-xs px-3 py-1 rounded ${
              sortBy === s.key ? 'bg-accent-gold text-bg-0' : 'bg-bg-2 text-tx-2 hover:text-tx-0'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Country Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map(c => (
          <div key={c.code} className="bg-bg-1 rounded-lg border border-bg-3 p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{c.flag}</span>
              <div>
                <h3 className="text-tx-0 font-medium text-lg">{c.name}</h3>
                <span className="font-mono text-[10px] text-tx-3">{c.code}</span>
              </div>
              <div className="ml-auto">
                <div className={`font-mono text-2xl font-bold ${
                  c.vulnerability >= 90 ? 'text-accent-red' : c.vulnerability >= 70 ? 'text-accent-orange' : 'text-accent-gold'
                }`}>
                  {c.vulnerability}
                </div>
                <div className="font-mono text-[10px] text-tx-3 text-right">VULN.</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <StatBlock label="OIL DEPEND." value={`${c.oil_dependency_pct}%`} critical={c.oil_dependency_pct > 70} />
              <StatBlock label="RESERVES" value={`${c.reserve_days}d`} critical={c.reserve_days < 60} />
              <StatBlock label="GDP IMPACT" value={`${c.gdp_impact_pct}%`} critical={c.gdp_impact_pct < -2} />
              <StatBlock label="INFLATION" value={`+${c.inflation_impact_pct}%`} critical={c.inflation_impact_pct > 4} />
              <StatBlock label="CURRENCY" value={`${c.currency_change_pct}%`} critical={c.currency_change_pct < -5} />
              <StatBlock label="STOCKS" value={`${c.stock_market_change_pct}%`} critical={c.stock_market_change_pct < -15} />
            </div>

            <div className="text-tx-2 text-xs leading-relaxed mb-2">
              <span className="text-tx-3 font-mono text-[10px]">POLICY: </span>{c.policy_response}
            </div>
            <div className="text-tx-2 text-xs leading-relaxed">
              <span className="text-tx-3 font-mono text-[10px]">EVENTS: </span>{c.key_events}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBlock({ label, value, critical }: { label: string; value: string; critical: boolean }) {
  return (
    <div className="text-center">
      <div className={`font-mono text-lg font-bold ${critical ? 'text-accent-red' : 'text-tx-0'}`}>{value}</div>
      <div className="font-mono text-[9px] text-tx-3">{label}</div>
    </div>
  );
}

// === TIMELINE TAB ===
function TimelineTab({ events }: { events: TimelineEvent[] }) {
  const [filter, setFilter] = useState<string>('all');
  const categories = ['all', ...Array.from(new Set(events.map(e => e.category)))];

  const filtered = filter === 'all' ? events : events.filter(e => e.category === filter);

  // Group by date
  const grouped: Record<string, TimelineEvent[]> = {};
  filtered.forEach(ev => {
    if (!grouped[ev.date]) grouped[ev.date] = [];
    grouped[ev.date].push(ev);
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`font-mono text-xs px-3 py-1 rounded ${
              filter === cat ? 'bg-accent-gold text-bg-0' : 'bg-bg-2 text-tx-2 hover:text-tx-0'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-bg-3" />

        {Object.entries(grouped).map(([date, evts]) => (
          <div key={date} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-bg-2 border-2 border-accent-gold flex items-center justify-center z-10">
                <span className="font-mono text-[10px] text-accent-gold">
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).split(' ')[1]}
                </span>
              </div>
              <div className="font-mono text-sm text-tx-0">
                {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <div className="ml-12 space-y-2">
              {evts.map((ev, i) => (
                <div key={i} className="bg-bg-1 rounded-lg border border-bg-3 p-4 flex items-start gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold ${
                    ev.impact_score >= 9 ? 'bg-accent-red/20 text-accent-red' :
                    ev.impact_score >= 7 ? 'bg-accent-orange/20 text-accent-orange' :
                    'bg-accent-gold/20 text-accent-gold'
                  }`}>
                    {ev.impact_score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-tx-0 text-sm">{ev.event}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        ev.category === 'military' ? 'bg-accent-red/20 text-accent-red' :
                        ev.category === 'economic' ? 'bg-accent-gold/20 text-accent-gold' :
                        ev.category === 'diplomatic' ? 'bg-accent-blue/20 text-accent-blue' :
                        ev.category === 'humanitarian' ? 'bg-accent-orange/20 text-accent-orange' :
                        'bg-bg-3 text-tx-2'
                      }`}>
                        {ev.category.toUpperCase()}
                      </span>
                      <span className="font-mono text-[10px] text-tx-3">{ev.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

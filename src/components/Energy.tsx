'use client';
import MetricCard from './MetricCard';
import DataTable from './DataTable';
import { COMMODITIES_DATA, CURRENT_METRICS, TRADE_ROUTES } from '@/lib/constants';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function Energy() {
  const oilData = COMMODITIES_DATA.filter(c => c.category === 'oil');
  const gasData = COMMODITIES_DATA.filter(c => c.category === 'gas');
  const fertData = COMMODITIES_DATA.filter(c => c.category === 'fertilizer');
  const m = CURRENT_METRICS;

  // Generate 22-day sparkline data for oil price comparison
  const generateSparklineData = (startPrice: number, endPrice: number) => {
    return Array.from({ length: 22 }, (_, i) => ({
      day: i + 1,
      price: Math.round(startPrice + ((endPrice - startPrice) * (Math.pow(i / 21, 0.8)))),
    }));
  };

  const brentSparkline = generateSparklineData(71, 107);
  const wtiSparkline = generateSparklineData(66.50, 95);
  const dubaiSparkline = generateSparklineData(69, 135);

  // Supply/Demand Balance Data
  const supplyDemandData = [
    { region: 'Global', supply: 102, demand: 105.17, status: 'deficit' },
    { region: 'China', supply: 4.2, demand: 10.8, status: 'deficit' },
    { region: 'India', supply: 0.8, demand: 4.5, status: 'deficit' },
    { region: 'Japan', supply: 0, demand: 3.9, status: 'deficit' },
    { region: 'Europe', supply: 2.1, demand: 11.2, status: 'deficit' },
    { region: 'US', supply: 13.1, demand: 21.3, status: 'deficit' },
  ];

  // Commodity price changes
  const chartData = COMMODITIES_DATA.map(c => ({
    name: c.symbol,
    change: +((c.current - c.prewar) / c.prewar * 100).toFixed(1),
  }));

  // Pipeline rerouting status
  const pipelineStatus = [
    { name: 'Hormuz (Blocked)', flow: 0.6, color: 'bg-accent-red', severity: 'critical' },
    { name: 'Habshan-Fujairah', flow: 1.8, color: 'bg-accent-orange', severity: 'active' },
    { name: 'Saudi East-West', flow: 5.0, color: 'bg-accent-orange', severity: 'surge' },
    { name: 'Iraq-Turkey', flow: 0.9, color: 'bg-accent-orange', severity: 'active' },
    { name: 'Russia-China ESPO', flow: 2.1, color: 'bg-accent-blue', severity: 'surge' },
    { name: 'Africa/LatAm Routes', flow: 9.5, color: 'bg-accent-green', severity: 'recovering' },
  ];

  // Filter active trade routes
  const activeRoutes = TRADE_ROUTES.filter(r => r.current_flow > 0).slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Hormuz Status Banner - Enhanced */}
      <div className="bg-accent-red/10 border border-accent-red/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="font-heading font-bold text-accent-red text-2xl mb-4 flex items-center gap-3">
          <span className="text-3xl">⚠️</span> Strait of Hormuz Status: NEAR-BLOCKED
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard label="Oil Flow" value="0.6" prewar="20" change={-97} unit="M bbl/d" source="Kpler" size="sm" color="text-accent-red" />
          <MetricCard label="LNG Flow" value="0.3" prewar="5.2" change={-94.2} unit="Bcf/d" source="Kpler" size="sm" color="text-accent-red" />
          <MetricCard label="Tankers Stranded" value="150" source="MarineTraffic" size="sm" color="text-accent-orange" />
          <MetricCard label="Insurance" value="WITHDRAWN" source="Lloyds" size="sm" color="text-accent-red" />
          <MetricCard label="Transit Cost" value="$2M" source="Reuters" size="sm" color="text-accent-gold" />
          <MetricCard label="Qatar LNG Lost" value="17%" source="QatarEnergy" size="sm" color="text-accent-orange" />
        </div>
      </div>

      {/* Oil Price Comparison with Sparklines */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-4 text-lg">Oil Price Comparison — 22-Day Trends</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Brent Crude */}
          <div className="bg-bg-primary border border-border/30 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-txt-secondary">Brent Crude</h4>
                <div className="text-3xl font-mono font-bold text-accent-red mt-1">$107/bbl</div>
                <div className="text-xs text-txt-dim mt-1">Pre-war: $71 (+50.7%)</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={brentSparkline}>
                <defs>
                  <linearGradient id="brentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="#1a2535" horizontal={false} vertical={true} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #1a2535', borderRadius: 6, color: '#e2e8f0', fontSize: 10 }} />
                <Area type="monotone" dataKey="price" stroke="#ef4444" fillOpacity={1} fill="url(#brentGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* WTI Crude */}
          <div className="bg-bg-primary border border-border/30 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-txt-secondary">WTI Crude</h4>
                <div className="text-3xl font-mono font-bold text-accent-orange mt-1">$95/bbl</div>
                <div className="text-xs text-txt-dim mt-1">Pre-war: $66.50 (+42.9%)</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={wtiSparkline}>
                <defs>
                  <linearGradient id="wtiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="#1a2535" horizontal={false} vertical={true} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #1a2535', borderRadius: 6, color: '#e2e8f0', fontSize: 10 }} />
                <Area type="monotone" dataKey="price" stroke="#f97316" fillOpacity={1} fill="url(#wtiGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Dubai Crude */}
          <div className="bg-bg-primary border border-border/30 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-txt-secondary">Dubai Crude</h4>
                <div className="text-3xl font-mono font-bold text-accent-gold mt-1">$135/bbl</div>
                <div className="text-xs text-txt-dim mt-1">Pre-war: $69 (+95.7%)</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={dubaiSparkline}>
                <defs>
                  <linearGradient id="dubaiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="#1a2535" horizontal={false} vertical={true} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #1a2535', borderRadius: 6, color: '#e2e8f0', fontSize: 10 }} />
                <Area type="monotone" dataKey="price" stroke="#fbbf24" fillOpacity={1} fill="url(#dubaiGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Supply/Demand Balance */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-4">Global Supply/Demand Balance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={supplyDemandData} margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
            <XAxis dataKey="region" tick={{ fill: '#b8c7db', fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
            <YAxis tick={{ fill: '#b8c7db', fontSize: 11 }} label={{ value: 'M bbl/d', angle: -90, position: 'insideLeft' }} />
            <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #1a2535', borderRadius: 8, color: '#e2e8f0' }} />
            <Legend />
            <Bar dataKey="supply" fill="#22c55e" name="Supply" />
            <Bar dataKey="demand" fill="#ef4444" name="Demand" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-bg-primary border border-border/30 rounded text-sm text-txt-secondary">
          <span className="font-semibold">Global Deficit: 3.17 M bbl/day</span> — Filled by SPR releases, alternative routes, and rationing. Most vulnerable: India (45-day reserves), Pakistan (20-day), Bangladesh (15-day).
        </div>
      </div>

      {/* Oil Benchmarks & Pricing Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-heading font-semibold text-txt-primary mb-4">Oil Benchmarks</h3>
          <div className="grid grid-cols-2 gap-3">
            {oilData.map(c => (
              <MetricCard key={c.symbol} label={c.name} value={`$${c.current}`} prewar={`$${c.prewar}`}
                change={+((c.current - c.prewar) / c.prewar * 100).toFixed(1)} unit={c.unit.replace('$/', '/')}
                source={c.symbol === 'URALS' ? 'Reuters — Russia benefiting' : 'Bloomberg'} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-txt-primary mb-4">Natural Gas & LNG</h3>
          <div className="grid grid-cols-1 gap-3 mb-4">
            {gasData.map(c => (
              <MetricCard key={c.symbol} label={c.name} value={`$${c.current}`} prewar={`$${c.prewar}`}
                change={+((c.current - c.prewar) / c.prewar * 100).toFixed(1)} unit={c.unit.replace('$/', '/')} source="ICE/Bloomberg" />
            ))}
          </div>
          <h3 className="font-heading font-semibold text-txt-primary mb-3">Fertilizer</h3>
          <div className="grid grid-cols-2 gap-3">
            {fertData.map(c => (
              <MetricCard key={c.symbol} label={c.name} value={`$${c.current}`} prewar={`$${c.prewar}`}
                change={+((c.current - c.prewar) / c.prewar * 100).toFixed(1)} unit={c.unit.replace('$/', '/')} source="World Bank" />
            ))}
          </div>
        </div>
      </div>

      {/* Commodity Price Changes Bar Chart */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-4">Commodity Price Changes Since Feb 28</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 60, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} angle={-45} textAnchor="end" height={100} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `${v}%`} />
            <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #1a2535', borderRadius: 8, color: '#e2e8f0' }} formatter={(v: number) => [`${v}%`, 'Change']} />
            <Bar dataKey="change" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.change > 0 ? '#ef4444' : '#22c55e'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pipeline Rerouting Status */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-4">Pipeline Rerouting Status — Active Supply Routes (M bbl/d)</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pipelineStatus.map((route) => (
            <div key={route.name} className="bg-bg-primary border border-border/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${route.color}`} />
                <span className="text-xs font-semibold text-txt-secondary line-clamp-2">{route.name}</span>
              </div>
              <div className="text-2xl font-mono font-bold text-txt-primary mb-2">{route.flow}</div>
              <div className="w-full bg-bg-card rounded-full overflow-hidden h-1.5 border border-border/30">
                <div
                  className={route.color}
                  style={{ width: `${(route.flow / 10) * 100}%` }}
                />
              </div>
              <div className="text-[10px] text-txt-muted mt-2 font-mono uppercase">{route.severity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Trade Routes Summary */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-4">Top Active Trade Routes — Critical Flow Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs text-txt-dim uppercase tracking-wider font-semibold">Route</th>
                <th className="px-4 py-3 text-right text-xs text-txt-dim uppercase tracking-wider font-semibold">Pre-War Flow</th>
                <th className="px-4 py-3 text-right text-xs text-txt-dim uppercase tracking-wider font-semibold">Current Flow</th>
                <th className="px-4 py-3 text-right text-xs text-txt-dim uppercase tracking-wider font-semibold">Change %</th>
                <th className="px-4 py-3 text-left text-xs text-txt-dim uppercase tracking-wider font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-xs text-txt-dim uppercase tracking-wider font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {activeRoutes.map((route, i) => {
                const pctChange = +((route.current_flow - route.pre_war_flow) / route.pre_war_flow * 100).toFixed(1);
                const statusColor = route.status === 'Blocked' ? 'text-accent-red' :
                  route.status === 'Near-Blocked' ? 'text-accent-orange' :
                  route.status.includes('Active') ? 'text-accent-green' : 'text-txt-secondary';
                return (
                  <tr key={i} className="border-b border-border/50 hover:bg-bg-card-hover transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-txt-secondary">{route.route_name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-txt-primary text-right">{route.pre_war_flow} {route.unit}</td>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-txt-primary text-right">{route.current_flow} {route.unit}</td>
                    <td className={`px-4 py-3 font-mono text-xs text-right font-bold ${pctChange > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                      {pctChange > 0 ? '+' : ''}{pctChange}%
                    </td>
                    <td className={`px-4 py-3 text-xs font-semibold ${statusColor}`}>{route.status}</td>
                    <td className="px-4 py-3 text-xs text-txt-muted">{route.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Commodities Data Table */}
      <DataTable
        title="All Tracked Instruments (19) — Complete Price History"
        columns={[
          { key: 'name', label: 'Instrument' },
          { key: 'category', label: 'Category' },
          { key: 'prewar', label: 'Pre-War', format: v => (typeof v === 'number' && v >= 100 ? v.toLocaleString() : v.toFixed(2)) },
          { key: 'current', label: 'Current', format: v => (typeof v === 'number' && v >= 100 ? v.toLocaleString() : v.toFixed(2)) },
          { key: 'change', label: 'Change %', format: v => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`, color: v => v > 0 ? 'text-accent-red' : 'text-accent-green' },
          { key: 'unit', label: 'Unit' },
        ]}
        data={COMMODITIES_DATA.map(c => ({ ...c, change: +((c.current - c.prewar) / c.prewar * 100).toFixed(1) }))}
      />
    </div>
  );
}

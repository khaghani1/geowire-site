'use client';
import { useState } from 'react';
import MetricCard from './MetricCard';
import { COUNTRIES_DATA } from '@/lib/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function Countries() {
  const [selected, setSelected] = useState<string | null>(null);
  const [compareWith, setCompareWith] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const country = selected ? COUNTRIES_DATA.find(c => c.code === selected) : null;
  const comparisonCountry = compareWith ? COUNTRIES_DATA.find(c => c.code === compareWith) : null;

  const vulnData = [...COUNTRIES_DATA]
    .sort((a, b) => b.vulnerability - a.vulnerability)
    .map(c => ({
      name: `${c.flag} ${c.code}`,
      vulnerability: c.vulnerability,
      code: c.code,
    }));

  const getVulnColor = (v: number) => {
    if (v > 85) return '#ff6b6b';
    if (v > 75) return '#ff9f43';
    if (v > 60) return '#ffd93d';
    if (v > 40) return '#6bff6b';
    return '#54a0ff';
  };

  const radarData = country ? [
    { metric: 'Oil Depend', value: Math.min(country.oil_dependency_pct, 100) },
    { metric: 'LNG Depend', value: Math.min(country.lng_dependency_pct * 2, 100) },
    { metric: 'Reserve Days', value: Math.min(country.reserve_days / 2, 100) },
    { metric: 'GDP Risk', value: Math.abs(country.gdp_impact_pct) * 10 },
    { metric: 'Inflation Risk', value: Math.min(country.inflation_impact_pct * 15, 100) },
  ] : [];

  const radarDataComparison = comparisonCountry ? [
    { metric: 'Oil Depend', value: Math.min(comparisonCountry.oil_dependency_pct, 100) },
    { metric: 'LNG Depend', value: Math.min(comparisonCountry.lng_dependency_pct * 2, 100) },
    { metric: 'Reserve Days', value: Math.min(comparisonCountry.reserve_days / 2, 100) },
    { metric: 'GDP Risk', value: Math.abs(comparisonCountry.gdp_impact_pct) * 10 },
    { metric: 'Inflation Risk', value: Math.min(comparisonCountry.inflation_impact_pct * 15, 100) },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Vulnerability Chart */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-4 text-lg">Vulnerability Index (0-100)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={vulnData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #3b82f6', borderRadius: 8, color: '#f1f5f9' }}
              formatter={(v) => [`${v}/100`, 'Vulnerability']}
            />
            <Bar dataKey="vulnerability" radius={[6, 6, 0, 0]} onClick={(d: any) => setSelected(d.code)} cursor="pointer">
              {vulnData.map((entry, i) => (
                <Cell key={i} fill={getVulnColor(entry.vulnerability)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Country Grid */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-txt-primary">Select Country to Analyze</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {COUNTRIES_DATA.map(c => (
            <button
              key={c.code}
              onClick={() => {
                if (selected === c.code) {
                  setSelected(null);
                } else {
                  setSelected(c.code);
                }
              }}
              className={`p-4 rounded-lg border transition-all ${
                selected === c.code
                  ? 'border-accent-blue bg-accent-blue/10 shadow-lg shadow-accent-blue/20'
                  : 'border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover'
              }`}
            >
              <div className="text-2xl mb-2">{c.flag}</div>
              <div className="text-xs font-heading text-txt-primary font-semibold">{c.code}</div>
              <div className="text-[11px] text-txt-secondary">{c.name}</div>
              <div className="mt-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-txt-muted">Risk:</span>
                  <span className={`text-xs font-bold font-mono ${
                    c.vulnerability > 85 ? 'text-accent-red' :
                    c.vulnerability > 75 ? 'text-accent-orange' :
                    c.vulnerability > 60 ? 'text-accent-gold' :
                    'text-accent-green'
                  }`}>
                    {c.vulnerability}
                  </span>
                </div>
                <div className="mt-1 w-full bg-border rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${c.vulnerability}%`,
                      backgroundColor: getVulnColor(c.vulnerability),
                    }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Country Detail & Comparison */}
      {country && (
        <div className="space-y-6">
          {/* Comparison Controls */}
          <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-4 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-txt-secondary mb-2 block">Compare with another country:</label>
              <select
                value={compareWith || ''}
                onChange={(e) => setCompareWith(e.target.value || null)}
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-txt-primary text-sm focus:outline-none focus:border-accent-blue"
              >
                <option value="">-- Select country --</option>
                {COUNTRIES_DATA.filter(c => c.code !== selected).map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                showComparison
                  ? 'bg-accent-blue text-white'
                  : 'bg-border text-txt-secondary hover:bg-border-hover'
              }`}
            >
              {showComparison ? 'Hide Comparison' : 'Show Comparison'}
            </button>
          </div>

          {/* Single Country Detail */}
          {!showComparison && (
            <div className="bg-bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{country.flag}</span>
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-txt-primary">{country.name}</h3>
                    <div className={`text-sm font-mono font-semibold mt-1 ${
                      country.vulnerability > 85 ? 'text-accent-red' :
                      country.vulnerability > 75 ? 'text-accent-orange' :
                      'text-accent-gold'
                    }`}>
                      Vulnerability: {country.vulnerability}/100
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-txt-muted uppercase tracking-widest">Risk Level</div>
                  <div className={`text-2xl font-bold font-mono ${
                    country.vulnerability > 85 ? 'text-accent-red' :
                    country.vulnerability > 75 ? 'text-accent-orange' :
                    country.vulnerability > 60 ? 'text-accent-gold' :
                    'text-accent-green'
                  }`}>
                    {country.vulnerability > 85 ? 'CRITICAL' :
                     country.vulnerability > 75 ? 'HIGH' :
                     country.vulnerability > 60 ? 'MEDIUM' :
                     'LOW'}
                  </div>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="mb-8">
                <h4 className="font-heading font-semibold text-txt-primary mb-4">Risk Profile</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#1a2535" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <PolarRadiusAxis tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 100]} />
                    <Radar name={country.name} dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #06b6d4', borderRadius: 8, color: '#f1f5f9' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                <MetricCard
                  label="Oil via Hormuz"
                  value={`${country.oil_dependency_pct}%`}
                  source="EIA"
                  size="sm"
                  color={country.oil_dependency_pct > 75 ? 'text-accent-red' : 'text-accent-orange'}
                />
                <MetricCard
                  label="LNG via Hormuz"
                  value={`${country.lng_dependency_pct}%`}
                  source="EIA"
                  size="sm"
                  color={country.lng_dependency_pct > 30 ? 'text-accent-orange' : 'text-accent-gold'}
                />
                <MetricCard
                  label="Reserve Days"
                  value={country.reserve_days === 999 ? '∞' : country.reserve_days}
                  source="IEA"
                  size="sm"
                  color={country.reserve_days < 90 ? 'text-accent-red' : country.reserve_days < 180 ? 'text-accent-gold' : 'text-accent-green'}
                />
                <MetricCard
                  label="GDP Impact"
                  value={`${country.gdp_impact_pct}%`}
                  source="IMF model"
                  size="sm"
                  color={country.gdp_impact_pct < -1 ? 'text-accent-red' : 'text-accent-orange'}
                />
                <MetricCard
                  label="Inflation Impact"
                  value={`+${country.inflation_impact_pct}%`}
                  source="Model"
                  size="sm"
                  color="text-accent-orange"
                />
                <MetricCard
                  label="Currency vs USD"
                  value={`${country.currency_change_pct}%`}
                  source="Forex"
                  size="sm"
                  color={country.currency_change_pct < -3 ? 'text-accent-red' : 'text-accent-orange'}
                />
                <MetricCard
                  label="Stock Market"
                  value={`${country.stock_market_change_pct}%`}
                  source="Exchange"
                  size="sm"
                  color={country.stock_market_change_pct < -10 ? 'text-accent-red' : 'text-accent-orange'}
                />
                <MetricCard
                  label="Food Prices"
                  value={`+${country.food_price_impact_pct}%`}
                  source="Model"
                  size="sm"
                  color={country.food_price_impact_pct > 10 ? 'text-accent-red' : 'text-accent-orange'}
                />
              </div>

              {/* Description Panel */}
              <div className="bg-bg-secondary border border-border rounded-lg p-4 space-y-3">
                <div>
                  <div className="text-xs text-txt-dim uppercase tracking-widest font-semibold mb-1">Policy Response</div>
                  <div className="text-sm text-txt-secondary leading-relaxed">{country.policy_response}</div>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="text-xs text-txt-dim uppercase tracking-widest font-semibold mb-1">Key Events</div>
                  <div className="text-sm text-txt-secondary leading-relaxed">{country.key_events}</div>
                </div>
              </div>
            </div>
          )}

          {/* Comparison View */}
          {showComparison && comparisonCountry && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Country 1 */}
              <div className="bg-bg-card border border-accent-blue/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{country.flag}</span>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-txt-primary">{country.name}</h3>
                    <div className="text-sm font-mono text-accent-blue">Vulnerability: {country.vulnerability}/100</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-heading font-semibold text-txt-primary mb-3 text-sm">Risk Profile</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#1a2535" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <PolarRadiusAxis tick={{ fill: '#94a3b8', fontSize: 9 }} domain={[0, 100]} />
                      <Radar name={country.name} dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  <ComparisonMetric label="Oil Dependency" value={country.oil_dependency_pct} />
                  <ComparisonMetric label="LNG Dependency" value={country.lng_dependency_pct} />
                  <ComparisonMetric label="Reserve Days" value={country.reserve_days === 999 ? 999 : country.reserve_days} />
                  <ComparisonMetric label="GDP Impact %" value={country.gdp_impact_pct} />
                  <ComparisonMetric label="Food Price Impact %" value={country.food_price_impact_pct} />
                </div>
              </div>

              {/* Country 2 */}
              <div className="bg-bg-card border border-accent-purple/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{comparisonCountry.flag}</span>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-txt-primary">{comparisonCountry.name}</h3>
                    <div className="text-sm font-mono text-accent-purple">Vulnerability: {comparisonCountry.vulnerability}/100</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-heading font-semibold text-txt-primary mb-3 text-sm">Risk Profile</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarDataComparison}>
                      <PolarGrid stroke="#1a2535" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <PolarRadiusAxis tick={{ fill: '#94a3b8', fontSize: 9 }} domain={[0, 100]} />
                      <Radar name={comparisonCountry.name} dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  <ComparisonMetric label="Oil Dependency" value={comparisonCountry.oil_dependency_pct} />
                  <ComparisonMetric label="LNG Dependency" value={comparisonCountry.lng_dependency_pct} />
                  <ComparisonMetric label="Reserve Days" value={comparisonCountry.reserve_days === 999 ? 999 : comparisonCountry.reserve_days} />
                  <ComparisonMetric label="GDP Impact %" value={comparisonCountry.gdp_impact_pct} />
                  <ComparisonMetric label="Food Price Impact %" value={comparisonCountry.food_price_impact_pct} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ComparisonMetric({ label, value }: { label: string; value: number | string }) {
  let displayValue = value;
  if (typeof value === 'number') {
    displayValue = value === 999 ? '∞' : value.toFixed(1);
  }

  return (
    <div className="flex items-center justify-between py-2 border-b border-border/30">
      <span className="text-xs text-txt-dim uppercase tracking-wide">{label}</span>
      <span className="font-mono font-semibold text-sm text-txt-primary">{displayValue}</span>
    </div>
  );
}

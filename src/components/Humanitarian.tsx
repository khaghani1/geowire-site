'use client';
import MetricCard from './MetricCard';
import DataTable from './DataTable';
import { CURRENT_METRICS, COUNTRIES_DATA } from '@/lib/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Humanitarian() {
  const m = CURRENT_METRICS;

  // Iran casualties data with metadata
  const casualtySourceData = [
    { source: 'HRANA', count: 3220, color: '#ef4444', label: 'Individual documented cases' },
    { source: 'Hengaw', count: 5900, color: '#f97316', label: 'Extrapolated w/ Kurdish regions' },
    { source: 'Iran Govt', count: 1500, color: '#eab308', label: 'Official claim (likely underestimated)' },
    { source: 'Al Jazeera', count: 1444, color: '#3b82f6', label: 'Geo-tagged verification' },
    { source: 'Civilian HRANA', count: 1398, color: '#a855f7', label: 'Non-combatant deaths' },
  ];

  // Displacement data by destination
  const displacementByDestination = [
    { country: 'Turkey', flag: '🇹🇷', displaced: 1200000, note: 'Northern border intake' },
    { country: 'Iraq', flag: '🇮🇶', displaced: 800000, note: 'Western border communities' },
    { country: 'Pakistan', flag: '🇵🇰', displaced: 600000, note: 'Eastern border informal settlements' },
    { country: 'UAE', flag: '🇦🇪', displaced: 400000, note: 'Via Gulf ports (wealthy emigration)' },
    { country: 'Internal Displacement', flag: '🇮🇷', displaced: 200000, note: 'Within Iran (safer regions)' },
  ];

  // Internet connectivity tracker
  const internetStatusData = [
    { region: 'Before War', connectivity: 95, label: 'Normal operations' },
    { region: 'Day 5', connectivity: 60, label: 'First blackout wave' },
    { region: 'Day 12', connectivity: 15, label: 'Near-total cutoff' },
    { region: 'Day 22 (Now)', connectivity: 1, label: 'Near-total blackout' },
  ];

  // Other countries casualty data
  const otherCountries = [
    { country: 'Israel', flag: '🇮🇱', dead: 18, wounded: 3730, source: 'MDA', status: 'Active combat operations' },
    { country: 'Iraq', flag: '🇮🇶', dead: 61, wounded: 0, source: 'Iraqi Health Auth', status: 'Friendly fire incidents' },
    { country: 'Lebanon', flag: '🇱🇧', dead: 1000, wounded: 0, source: 'Lebanese authorities', status: 'Hezbollah/IDF conflict' },
    { country: 'UAE', flag: '🇦🇪', dead: 8, wounded: 0, source: 'UAE MoD', status: 'Missile strikes on airports' },
    { country: 'Kuwait', flag: '🇰🇼', dead: 5, wounded: 0, source: 'Kuwait MoD', status: 'Port missile strikes' },
    { country: 'Pakistan', flag: '🇵🇰', dead: 30, wounded: 0, source: 'Reuters', status: 'Domestic protests' },
  ];

  return (
    <div className="space-y-6">
      {/* Iran Casualties - Multi Source with Enhanced Chart */}
      <div className="bg-gradient-to-br from-accent-red/15 to-accent-red/5 border border-accent-red/40 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-accent-red text-lg">💔 Iran Casualties — 5-Source Comparison</h3>
          <div className="text-xs text-txt-dim">Variance: 1,444–5,900 (4× range)</div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={casualtySourceData} margin={{ top: 10, right: 30, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
            <XAxis
              dataKey="source"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={{ value: 'Deaths', angle: -90, position: 'insideLeft', style: { fill: '#64748b' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1520',
                border: '1px solid #1a2535',
                borderRadius: 8,
                color: '#e2e8f0',
                padding: '12px'
              }}
              formatter={(value: any) => [value.toLocaleString(), 'Deaths']}
              labelFormatter={(label) => `Source: ${label}`}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#ef4444">
              {casualtySourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-3 bg-bg-secondary border border-border/50 rounded">
          <div className="text-xs text-txt-dim mb-2">METHODOLOGY NOTES</div>
          <div className="text-xs text-txt-secondary space-y-1">
            <div><strong>HRANA:</strong> Individual documentation via crowdsourced networks — most conservative, highest verification</div>
            <div><strong>Hengaw:</strong> Extrapolated from Kurdish-majority regions + known death reports — accounts for communication blackout gaps</div>
            <div><strong>Iran Govt:</strong> Official claims (historically underestimated by 50-70% in conflicts)</div>
            <div><strong>Al Jazeera:</strong> Geo-tagged social media verification — may miss rural areas</div>
          </div>
        </div>
      </div>

      {/* Iran Detail Metrics Grid */}
      <div className="bg-gradient-to-br from-bg-card to-bg-secondary border border-border rounded-lg p-5">
        <h3 className="font-heading font-semibold text-txt-primary mb-4">📊 Iran Impact Metrics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          <MetricCard label="Deaths (HRANA)" value="3,220" source="HRANA" color="text-accent-red" />
          <MetricCard label="Deaths (Hengaw)" value="5,900" source="Hengaw" color="text-accent-red" />
          <MetricCard label="Civilians" value="1,398" source="HRANA" color="text-accent-red" />
          <MetricCard label="Children Dead" value="210" source="HRANA" color="text-accent-red" />
          <MetricCard label="Wounded" value="12,000" source="Red Crescent" color="text-accent-orange" />
          <MetricCard label="Displaced" value="3.2M" source="UNHCR" color="text-accent-orange" />
          <MetricCard label="Schools Damaged" value="66" source="Iran Edu Min" color="text-accent-orange" />
          <MetricCard label="Internet Access" value="1%" source="NetBlocks" color="text-accent-red" />
          <MetricCard label="Wartime Arrests" value="195" source="HRANA" color="text-accent-purple" />
          <MetricCard label="Executions" value="3" source="HRANA" color="text-accent-red" />
          <MetricCard label="Basij/IRGC Killed" value="4,500" source="IDF est" color="text-accent-gold" />
          <MetricCard label="US Casualties" value="13 KIA" source="CENTCOM" color="text-accent-blue" />
        </div>
      </div>

      {/* Other Countries Casualties */}
      <DataTable
        title="💀 Casualties — Other Countries"
        columns={[
          { key: 'flag', label: '', format: (v: string) => v },
          { key: 'country', label: 'Country' },
          { key: 'dead', label: 'Dead', color: (v: number) => v > 100 ? 'text-accent-red' : v > 10 ? 'text-accent-orange' : 'text-accent-gold' },
          { key: 'wounded', label: 'Wounded', format: (v: number) => v > 0 ? v.toLocaleString() : '—' },
          { key: 'status', label: 'Status' },
        ]}
        data={otherCountries}
      />

      {/* Lebanon / Hezbollah Front */}
      <div className="bg-gradient-to-br from-accent-orange/10 to-accent-orange/5 border border-accent-orange/30 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-orange text-lg mb-4">⚔️ Lebanon / Hezbollah Front</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <MetricCard label="Lebanon Dead" value="1,000" source="Lebanese authorities" color="text-accent-red" size="sm" />
          <MetricCard label="Lebanon Displaced" value="1M" source="UNHCR" color="text-accent-orange" size="sm" />
          <MetricCard label="Israel Wounded" value="3,730" source="MDA" color="text-accent-orange" size="sm" />
          <MetricCard label="Timeline Remaining" value="3+ weeks" source="IDF Statement" color="text-accent-red" size="sm" />
        </div>
        <div className="bg-bg-card border border-border rounded p-3 text-sm text-txt-secondary">
          IDF conducting parallel operations on Lebanon border; Hezbollah degraded but not defeated; border communities at maximum civilian displacement; UN reporting systematic targeting of civilian infrastructure.
        </div>
      </div>

      {/* Displacement Crisis */}
      <div className="bg-gradient-to-br from-accent-cyan/10 to-accent-cyan/5 border border-accent-cyan/30 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-cyan text-lg mb-4">🏚️ Displacement Crisis — Regional Destinations</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {displacementByDestination.map((item, idx) => (
            <div key={idx} className="bg-bg-card border border-border rounded p-3">
              <div className="text-2xl mb-2">{item.flag}</div>
              <div className="text-xs text-txt-dim uppercase mb-1">Hosting</div>
              <div className="font-mono text-sm text-accent-cyan font-semibold mb-2">{(item.displaced / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-txt-secondary">{item.note}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-bg-secondary border border-border/50 rounded">
          <div className="text-xs text-txt-dim uppercase mb-2">Total Displaced</div>
          <div className="text-2xl font-mono text-accent-cyan font-bold">3.2M people</div>
          <div className="text-xs text-txt-secondary mt-1">~4.1% of Iran's population; comparable to 2015 European refugee crisis per capita</div>
        </div>
      </div>

      {/* Media Blackout / Internet Connectivity Tracker */}
      <div className="bg-gradient-to-br from-accent-purple/10 to-accent-purple/5 border border-accent-purple/30 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-purple text-lg mb-4">📡 Media Blackout Tracker — Internet Connectivity</h3>
        <div className="space-y-3">
          {internetStatusData.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm text-txt-primary font-semibold">{item.region}</div>
                  <div className="text-xs text-txt-dim">{item.label}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-mono font-bold text-accent-purple">{item.connectivity}%</div>
                </div>
              </div>
              <div className="w-full h-4 bg-bg-secondary rounded-full overflow-hidden border border-border">
                <div
                  className="h-full bg-gradient-to-r from-accent-purple to-accent-purple/50 transition-all"
                  style={{ width: `${item.connectivity}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <div className="bg-bg-card border border-border rounded p-3">
            <div className="text-xs text-txt-dim uppercase mb-2">Communication Status</div>
            <div className="text-sm text-txt-secondary">International calls blocked; domestic SMS capacity ~2%; VPN near impossible</div>
          </div>
          <div className="bg-bg-card border border-border rounded p-3">
            <div className="text-xs text-txt-dim uppercase mb-2">Casualties Reported Via</div>
            <div className="text-sm text-txt-secondary">WhatsApp voice messages, cross-border phone calls, social media posts from neighboring countries</div>
          </div>
          <div className="bg-bg-card border border-border rounded p-3">
            <div className="text-xs text-txt-dim uppercase mb-2">Information Vacuum</div>
            <div className="text-sm text-txt-secondary">Regime controlling narrative; civilian death toll unverifiable; rumors / misinformation spreading</div>
          </div>
        </div>
      </div>

      {/* Regime Repression */}
      <div className="bg-gradient-to-br from-accent-purple/15 to-accent-purple/5 border border-accent-purple/40 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-purple text-lg mb-3">⛓️ Internal Repression Under Cover of War</h3>
        <p className="text-sm text-txt-secondary mb-4">
          The Iranian regime is using the war as cover to eliminate domestic opposition. Political arrests have accelerated, and executions of protest-linked prisoners are occurring with near-zero international media coverage due to the communications blackout.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-bg-card border border-accent-red/40 rounded p-4">
            <div className="text-accent-red font-mono font-bold text-3xl mb-2">195</div>
            <div className="text-txt-secondary mb-2">Wartime political arrests</div>
            <div className="text-xs text-txt-dim">Activists, journalists, lawyers, civil society leaders arrested without due process</div>
          </div>
          <div className="bg-bg-card border border-accent-red/40 rounded p-4">
            <div className="text-accent-red font-mono font-bold text-3xl mb-2">3</div>
            <div className="text-txt-secondary mb-2">Executions of protest-linked prisoners</div>
            <div className="text-xs text-txt-dim">Deaths during the conflict from judicial proceedings unrelated to military operations</div>
          </div>
          <div className="bg-bg-card border border-accent-red/40 rounded p-4">
            <div className="text-accent-red font-mono font-bold text-3xl mb-2">1%</div>
            <div className="text-txt-secondary mb-2">Internet access — near-total information blackout</div>
            <div className="text-xs text-txt-dim">Criminalizing use of VPNs; mobile networks under regime control for surveillance</div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import DataTable from './DataTable';
import MetricCard from './MetricCard';
import { TRADE_ROUTES } from '@/lib/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function Trade() {
  const blocked = TRADE_ROUTES.filter(r => r.status.includes('Block'));
  const active = TRADE_ROUTES.filter(r => r.status.includes('Active') || r.status.includes('Surge') || r.status.includes('Max'));
  const impacted = TRADE_ROUTES.filter(r => r.status.includes('Down') || r.status.includes('Partial'));

  const flowData = TRADE_ROUTES.filter(r => r.unit === 'M bbl/day').map(r => ({
    name: r.route_name.length > 20 ? r.route_name.slice(0, 20) + '...' : r.route_name,
    prewar: r.pre_war_flow,
    current: r.current_flow,
    route_name: r.route_name,
  }));

  const getStatusColor = (status: string) => {
    if (status.includes('Block')) return 'text-accent-red';
    if (status.includes('Surge') || status.includes('Max') || status.includes('Doubled') || status.includes('Up')) return 'text-accent-green';
    if (status.includes('Active') && !status.includes('Partial')) return 'text-accent-blue';
    return 'text-accent-gold';
  };

  const getStatusBgColor = (status: string) => {
    if (status.includes('Block')) return 'bg-accent-red/10 border-accent-red/30';
    if (status.includes('Surge') || status.includes('Max') || status.includes('Doubled') || status.includes('Up')) return 'bg-accent-green/10 border-accent-green/30';
    if (status.includes('Active') && !status.includes('Partial')) return 'bg-accent-blue/10 border-accent-blue/30';
    return 'bg-accent-gold/10 border-accent-gold/30';
  };

  const getStatusIndicator = (status: string) => {
    if (status.includes('Block')) return '●';
    if (status.includes('Surge') || status.includes('Max') || status.includes('Doubled') || status.includes('Up')) return '↑';
    if (status.includes('Active') && !status.includes('Partial')) return '▬';
    return '↓';
  };

  return (
    <div className="space-y-6">
      {/* Status Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-3">
        <MetricCard
          label="Routes Blocked"
          value={blocked.length}
          source={`${blocked.length} of ${TRADE_ROUTES.length} total`}
          color="text-accent-red"
          size="lg"
        />
        <MetricCard
          label="Routes Surging"
          value={active.length}
          source={`${active.length} of ${TRADE_ROUTES.length} total`}
          color="text-accent-green"
          size="lg"
        />
        <MetricCard
          label="Total Routes"
          value={TRADE_ROUTES.length}
          source="Oil flow monitored"
          color="text-accent-blue"
          size="lg"
        />
      </div>

      {/* Route Status Map */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-1 text-lg">Route Status Overview</h3>
        <p className="text-txt-dim text-sm mb-5">All tracked trade routes with status and flow comparison</p>

        <div className="space-y-2">
          {TRADE_ROUTES.map((route, idx) => {
            const flowChange = route.current_flow - route.pre_war_flow;
            const flowChangePercent = route.pre_war_flow > 0 ? ((flowChange / route.pre_war_flow) * 100).toFixed(0) : '0';

            return (
              <div
                key={idx}
                className={`border rounded-lg p-3 transition-all ${getStatusBgColor(route.status)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-lg font-bold ${getStatusColor(route.status)}`}>
                        {getStatusIndicator(route.status)}
                      </span>
                      <span className="font-semibold text-txt-primary text-sm">{route.route_name}</span>
                    </div>
                    <div className="text-xs text-txt-muted">{route.notes}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-mono font-bold ${getStatusColor(route.status)}`}>
                      {route.status}
                    </div>
                    {route.unit === 'M bbl/day' && (
                      <div className={`text-xs font-mono mt-1 ${
                        flowChange > 0 ? 'text-accent-green' :
                        flowChange < 0 ? 'text-accent-red' :
                        'text-txt-muted'
                      }`}>
                        {flowChange > 0 ? '+' : ''}{flowChange.toFixed(1)} ({flowChangePercent}%)
                      </div>
                    )}
                  </div>
                </div>

                {/* Flow comparison bar */}
                {route.unit === 'M bbl/day' && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-txt-muted uppercase tracking-wide">Flow</span>
                      <span className="text-xs font-mono text-txt-secondary">
                        {route.pre_war_flow.toFixed(1)} → {route.current_flow.toFixed(1)} M bbl/d
                      </span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="flex-1 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-blue transition-all"
                          style={{ width: `${Math.min((route.pre_war_flow / Math.max(...TRADE_ROUTES.map(r => r.pre_war_flow))) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex-1 bg-border rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            route.current_flow > route.pre_war_flow ? 'bg-accent-green' :
                            route.current_flow < route.pre_war_flow ? 'bg-accent-red' :
                            'bg-accent-blue'
                          }`}
                          style={{ width: `${Math.min((route.current_flow / Math.max(...TRADE_ROUTES.map(r => r.current_flow), ...TRADE_ROUTES.map(r => r.pre_war_flow))) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Oil Flow Comparison Chart */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-txt-primary mb-1 text-lg">Oil Flow Comparison (M bbl/day)</h3>
        <p className="text-txt-dim text-sm mb-5">Pre-war vs current flows by route</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={flowData} margin={{ top: 10, right: 20, bottom: 100, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={120}
              interval={0}
            />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #3b82f6', borderRadius: 8, color: '#f1f5f9' }}
              formatter={(v: number) => [v.toFixed(2), '']}
              labelFormatter={(label) => {
                const route = flowData.find(r => (r.name.length > 20 ? r.name.slice(0, 20) + '...' : r.name) === label);
                return route ? route.route_name : label;
              }}
            />
            <Legend
              wrapperStyle={{ color: '#94a3b8', paddingTop: '20px' }}
              formatter={() => ['Pre-War Flow', 'Current Flow']}
            />
            <Bar dataKey="prewar" name="Pre-War" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="current" name="Current" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Trade Routes Table */}
      <DataTable
        title={`All Trade Routes (${TRADE_ROUTES.length})`}
        columns={[
          {
            key: 'route_name',
            label: 'Route',
          },
          {
            key: 'pre_war_flow',
            label: 'Pre-War Flow',
            format: (v: number) => `${v.toFixed(2)}`,
          },
          {
            key: 'current_flow',
            label: 'Current Flow',
            format: (v: number) => `${v.toFixed(2)}`,
          },
          {
            key: 'unit',
            label: 'Unit',
          },
          {
            key: 'status',
            label: 'Status',
            color: getStatusColor,
          },
          {
            key: 'notes',
            label: 'Notes',
          },
        ]}
        data={TRADE_ROUTES}
      />

      {/* Status Legend */}
      <div className="bg-bg-secondary border border-border rounded-lg p-4">
        <h4 className="font-heading font-semibold text-txt-primary mb-3 text-sm">Status Legend</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatusLegendItem
            label="Blocked Routes"
            description="Trade halted or severely restricted"
            color="accent-red"
          />
          <StatusLegendItem
            label="Surging Routes"
            description="Flow increased to compensate"
            color="accent-green"
          />
          <StatusLegendItem
            label="Active Routes"
            description="Operating at normal or near-normal levels"
            color="accent-blue"
          />
          <StatusLegendItem
            label="Impacted Routes"
            description="Partial or declining flow"
            color="accent-gold"
          />
        </div>
      </div>
    </div>
  );
}

function StatusLegendItem({ label, description, color }: { label: string; description: string; color: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 bg-${color}`} />
      <div>
        <div className="text-sm font-semibold text-txt-primary">{label}</div>
        <div className="text-xs text-txt-muted mt-0.5">{description}</div>
      </div>
    </div>
  );
}

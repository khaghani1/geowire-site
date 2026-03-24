'use client';
import { useState, useMemo } from 'react';
import MetricCard from './MetricCard';
import { projectOilPrice, calculateGDPImpact, reserveRunway, regimeChangeProbability, foodInflationProjection, usConsumerImpact } from '@/lib/models';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const PRESETS = {
  current: { hormuzFlowPct: 3, opecExtraSupply: 2, ieaReleaseTotal: 400, warWeeks: 3.2, powerPlantStrikes: false, khargSeized: false, ceasefire: false, basijDegradedPct: 40 },
  bestCase: { hormuzFlowPct: 80, opecExtraSupply: 5, ieaReleaseTotal: 500, warWeeks: 1, powerPlantStrikes: false, khargSeized: false, ceasefire: true, basijDegradedPct: 20 },
  worstCase: { hormuzFlowPct: 0, opecExtraSupply: 0, ieaReleaseTotal: 0, warWeeks: 12, powerPlantStrikes: true, khargSeized: true, ceasefire: false, basijDegradedPct: 80 },
  historical1979: { hormuzFlowPct: 10, opecExtraSupply: 1, ieaReleaseTotal: 100, warWeeks: 8, powerPlantStrikes: false, khargSeized: false, ceasefire: false, basijDegradedPct: 60 },
};

export default function Scenarios() {
  const [hormuzFlowPct, setHormuzFlowPct] = useState(3);
  const [opecExtraSupply, setOpecExtraSupply] = useState(2);
  const [ieaReleaseTotal, setIeaReleaseTotal] = useState(400);
  const [warWeeks, setWarWeeks] = useState(3.2);
  const [powerPlantStrikes, setPowerPlantStrikes] = useState(false);
  const [khargSeized, setKhargSeized] = useState(false);
  const [ceasefire, setCeasefire] = useState(false);
  const [basijDegradedPct, setBasijDegradedPct] = useState(40);
  const [internetRestored, setInternetRestored] = useState(false);
  const [irgcFractures, setIrgcFractures] = useState(false);

  const applyPreset = (preset: typeof PRESETS[keyof typeof PRESETS]) => {
    setHormuzFlowPct(preset.hormuzFlowPct);
    setOpecExtraSupply(preset.opecExtraSupply);
    setIeaReleaseTotal(preset.ieaReleaseTotal);
    setWarWeeks(preset.warWeeks);
    setPowerPlantStrikes(preset.powerPlantStrikes);
    setKhargSeized(preset.khargSeized);
    setCeasefire(preset.ceasefire);
    setBasijDegradedPct(preset.basijDegradedPct);
  };

  const oilPrice = useMemo(() => projectOilPrice({ hormuzFlowPct, opecExtraSupply, ieaReleaseTotal, warWeeks, powerPlantStrikes, khargSeized, ceasefire }), [hormuzFlowPct, opecExtraSupply, ieaReleaseTotal, warWeeks, powerPlantStrikes, khargSeized, ceasefire]);

  const gdpData = useMemo(() => {
    const countries = ['global', 'US', 'China', 'India', 'Japan', 'EU', 'Qatar', 'UAE', 'Saudi', 'Russia'];
    return countries.map(c => ({ name: c, impact: +calculateGDPImpact(oilPrice, warWeeks, c).toFixed(2) }));
  }, [oilPrice, warWeeks]);

  const reserves = useMemo(() => ({
    china: reserveRunway(1200, 10, hormuzFlowPct),
    japan: reserveRunway(500, 3.5, hormuzFlowPct),
    korea: reserveRunway(178, 2.8, hormuzFlowPct),
    india: reserveRunway(200, 4.5, hormuzFlowPct),
  }), [hormuzFlowPct]);

  const regime = useMemo(() => regimeChangeProbability({ basijDegradedPct, internetRestored, powerPlantStrikes, warWeeks, economicCollapse: 7, irgcFractures }), [basijDegradedPct, internetRestored, powerPlantStrikes, warWeeks, irgcFractures]);

  const food = useMemo(() => foodInflationProjection(hormuzFlowPct, oilPrice, warWeeks), [hormuzFlowPct, oilPrice, warWeeks]);
  const consumer = useMemo(() => usConsumerImpact(oilPrice), [oilPrice]);

  const regimeData = [
    { name: 'Regime Collapse', value: regime.collapse, color: '#ef4444' },
    { name: 'Popular Uprising', value: regime.uprising, color: '#f97316' },
    { name: 'Slow Decay', value: regime.decay, color: '#eab308' },
    { name: 'Negotiated Exit', value: regime.negotiate, color: '#3b82f6' },
    { name: 'North Korea Model', value: regime.northKorea, color: '#a855f7' },
  ];

  const oilPriceColor = oilPrice > 140 ? 'text-accent-red' : oilPrice > 110 ? 'text-accent-orange' : 'text-accent-gold';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 border border-accent-purple/20 rounded-lg p-6">
        <h3 className="font-heading font-bold text-accent-purple text-xl mb-2">Interactive Scenario Modeler</h3>
        <p className="text-txt-secondary text-sm mb-4">Adjust parameters below. All outputs recalculate in real-time.</p>

        {/* Scenario Presets */}
        <div className="space-y-2">
          <label className="text-xs text-txt-dim uppercase tracking-widest font-semibold">Quick Presets:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <PresetButton label="Current" onClick={() => applyPreset(PRESETS.current)} />
            <PresetButton label="Best Case" onClick={() => applyPreset(PRESETS.bestCase)} color="accent-green" />
            <PresetButton label="Worst Case" onClick={() => applyPreset(PRESETS.worstCase)} color="accent-red" />
            <PresetButton label="1979 Parallel" onClick={() => applyPreset(PRESETS.historical1979)} color="accent-orange" />
          </div>
        </div>
      </div>

      {/* Key Output Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          label="Projected Brent"
          value={`$${oilPrice}`}
          prewar="$71"
          change={+((oilPrice - 71) / 71 * 100).toFixed(1) as any}
          unit="/bbl"
          size="lg"
          color={oilPriceColor}
        />
        <MetricCard
          label="US Gas Price"
          value={`$${consumer.gasPrice}`}
          prewar="$2.98"
          unit="/gal"
          size="sm"
          color={consumer.gasPrice > 4 ? 'text-accent-red' : 'text-accent-orange'}
        />
        <MetricCard
          label="CA Gas Price"
          value={`$${consumer.caGasPrice}`}
          prewar="$3.86"
          unit="/gal"
          size="sm"
          color={consumer.caGasPrice > 6 ? 'text-accent-red' : 'text-accent-orange'}
        />
        <MetricCard
          label="Monthly Cost↑"
          value={`$${consumer.monthlyIncrease}`}
          unit="/household"
          size="sm"
          color={consumer.monthlyIncrease > 100 ? 'text-accent-red' : 'text-accent-orange'}
        />
        <MetricCard
          label="Food Inflation"
          value={`${food.foodInflation.toFixed(1)}%`}
          size="sm"
          color={food.foodInflation > 15 ? 'text-accent-red' : 'text-accent-orange'}
        />
        <MetricCard
          label="Famine Risk"
          value={food.famineRisk}
          size="sm"
          color={food.famineRisk === 'CRITICAL' ? 'text-accent-red' : food.famineRisk === 'HIGH' ? 'text-accent-orange' : 'text-accent-gold'}
        />
      </div>

      {/* Controls */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Supply Parameters */}
        <div className="bg-bg-card border border-border rounded-lg p-6">
          <h4 className="font-heading font-semibold text-txt-primary mb-5 text-lg">Supply Parameters</h4>
          <div className="space-y-5">
            <Slider label={`Hormuz Flow: ${hormuzFlowPct}%`} value={hormuzFlowPct} min={0} max={100} onChange={setHormuzFlowPct} help="% of normal flow passing through Strait" />
            <Slider label={`OPEC+ Extra Supply: ${opecExtraSupply} M bbl/d`} value={opecExtraSupply} min={0} max={8} step={0.5} onChange={setOpecExtraSupply} help="Additional emergency production" />
            <Slider label={`IEA SPR Release: ${ieaReleaseTotal}M bbl`} value={ieaReleaseTotal} min={0} max={1000} step={50} onChange={setIeaReleaseTotal} help="Total strategic reserve release" />
            <Slider label={`War Duration: ${warWeeks} weeks`} value={warWeeks} min={1} max={52} step={0.5} onChange={setWarWeeks} help="Estimated conflict length" />
          </div>
        </div>

        {/* Escalation Toggles */}
        <div className="bg-bg-card border border-border rounded-lg p-6">
          <h4 className="font-heading font-semibold text-txt-primary mb-5 text-lg">Escalation & Regime</h4>
          <div className="space-y-4">
            <Toggle label="Power Plant Strikes" checked={powerPlantStrikes} onChange={setPowerPlantStrikes} desc="US targets Iranian energy infrastructure" />
            <Toggle label="Kharg Island Seized" checked={khargSeized} onChange={setKhargSeized} desc="Coalition controls Iran's main export terminal" />
            <Toggle label="Ceasefire" checked={ceasefire} onChange={setCeasefire} desc="Both sides agree to cessation of hostilities" />
            <Toggle label="Internet Restored" checked={internetRestored} onChange={setInternetRestored} desc="Iran restores national connectivity" />
            <Toggle label="IRGC Fractures" checked={irgcFractures} onChange={setIrgcFractures} desc="Visible splits in Islamic Revolutionary Guard leadership" />
            <Slider label={`Basij Degraded: ${basijDegradedPct}%`} value={basijDegradedPct} min={0} max={80} onChange={setBasijDegradedPct} help="Militia combat effectiveness loss" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* GDP Impact */}
        <div className="bg-bg-card border border-border rounded-lg p-6">
          <h4 className="font-heading font-semibold text-txt-primary mb-4 text-lg">GDP Impact by Country (%)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gdpData} layout="vertical" margin={{ left: 60, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={60} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #3b82f6', borderRadius: 8, color: '#f1f5f9' }}
                formatter={(v: number) => [`${v.toFixed(2)}%`, 'GDP Impact']}
              />
              <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                {gdpData.map((entry, i) => (
                  <Cell key={i} fill={entry.impact < -0.5 ? '#ef4444' : entry.impact < 0 ? '#f97316' : '#22c55e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regime Change */}
        <div className="bg-bg-card border border-border rounded-lg p-6">
          <h4 className="font-heading font-semibold text-txt-primary mb-4 text-lg">Regime Change Probability</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={regimeData}
                cx="50%"
                cy="45%"
                outerRadius={70}
                dataKey="value"
                label={({ name, value }) => `${value}%`}
                labelLine={false}
              >
                {regimeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f1520', border: '1px solid #3b82f6', borderRadius: 8, color: '#f1f5f9' }} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-6 text-[11px]">
            {regimeData.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <div>
                  <div className="font-bold text-txt-primary">{d.value}%</div>
                  <div className="text-txt-muted">{d.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reserve Runway */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <h4 className="font-heading font-semibold text-txt-primary mb-1 text-lg">Strategic Reserve Runway</h4>
        <p className="text-txt-dim text-sm mb-5">Days until strategic petroleum reserves depleted at current flow</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard
            label="🇨🇳 China"
            value={reserves.china > 900 ? '∞' : reserves.china}
            unit="days"
            color={reserves.china < 90 ? 'text-accent-red' : reserves.china < 180 ? 'text-accent-gold' : 'text-accent-green'}
          />
          <MetricCard
            label="🇯🇵 Japan"
            value={reserves.japan > 900 ? '∞' : reserves.japan}
            unit="days"
            color={reserves.japan < 90 ? 'text-accent-red' : reserves.japan < 180 ? 'text-accent-gold' : 'text-accent-green'}
          />
          <MetricCard
            label="🇰🇷 S. Korea"
            value={reserves.korea > 900 ? '∞' : reserves.korea}
            unit="days"
            color={reserves.korea < 90 ? 'text-accent-red' : reserves.korea < 180 ? 'text-accent-gold' : 'text-accent-green'}
          />
          <MetricCard
            label="🇮🇳 India"
            value={reserves.india > 900 ? '∞' : reserves.india}
            unit="days"
            color={reserves.india < 60 ? 'text-accent-red' : reserves.india < 90 ? 'text-accent-gold' : 'text-accent-green'}
          />
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step = 1, onChange, help }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; help?: string }) {
  return (
    <div>
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-txt-primary">{label}</span>
        {help && <span className="text-xs text-txt-muted">{help}</span>}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent-blue"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange, desc }: { label: string; checked: boolean; onChange: (v: boolean) => void; desc: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div
        className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 mt-0.5 ${checked ? 'bg-accent-blue' : 'bg-border'}`}
        onClick={() => onChange(!checked)}
      >
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${checked ? 'left-5.5' : 'left-0.5'}`} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-txt-primary group-hover:text-txt-secondary transition-colors">{label}</div>
        <div className="text-xs text-txt-muted mt-0.5">{desc}</div>
      </div>
    </label>
  );
}

function PresetButton({ label, onClick, color = 'accent-blue' }: { label: string; onClick: () => void; color?: string }) {
  const colorClass = `hover:bg-${color}`;
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 bg-bg-secondary border border-border rounded-lg text-sm font-semibold text-txt-primary transition-all hover:border-${color} hover:bg-${color}/10`}
    >
      {label}
    </button>
  );
}

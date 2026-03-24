'use client';
import { useEffect, useState } from 'react';

interface MarketCard {
  id: string; label: string; value: number; unit: string;
  baseline: number; change: number; category: string; source: string;
}
interface SupplyItem { name: string; status: string; level: number; color: string; }
interface RiskItem { country: string; risk: number; flag: string; }
interface CrisisData {
  marketCards: MarketCard[]; supplyChain: SupplyItem[]; riskMap: RiskItem[];
  warDay: number; refugees: number; timestamp: string; source: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<CrisisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCrisis() {
      try {
        const res = await fetch('/api/crisis');
        const json = await res.json();
        setData(json);
      } catch { /* fallback handled by API */ }
      setLoading(false);
    }
    fetchCrisis();
    const interval = setInterval(fetchCrisis, 120000);
    return () => clearInterval(interval);
  }, []);

  const formatVal = (v: number, unit: string) => {
    if (unit === '%') return v.toFixed(2) + '%';
    if (unit.startsWith('$')) return '$' + v.toLocaleString('en-US', {maximumFractionDigits: 2});
    if (v >= 10000) return v.toLocaleString('en-US', {maximumFractionDigits: 0});
    if (v >= 100) return v.toLocaleString('en-US', {maximumFractionDigits: 2});
    return v.toFixed(2);
  };

  if (loading || !data) return (
    <div className="min-h-screen bg-gw-bg-0 flex items-center justify-center">
      <div className="text-gw-gold font-mono animate-pulse text-lg">LOADING CRISIS DATA...</div>
    </div>
  );

  const now = new Date();
  const totalCost = (1.75 * data.warDay).toFixed(1);
  const displacedK = (data.refugees / 1000).toFixed(0);

  const timeline = [
    { date: '2026-02-28', type: 'MILITARY', text: 'Operation Epic Fury begins â US strikes 150+ targets across Iran', src: 'CENTCOM' },
    { date: '2026-02-28', type: 'MILITARY', text: 'Iran retaliates â missiles hit UAE, Kuwait, Bahrain, Israel', src: 'Multiple' },
    { date: '2026-02-28', type: 'ECONOMIC', text: 'Strait of Hormuz effectively closed â insurance withdrawn', src: 'Lloyds' },
    { date: '2026-03-01', type: 'ECONOMIC', text: 'Brent spikes to $138/bbl; Dubai crude at $166', src: 'Bloomberg' },
    { date: '2026-03-02', type: 'ECONOMIC', text: 'IEA announces coordinated 400M barrel SPR release', src: 'IEA' },
    { date: '2026-03-03', type: 'HUMANITARIAN', text: 'Iran cuts internet to 1% â near total blackout', src: 'NetBlocks' },
    { date: '2026-03-05', type: 'MILITARY', text: 'US destroys 80% of Iranian air defense network', src: 'Pentagon' },
    { date: '2026-03-10', type: 'ECONOMIC', text: 'Global shipping reroutes around Cape of Good Hope', src: 'Maersk' },
    { date: '2026-03-15', type: 'HUMANITARIAN', text: 'UNHCR reports 2M+ internally displaced in Iran', src: 'UNHCR' },
    { date: '2026-03-20', type: 'MILITARY', text: 'Iran threatens 48hr power plant strike ultimatum', src: 'IRGC' },
  ];

  return (
    <main className="min-h-screen bg-gw-bg-0 text-gw-tx-0">
      {/* War Status Banner */}
      <div className="border-b border-gw-border bg-gradient-to-r from-gw-bg-1 via-gw-bg-0 to-gw-bg-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display">
                Operation Epic Fury{' '}
                <span className="text-gw-gold text-4xl md:text-5xl font-bold">Day {data.warDay}</span>
              </h1>
              <p className="text-gw-tx-2 text-sm mt-1 font-mono">Active Ultimatum: 48hr power plant strike threat (Mar 21)</p>
              <p className="text-gw-tx-3 text-xs font-mono mt-1">Started Feb 28, 2026 &middot; {data.warDay} days of intensive operations</p>
            </div>
            <div className="flex gap-6 md:gap-8 text-center">
              <div>
                <div className="text-gw-red text-2xl md:text-3xl font-mono font-bold">8000</div>
                <div className="text-gw-tx-3 text-[10px] font-mono tracking-widest">TARGETS STRUCK</div>
              </div>
              <div>
                <div className="text-gw-orange text-2xl md:text-3xl font-mono font-bold">13</div>
                <div className="text-gw-tx-3 text-[10px] font-mono tracking-widest">US KIA</div>
              </div>
              <div>
                <div className="text-gw-red text-2xl md:text-3xl font-mono font-bold">{displacedK}K+</div>
                <div className="text-gw-tx-3 text-[10px] font-mono tracking-widest">DISPLACED</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-b border-gw-border bg-gw-bg-1">
        <div className="max-w-[1400px] mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gw-red animate-pulse"></span>
              <span className="text-gw-red text-xs font-mono font-bold tracking-widest">CRITICAL</span>
            </div>
            <span className="text-gw-tx-3 text-xs font-mono">THREAT LEVEL</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-xs font-mono text-gw-tx-2">
            <span>WAR DAY <span className="text-gw-tx-0 font-bold">{data.warDay}</span></span>
            <span>ACTIVE FRONTS <span className="text-gw-tx-0 font-bold">3</span></span>
            <span>SPR HOURS <span className="text-gw-tx-0 font-bold">48</span></span>
            <span className="text-gw-tx-3 hidden md:inline">
              {now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })},{' '}
              {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
        {/* Market Data Grid */}
        {data.marketCards.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {data.marketCards.map(card => (
              <div key={card.id} className="border border-gw-border rounded bg-gw-bg-1 p-3 hover:border-gw-gold/30 transition-colors">
                <div className="text-[10px] font-mono text-gw-tx-2 tracking-widest uppercase mb-1">{card.label}</div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-lg font-mono font-bold ${card.change >= 0 ? 'text-gw-green' : 'text-gw-red'}`}>
                    {formatVal(card.value, card.unit)}
                  </span>
                  <span className="text-gw-tx-3 text-[10px] font-mono">{card.unit.replace('$/', '/')}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-gw-tx-3 text-[9px] font-mono">Pre-war: {formatVal(card.baseline, card.unit)}</span>
                  <span className={`text-[10px] font-mono font-bold ${card.change >= 0 ? 'text-gw-green' : 'text-gw-red'}`}>
                    {card.change >= 0 ? '\u25b2' : '\u25bc'} {card.change >= 0 ? '+' : ''}{card.change.toFixed(1)}%
                  </span>
                </div>
                <div className="text-[8px] font-mono text-gw-tx-3 mt-1">{card.source}</div>
              </div>
            ))}
          </div>
        )}

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supply Chain Status */}
          <div className="border border-gw-border rounded bg-gw-bg-1 p-4">
            <h3 className="text-xs font-mono font-bold tracking-widest text-gw-tx-0 mb-4">SUPPLY CHAIN STATUS</h3>
            <div className="space-y-3">
              {data.supplyChain.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color === 'red' ? 'bg-gw-red' : item.color === 'orange' ? 'bg-gw-orange' : 'bg-gw-green'}`}></span>
                    <span className="text-sm text-gw-tx-1">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-gw-bg-3 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color === 'red' ? 'bg-gw-red' : item.color === 'orange' ? 'bg-gw-orange' : 'bg-gw-green'}`}
                        style={{width: `${item.level}%`}}></div>
                    </div>
                    <span className={`text-xs font-mono font-bold w-24 text-right ${item.color === 'red' ? 'text-gw-red' : item.color === 'orange' ? 'text-gw-orange' : 'text-gw-green'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conflict Timeline */}
          <div className="border border-gw-border rounded bg-gw-bg-1 p-4 max-h-[400px] overflow-y-auto">
            <h3 className="text-xs font-mono font-bold tracking-widest text-gw-tx-0 mb-4">CONFLICT TIMELINE (RECENT)</h3>
            <div className="space-y-3 text-sm">
              {timeline.map((evt, i) => (
                <div key={i} className="border-l-2 border-gw-border pl-3 hover:border-gw-gold transition-colors">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-gw-tx-3 text-xs font-mono">{evt.date}</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      evt.type === 'MILITARY' ? 'bg-gw-red/20 text-gw-red' :
                      evt.type === 'ECONOMIC' ? 'bg-gw-orange/20 text-gw-orange' :
                      'bg-gw-gold/20 text-gw-gold'
                    }`}>{evt.type}</span>
                  </div>
                  <p className="text-gw-tx-1 text-xs">{evt.text}</p>
                  <p className="text-gw-tx-3 text-[10px] font-mono">{evt.src}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Risk + War Cost */}
          <div className="space-y-6">
            {/* Risk Heatmap */}
            <div className="border border-gw-border rounded bg-gw-bg-1 p-4">
              <h3 className="text-xs font-mono font-bold tracking-widest text-gw-tx-0 mb-4">GLOBAL RISK HEATMAP (TOP 5)</h3>
              <div className="space-y-3">
                {data.riskMap.map(item => (
                  <div key={item.country}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gw-tx-0">{item.flag} {item.country}</span>
                      <span className={`text-sm font-mono font-bold ${item.risk >= 90 ? 'text-gw-red' : item.risk >= 80 ? 'text-gw-orange' : 'text-gw-gold'}`}>
                        {item.risk}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gw-bg-3 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${item.risk >= 90 ? 'bg-gw-red' : item.risk >= 80 ? 'bg-gw-orange' : 'bg-gw-gold'}`}
                        style={{width: `${item.risk}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* War Cost */}
            <div className="border border-gw-border rounded bg-gw-bg-1 p-4">
              <h3 className="text-[10px] font-mono font-bold tracking-widest text-gw-tx-2 mb-3">WAR COST TO US TAXPAYERS</h3>
              <div className="flex justify-between mb-3">
                <div>
                  <div className="text-[10px] font-mono text-gw-tx-3">DAILY COST</div>
                  <div className="text-2xl font-mono font-bold text-gw-gold">$1.75B</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-gw-tx-3">TOTAL ({data.warDay} DAYS)</div>
                  <div className="text-2xl font-mono font-bold text-gw-red">${totalCost}B</div>
                </div>
              </div>
              <div className="border border-gw-border rounded p-3 bg-gw-bg-0">
                <div className="text-[9px] font-mono text-gw-tx-3 mb-1">LIVE COST TICKER</div>
                <div className="text-xl font-mono font-bold text-gw-green">$1,215,278/minute</div>
                <div className="text-[10px] font-mono text-gw-tx-3">= $20,255/second</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 border-t border-gw-border">
          <p className="text-gw-tx-3 text-[10px] font-mono">
            Last data refresh: {data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : 'N/A'} &middot;{' '}
            Data sources: Bloomberg, FRED, CoinGecko, EIA, Kpler, UNHCR &middot; Source: {data.source}
          </p>
        </div>
      </div>
    </main>
  );
}

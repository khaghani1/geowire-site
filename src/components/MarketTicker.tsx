'use client';
import { useEffect, useState } from 'react';

interface TickerItem {
  symbol: string;
  label: string;
  value: number;
  unit: string;
  change: number;
}

export default function MarketTicker() {
  const [data, setData] = useState<TickerItem[]>([]);
  const [source, setSource] = useState('loading');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/market');
        const json = await res.json();
        setData(json.data);
        setSource(json.source);
      } catch {
        setSource('error');
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  const formatValue = (item: TickerItem) => {
    const v = item.value;
    if (v >= 10000) return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (v >= 100) return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (v >= 1) return v.toFixed(2);
    return v.toFixed(4);
  };

  if (data.length === 0) {
    return (
      <div className="bg-gw-bg-1 border-y border-gw-border overflow-hidden">
        <div className="flex items-center h-8 px-4">
          <span className="text-gw-tx-2 text-xs font-mono animate-pulse">Loading market data...</span>
        </div>
      </div>
    );
  }

  const items = [...data, ...data]; // duplicate for seamless scroll

  return (
    <div className="bg-gw-bg-1 border-y border-gw-border overflow-hidden relative">
      <div className="ticker-track flex items-center h-8 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <span className="text-gw-tx-2 text-xs font-mono uppercase tracking-wider">{item.label}</span>
            <span className="text-gw-tx-0 text-sm font-mono font-bold">
              {item.unit === '$/bbl' || item.unit === '$/oz' || item.unit === '$/gal' || item.unit === '$/bu' || item.unit === '$'
                ? '$' + formatValue(item)
                : formatValue(item)}
              {item.unit === '%' ? '%' : ''}
            </span>
            <span className={`text-xs font-mono ${item.change >= 0 ? 'text-gw-green' : 'text-gw-red'}`}>
              {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
      {source === 'crisisscope-live' && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <span className="text-[9px] font-mono text-gw-green opacity-60">LIVE</span>
        </div>
      )}
    </div>
  );
}

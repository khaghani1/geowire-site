'use client';

import { useState, useEffect } from 'react';

interface TickerItem {
  label: string;
  value: string;
  change?: string;
  isNegative?: boolean;
  isSpecial?: boolean;
}

const FALLBACK_DATA: TickerItem[] = [
  { label: 'BRENT CRUDE', value: '$101.15', change: '+33.9%', isNegative: false },
  { label: 'WTI CRUDE', value: '$90.22', change: '+28.9%', isNegative: false },
  { label: 'GOLD', value: '$4,412', change: '+37.9%', isNegative: false },
  { label: 'NAT GAS', value: '$3.88', change: '+30.2%', isNegative: false },
  { label: 'DOLLAR INDEX', value: '99.15', change: '-4.7%', isNegative: true },
  { label: '10Y TREASURY', value: '0.43%', change: '-89.8%', isNegative: true },
  { label: 'BITCOIN', value: '$70,716', change: '-16.8%', isNegative: true },
  { label: 'S&P 500', value: '6,581', change: '+9.7%', isNegative: false },
  { label: 'VIX', value: '26.15', change: '+45.3%', isNegative: false },
  { label: 'WHEAT', value: '$5.92', change: '+7.6%', isNegative: false },
  { label: 'HORMUZ', value: 'CLOSED', isSpecial: true },
];

export default function MarketTicker() {
  const [data, setData] = useState<TickerItem[]>(FALLBACK_DATA);

  useEffect(() => {
    async function fetchFred() {
      try {
        const res = await fetch('/api/live/latest');
        if (res.ok) {
          const json = await res.json();
          if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
            const items: TickerItem[] = json.data.slice(0, 10).map((d: any) => {
              const change = d.baseline ? (((d.value - d.baseline) / d.baseline) * 100).toFixed(1) : null;
              return {
                label: d.label || d.id,
                value: d.unit === '$/bbl' || d.unit === '$/oz' || d.unit === '$/gal' ? `$${d.value}` : `${d.value}${d.unit === '%' ? '%' : ''}`,
                change: change ? `${Number(change) >= 0 ? '+' : ''}${change}%` : undefined,
                isNegative: change ? Number(change) < 0 : false,
              };
            });
            items.push({ label: 'HORMUZ', value: 'CLOSED', isSpecial: true });
            setData(items);
          }
        }
      } catch {
        // Use fallback
      }
    }
    fetchFred();
    const interval = setInterval(fetchFred, 60000);
    return () => clearInterval(interval);
  }, []);

  const doubled = [...data, ...data];

  return (
    <div className="ticker-wrap bg-bg-1 border-b border-border py-1.5 hidden md:block">
      <div className="ticker-content">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 font-mono text-xs tracking-wider">
            <span className="text-tx-2">{item.label}</span>
            {item.isSpecial ? (
              <span className="text-accent-red font-semibold animate-pulse">{item.value}</span>
            ) : (
              <>
                <span className="text-tx-0 font-semibold">{item.value}</span>
                {item.change && (
                  <span className={`${item.isNegative ? 'text-accent-red' : 'text-accent-green'}`}>
                    {item.change}
                  </span>
                )}
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

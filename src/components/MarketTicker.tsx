'use client'

import { MOCK_MARKET_DATA } from '@/lib/mock-data'

export default function MarketTicker() {
  const items = MOCK_MARKET_DATA

  const renderItem = (item: (typeof items)[0], idx: number) => (
    <div
      key={`${item.indicator}-${idx}`}
      className="flex items-center gap-2 px-4 whitespace-nowrap"
    >
      <span className="text-gw-tx-3 text-[11px] font-mono uppercase">
        {item.indicator}
      </span>
      <span className="text-gw-tx-0 text-sm font-mono font-medium">
        {item.unit === '$'
          ? `$${item.current_value.toLocaleString()}`
          : item.unit === '$/bbl' || item.unit === '$/oz' || item.unit === '$/bu' || item.unit === '$/MMBtu'
          ? `$${item.current_value.toFixed(2)}`
          : item.current_value.toFixed(item.unit === '%' ? 2 : 4)}
      </span>
      <span
        className={`text-[11px] font-mono ${
          item.change_pct >= 0 ? 'text-gw-green' : 'text-gw-red'
        }`}
      >
        {item.change_pct >= 0 ? '+' : ''}
        {item.change_pct.toFixed(1)}%
      </span>
    </div>
  )

  return (
    <div className="bg-gw-bg-1 border-b border-gw-border overflow-hidden h-8 flex items-center">
      <div className="ticker-track">
        {items.map((item, i) => renderItem(item, i))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => renderItem(item, i + items.length))}
      </div>
    </div>
  )
}
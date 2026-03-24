import { NextResponse } from 'next/server';

const CRISISSCOPE_API = 'http://localhost:3000/api/live/latest';

const TICKER_KEYS = [
  'oil.brent', 'metal.gold', 'fx.dxy', 'rate.10y', 'crypto.btc',
  'gas.henry_hub', 'food.wheat', 'market.sp500', 'oil.wti',
  'market.nasdaq', 'market.dow', 'market.vix', 'crypto.eth',
  'metal.silver', 'fert.urea'
];

const FALLBACK = [
  { symbol: 'BRENT', label: 'Brent Crude', value: 100.39, unit: '$/bbl', change: 33.9 },
  { symbol: 'GOLD', label: 'Gold', value: 4412, unit: '$/oz', change: 37.9 },
  { symbol: 'DXY', label: 'Dollar Index', value: 99.15, unit: '', change: -4.7 },
  { symbol: 'US10Y', label: '10Y Treasury', value: 0.43, unit: '%', change: -89.8 },
  { symbol: 'BTC', label: 'Bitcoin', value: 70716, unit: '$', change: -16.8 },
  { symbol: 'NATGAS', label: 'Nat Gas', value: 3.88, unit: '$/gal', change: 30.2 },
  { symbol: 'WHEAT', label: 'Wheat', value: 5.89, unit: '$/bu', change: 7.1 },
  { symbol: 'SP500', label: 'S&P 500', value: 6581, unit: '', change: 9.7 },
];

export async function GET() {
  try {
    const res = await fetch(CRISISSCOPE_API, { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    const data = json.data;
    const tickerData = TICKER_KEYS.filter(k => data[k]).map(k => {
      const item = data[k];
      return { symbol: item.label.toUpperCase().replace(/\\s+/g, ''), label: item.label, value: item.value, unit: item.unit, change: item.change_pct, baseline: item.baseline, source: item.source };
    });
    return NextResponse.json({ data: tickerData, timestamp: json.timestamp, source: 'crisisscope-live' });
  } catch {
    return NextResponse.json({ data: FALLBACK, timestamp: new Date().toISOString(), source: 'fallback' });
  }
}

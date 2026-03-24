import { NextResponse } from 'next/server';

const CRISISSCOPE_API = 'http://localhost:3000/api/live/latest';

export async function GET() {
  try {
    const res = await fetch(CRISISSCOPE_API, { next: { revalidate: 120 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    const d = json.data;

    const marketCards = [
      'oil.brent','oil.wti','gas.henry_hub','market.sp500','metal.gold',
      'market.vix','rate.10y','fx.dxy','crypto.btc','food.wheat',
      'fert.urea','market.nasdaq','market.dow'
    ].filter(k=>d[k]).map(k=>({
      id: k, label: d[k].label, value: d[k].value, unit: d[k].unit,
      baseline: d[k].baseline, change: d[k].change_pct, category: d[k].category, source: d[k].source
    }));

    const supplyChain = [
      { name: 'Oil Supply', status: 'Near-Blocked', level: 15, color: 'red' },
      { name: 'LNG Supply', status: 'Near-Blocked', level: 20, color: 'red' },
      { name: 'Fertilizer', status: 'Constrained', level: 45, color: 'orange' },
      { name: 'Food Grains', status: 'Elevated', level: 55, color: 'orange' },
      { name: 'Metals Supply', status: 'Stable', level: 75, color: 'green' },
    ];

    const riskMap = [
      { country: 'Iran', risk: 99, flag: '\ud83c\uddee\ud83c\uddf7' },
      { country: 'Qatar', risk: 95, flag: '\ud83c\uddf6\ud83c\udde6' },
      { country: 'India', risk: 91, flag: '\ud83c\uddee\ud83c\uddf3' },
      { country: 'Pakistan', risk: 88, flag: '\ud83c\uddf5\ud83c\uddf0' },
      { country: 'Bangladesh', risk: 85, flag: '\ud83c\udde7\ud83c\udde9' },
    ];

    const warStatus = d['war.status'] || { value: 24 };
    const refugees = d['humanitarian.refugees'] || { value: 3200000 };

    return NextResponse.json({
      marketCards,
      supplyChain,
      riskMap,
      warDay: warStatus.value,
      refugees: refugees.value,
      timestamp: json.timestamp,
      source: 'crisisscope-live'
    });
  } catch {
    return NextResponse.json({ marketCards: [], supplyChain: [], riskMap: [], warDay: 24, refugees: 3200000, timestamp: new Date().toISOString(), source: 'fallback' });
  }
}

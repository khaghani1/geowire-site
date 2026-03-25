'use client';

import { useState, useEffect, useCallback } from 'react';
import { getWarDay, getTotalWarCost, WAR_COST_PER_SECOND, WAR_COST_PER_DAY, FEDERAL_REVENUE, TAX_BRACKETS_SINGLE, TAX_BRACKETS_MARRIED } from '@/lib/constants';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import AdZone from '@/components/AdZone';
import Footer from '@/components/Footer';

function calculateTaxPaid(income: number, brackets: typeof TAX_BRACKETS_SINGLE): number {
  let tax = 0;
  for (const bracket of brackets) {
    if (income <= bracket.min) break;
    const taxable = Math.min(income, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

function formatMoney(n: number): string {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const COMPARISONS = [
  { amount: 3.50,   label: 'gallons of gas',        icon: '⛽' },
  { amount: 5.69,   label: 'Big Macs',               icon: '🍔' },
  { amount: 12.00,  label: 'Chipotle burritos',      icon: '🌯' },
  { amount: 15.49,  label: 'months of Netflix',      icon: '📺' },
  { amount: 75,     label: 'ER copays',              icon: '🏥' },
  { amount: 120,    label: 'college textbooks',      icon: '📚' },
  { amount: 250,    label: 'domestic flights',       icon: '✈️' },
  { amount: 400,    label: 'monthly student loan payments', icon: '🎓' },
  { amount: 1800,   label: 'rent payments',          icon: '🏠' },
  { amount: 25000,  label: 'public school annual costs', icon: '🏫' },
];

const GLOBAL_DAMAGE = [
  { label: 'Global oil supply disruption', value: '–20M bbl/day', sub: 'Hormuz at 3% capacity', color: 'text-red-400' },
  { label: 'Global GDP impact (est.)', value: '–$200B+', sub: 'Indirect economic cost', color: 'text-orange-400' },
  { label: 'Oil price increase', value: '+$44/bbl', sub: '$68→$112 Brent crude', color: 'text-yellow-400' },
  { label: 'Inflation impact (global)', value: '+1.8 pp', sub: 'Food + energy basket', color: 'text-yellow-300' },
  { label: 'Iran internet (civilian)', value: '1% online', sub: 'Full communications blackout', color: 'text-red-300' },
  { label: 'Shipping insurance surge', value: '+1,200%', sub: 'Hormuz war risk premium', color: 'text-orange-300' },
];

export default function WarCostPage() {
  const [income, setIncome] = useState('');
  const [filing, setFiling] = useState<'single' | 'married'>('single');
  const [result, setResult] = useState<null | { total: number; perDay: number; perHour: number; perMinute: number }>(null);
  const [liveCost, setLiveCost] = useState(0);
  const [totalWarCost, setTotalWarCost] = useState(getTotalWarCost());
  const [copied, setCopied] = useState(false);

  // Always-running national cost counter
  useEffect(() => {
    const iv = setInterval(() => setTotalWarCost((c) => c + WAR_COST_PER_SECOND), 1000);
    return () => clearInterval(iv);
  }, []);

  // Personal live counter
  useEffect(() => {
    if (!result) return;
    const iv = setInterval(() => {
      setLiveCost((c) => c + result.perMinute / 60);
    }, 1000);
    return () => clearInterval(iv);
  }, [result]);

  const calculate = useCallback(() => {
    const inc = parseFloat(income.replace(/[^0-9.]/g, ''));
    if (!inc || inc <= 0) return;
    const brackets = filing === 'single' ? TAX_BRACKETS_SINGLE : TAX_BRACKETS_MARRIED;
    const taxPaid = calculateTaxPaid(inc, brackets);
    const shareOfRevenue = taxPaid / FEDERAL_REVENUE;
    const warDay = getWarDay();
    const totalCostSoFar = WAR_COST_PER_DAY * warDay;
    const personalCost = totalCostSoFar * shareOfRevenue;
    const perDay = personalCost / warDay;
    const perHour = perDay / 24;
    const perMinute = perHour / 60;
    setLiveCost(personalCost);
    setResult({ total: personalCost, perDay, perHour, perMinute });
  }, [income, filing]);

  const shareText = result
    ? `The Iran war has cost me personally $${Math.round(liveCost).toLocaleString()} so far. That's $${result.perDay.toFixed(2)}/day of MY tax dollars. Calculate yours: https://geowire.org/cost`
    : '';

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bg-0">
      <MarketTicker />
      <Header />
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <AdZone size="leaderboard" className="mb-8" />

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-tx-0 mb-4">
            What Has This War Cost <span className="text-accent-red">YOU</span>?
          </h1>
          <p className="text-tx-2 text-lg max-w-2xl mx-auto">
            Every American taxpayer is funding Operation Epic Fury. Enter your income to see your personal share of the cost.
          </p>
        </div>

        {/* Always-visible national counter */}
        <div className="bg-bg-2 border border-accent-red/40 rounded-xl p-6 mb-8 text-center">
          <p className="font-mono text-xs text-tx-3 uppercase tracking-widest mb-2">National War Cost — Live</p>
          <div className="font-mono text-4xl sm:text-5xl font-bold text-accent-red tabular-nums mb-2">
            {formatMoney(totalWarCost)}
          </div>
          <div className="flex items-center justify-center gap-6 mt-3 text-[11px] font-mono text-tx-3">
            <span>+{formatMoney(WAR_COST_PER_SECOND)}<span className="text-tx-4">/sec</span></span>
            <span className="w-px h-3 bg-border" />
            <span>{formatMoney(WAR_COST_PER_DAY)}<span className="text-tx-4">/day</span></span>
            <span className="w-px h-3 bg-border" />
            <span>Day <strong className="text-tx-1">{getWarDay()}</strong></span>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-bg-2 border border-border rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="font-mono text-xs text-tx-3 uppercase tracking-widest mb-5">Calculate Your Personal Share</h2>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-4 items-end">
            <div>
              <label className="font-mono text-xs text-tx-3 uppercase tracking-wider mb-2 block">Annual Income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-tx-3 text-lg">$</span>
                <input
                  type="text"
                  value={income}
                  onChange={(e) => setIncome(e.target.value.replace(/[^0-9.,]/g, ''))}
                  onKeyDown={(e) => e.key === 'Enter' && calculate()}
                  placeholder="75,000"
                  className="w-full bg-bg-1 border border-border rounded-lg pl-8 pr-4 py-3 text-xl text-tx-0 font-mono placeholder:text-tx-3 focus:border-accent-gold outline-none"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs text-tx-3 uppercase tracking-wider mb-2 block">Filing Status</label>
              <select
                value={filing}
                onChange={(e) => setFiling(e.target.value as 'single' | 'married')}
                className="bg-bg-1 border border-border rounded-lg px-4 py-3 text-tx-0 font-mono focus:border-accent-gold outline-none"
              >
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
              </select>
            </div>
            <button
              onClick={calculate}
              className="bg-accent-red hover:bg-accent-red/90 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <>
            <div className="bg-bg-2 border border-accent-red/30 rounded-xl p-8 mb-8 text-center">
              <p className="font-mono text-sm text-tx-2 uppercase tracking-wider mb-3">This war has cost YOU</p>
              <div className="font-mono text-5xl sm:text-6xl lg:text-7xl font-bold cost-counter mb-2 tabular-nums">
                ${Math.round(liveCost).toLocaleString()}
              </div>
              <p className="font-mono text-xs text-tx-3 mb-6 animate-pulse">...ticking up in real time</p>

              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                <div>
                  <div className="font-mono text-xl font-bold text-accent-red">${result.perDay.toFixed(2)}</div>
                  <div className="font-mono text-[10px] text-tx-3">PER DAY</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-accent-orange">${result.perHour.toFixed(2)}</div>
                  <div className="font-mono text-[10px] text-tx-3">PER HOUR</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-accent-gold">${result.perMinute.toFixed(3)}</div>
                  <div className="font-mono text-[10px] text-tx-3">PER MINUTE</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-bg-4 hover:bg-bg-3 text-tx-0 px-6 py-2.5 rounded-lg font-mono text-sm transition-colors border border-border"
                >
                  𝕏 Share on X
                </a>
                <button
                  onClick={handleCopy}
                  className="bg-bg-4 hover:bg-bg-3 text-tx-0 px-6 py-2.5 rounded-lg font-mono text-sm transition-colors border border-border"
                >
                  {copied ? '✓ Copied!' : '🔗 Copy Text'}
                </button>
              </div>
            </div>

            <AdZone size="in-article" className="mb-8" />

            {/* What that could buy */}
            <div className="bg-bg-2 border border-border rounded-xl p-6 sm:p-8 mb-8">
              <h3 className="font-mono text-xs text-tx-3 uppercase tracking-wider mb-6 text-center">
                WHAT YOUR WAR TAX COULD BUY INSTEAD
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                {COMPARISONS.map((c) => {
                  const count = Math.floor(liveCost / c.amount);
                  if (count < 1) return null;
                  return (
                    <div key={c.label} className="text-center p-3 bg-bg-3 rounded-lg">
                      <div className="text-2xl mb-1">{c.icon}</div>
                      <div className="font-mono text-lg font-bold text-tx-0">{count.toLocaleString()}</div>
                      <div className="font-mono text-[10px] text-tx-3 uppercase">{c.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Global Economic Damage */}
        <div className="bg-bg-2 border border-border rounded-xl p-6 sm:p-8 mb-8">
          <h3 className="font-mono text-xs text-tx-3 uppercase tracking-wider mb-6">GLOBAL ECONOMIC DAMAGE</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {GLOBAL_DAMAGE.map((g) => (
              <div key={g.label} className="bg-bg-3 rounded-lg p-4">
                <div className={`font-mono text-xl font-bold mb-1 ${g.color}`}>{g.value}</div>
                <div className="text-xs font-semibold text-tx-1 mb-0.5">{g.label}</div>
                <div className="text-[10px] text-tx-3">{g.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* National context */}
        <div className="bg-bg-2 border border-border rounded-xl p-6 sm:p-8 mb-8">
          <h3 className="font-mono text-xs text-tx-3 uppercase tracking-wider mb-6">NATIONAL WAR COST BREAKDOWN</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="font-mono text-xl font-bold text-accent-red">{formatMoney(totalWarCost)}</div>
              <div className="font-mono text-[10px] text-tx-3">TOTAL COST</div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold text-accent-orange">{formatMoney(WAR_COST_PER_DAY)}</div>
              <div className="font-mono text-[10px] text-tx-3">PER DAY</div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold text-accent-gold">${WAR_COST_PER_SECOND.toLocaleString()}</div>
              <div className="font-mono text-[10px] text-tx-3">PER SECOND</div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold text-tx-0">Day {getWarDay()}</div>
              <div className="font-mono text-[10px] text-tx-3">OF CONFLICT</div>
            </div>
          </div>
        </div>

        <AdZone size="in-article" className="mb-8" />

        {/* Methodology */}
        <div className="bg-bg-2 border border-border rounded-xl p-6 sm:p-8">
          <h3 className="font-mono text-xs text-tx-3 uppercase tracking-wider mb-4">METHODOLOGY</h3>
          <div className="text-tx-2 text-sm space-y-3 leading-relaxed">
            <p>
              This calculator estimates your personal share of the Iran war cost based on your federal income tax contribution.
              It uses 2025 tax brackets to estimate your federal tax liability, then calculates your proportional share of war
              spending based on your contribution to total federal revenue (~$4.9 trillion annually).
            </p>
            <p>
              The estimated war cost of {formatMoney(WAR_COST_PER_DAY)} per day is based on Department of Defense operational cost estimates for
              sustained air campaigns of this scale, combined with naval operations, intelligence, and logistics costs.
              This figure does not include indirect economic costs (GDP impact, oil price shock, etc.) which are significantly higher.
            </p>
            <p>
              All calculations run entirely in your browser. No personal data is collected, stored, or transmitted.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

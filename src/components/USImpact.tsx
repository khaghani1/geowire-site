'use client';
import MetricCard from './MetricCard';
import { BASELINE, CURRENT_METRICS } from '@/lib/constants';
import { usConsumerImpact } from '@/lib/models';

export default function USImpact() {
  const consumer = usConsumerImpact(112);
  const m = CURRENT_METRICS;

  // Cost-per-day ticker calculation
  const warDaysCost = 22 * 1.75; // $38.5B over 22 days
  const costPerMinute = (1.75 * 1000000000) / (24 * 60);

  // SPR depletion calculation
  const sprReleased = 400;
  const sprPrewar = 395.2;
  const sprRemaining = sprPrewar - sprReleased;
  const sprUsagePercent = (sprReleased / sprPrewar) * 100;

  return (
    <div className="space-y-6">
      {/* Key Consumer Metrics */}
      <div className="bg-gradient-to-br from-accent-orange/10 to-accent-orange/5 border border-accent-orange/30 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-accent-orange text-lg">🏠 US Consumer Impact</h3>
          <div className="text-xs text-txt-dim">Real-time household cost tracking</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <MetricCard label="National Gas Avg" value="$3.86" prewar="$2.98" change={29.5} unit="/gal" source="AAA" color="text-accent-orange" />
          <MetricCard label="California Gas" value="$5.48" prewar="$4.10" change={33.7} unit="/gal" source="AAA" color="text-accent-red" />
          <MetricCard label="Diesel" value="$4.82" prewar="$3.42" change={40.9} unit="/gal" source="AAA" color="text-accent-red" />
          <MetricCard label="Monthly Cost Increase" value={`$${consumer.monthlyIncrease}`} unit="/household" source="Model" color="text-accent-orange" />
          <MetricCard label="Annual Cost Increase" value={`$${consumer.annualIncrease}`} unit="/household" source="Model" color="text-accent-red" />
        </div>
      </div>

      {/* Financial Markets Grid */}
      <div className="bg-gradient-to-br from-bg-card to-bg-secondary border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-txt-primary text-lg">📈 US Financial Markets</h3>
          <div className="text-xs text-txt-dim">Pre-war vs Current</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard label="S&P 500" value="6,506" prewar="6,878" change={-5.4} source="Yahoo Finance" color="text-accent-red" size="sm" />
          <MetricCard label="Nasdaq" value="21,648" prewar="22,700" change={-4.6} source="Yahoo Finance" color="text-accent-red" size="sm" />
          <MetricCard label="Dow Jones" value="45,577" prewar="48,978" change={-6.9} source="Yahoo Finance" color="text-accent-red" size="sm" />
          <MetricCard label="10Y Treasury" value="4.58%" prewar="4.28%" source="Yahoo Finance" color="text-accent-orange" size="sm" />
          <MetricCard label="Dollar Index" value="105.4" prewar="98.2" source="Yahoo Finance" color="text-accent-green" size="sm" />
          <MetricCard label="Gold" value="$4,492" prewar="$5,226" change={-14.1} source="Yahoo Finance" color="text-accent-gold" size="sm" />
        </div>
      </div>

      {/* War Cost with Live Ticker */}
      <div className="bg-gradient-to-br from-accent-red/10 to-accent-red/5 border border-accent-red/30 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-red text-lg mb-4">💰 War Cost to US Taxpayers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <MetricCard label="Daily War Cost" value="$1.75B" source="Pentagon est." color="text-accent-red" />
          <MetricCard label="Total (22 days)" value={`$${warDaysCost.toFixed(1)}B`} source="Calculated" color="text-accent-red" />
          <MetricCard label="Pentagon Supplemental" value="$200B" source="Budget Request" color="text-accent-orange" />
          <MetricCard label="SPR Remaining" value="395.2M bbl" prewar="395.2M bbl" source="DOE" color="text-accent-gold" />
        </div>

        {/* Cost per minute ticker */}
        <div className="bg-bg-card border border-border/50 rounded p-3 mb-3">
          <div className="text-xs text-txt-dim mb-1">LIVE COST TICKER</div>
          <div className="font-mono text-sm text-accent-red">
            ${(costPerMinute / 1000000).toFixed(1)}M per minute
          </div>
          <div className="text-xs text-txt-dim mt-1">= $29,650 per second</div>
        </div>
      </div>

      {/* Political Impact Section */}
      <div className="bg-gradient-to-br from-accent-purple/10 to-accent-purple/5 border border-accent-purple/30 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-purple text-lg mb-4">🗳️ Political Impact</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="bg-bg-card border border-border rounded p-3">
            <div className="text-xs text-txt-dim uppercase mb-2">Approval Trajectory</div>
            <div className="text-sm text-txt-secondary mb-2">War: 53% (initial rally) → Projected 38% by May (gas prices + economy)</div>
            <div className="text-xs text-txt-muted">Midterm implications: GOP likely gains Senate in 2026 despite war</div>
          </div>
          <div className="bg-bg-card border border-border rounded p-3">
            <div className="text-xs text-txt-dim uppercase mb-2">Economic Anxiety</div>
            <div className="text-sm text-txt-secondary mb-2">64% of voters rate economy as poor; gas prices driving disapproval</div>
            <div className="text-xs text-txt-muted">Swing state polling shows 40% undecided on war; gas a top issue</div>
          </div>
          <div className="bg-bg-card border border-border rounded p-3">
            <div className="text-xs text-txt-dim uppercase mb-2">Congress Dynamics</div>
            <div className="text-sm text-txt-secondary mb-2">$200B supplemental passes easily (bipartisan); war debate minimal</div>
            <div className="text-xs text-txt-muted">Debt ceiling + supplemental = Q2 political battle looming</div>
          </div>
        </div>
      </div>

      {/* SPR Depletion Tracker */}
      <div className="bg-gradient-to-br from-accent-cyan/10 to-accent-cyan/5 border border-accent-cyan/30 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-accent-cyan text-lg">📊 SPR Depletion Tracker</h3>
          <div className="text-xs text-txt-dim">{sprUsagePercent.toFixed(1)}% depleted</div>
        </div>

        {/* Visual progress bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-txt-secondary">Remaining: {sprRemaining.toFixed(1)}M bbl</span>
            <span className="text-sm text-txt-secondary">Released: {sprReleased}M bbl</span>
          </div>
          <div className="w-full h-6 bg-bg-secondary rounded-full overflow-hidden border border-border">
            <div
              className="h-full bg-gradient-to-r from-accent-cyan to-accent-cyan/50 transition-all duration-500"
              style={{ width: `${100 - sprUsagePercent}%` }}
            />
          </div>
        </div>

        {/* SPR details */}
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-bg-card border border-border rounded p-3">
            <div className="text-xs text-txt-dim uppercase">Runway at Current Release Rate</div>
            <div className="text-accent-cyan font-mono mt-1">~96 days</div>
            <div className="text-xs text-txt-muted mt-1">400M ÷ 4.2M bbl/day average</div>
          </div>
          <div className="bg-bg-card border border-border rounded p-3">
            <div className="text-xs text-txt-dim uppercase">Strategic Threshold</div>
            <div className="text-accent-orange font-mono mt-1">200M bbl</div>
            <div className="text-xs text-txt-muted mt-1">Minimum reserve for true emergencies</div>
          </div>
          <div className="bg-bg-card border border-border rounded p-3">
            <div className="text-xs text-txt-dim uppercase">Refill Cost</div>
            <div className="text-accent-red font-mono mt-1">$43.2B</div>
            <div className="text-xs text-txt-muted mt-1">To restore 400M bbl @ $112/bbl</div>
          </div>
        </div>
      </div>

      {/* Contradiction Analysis */}
      <div className="bg-gradient-to-br from-accent-purple/15 to-accent-purple/5 border border-accent-purple/40 rounded-lg p-5">
        <h3 className="font-heading font-bold text-accent-purple text-lg mb-3">⚡ Key Contradiction</h3>
        <p className="text-txt-secondary text-sm leading-relaxed mb-4">
          The US is simultaneously conducting a full-scale air and naval campaign against Iran while unsanctioning Iranian oil and releasing 400M barrels from the SPR to suppress gas prices. This fundamental contradiction creates policy uncertainty that markets are pricing in as a 15-20% risk premium on energy futures.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-bg-card border border-accent-red/40 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚔️</span>
              <div className="text-xs text-txt-dim uppercase font-semibold">Action 1: Military</div>
            </div>
            <div className="text-sm text-txt-secondary leading-relaxed">
              8,000+ targets struck in Iran; Hormuz blockaded; Iran navy destroyed; $1.75B/day cost; explicit regime change goal stated by Trump administration
            </div>
          </div>
          <div className="bg-bg-card border border-accent-green/40 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💹</span>
              <div className="text-xs text-txt-dim uppercase font-semibold">Action 2: Economic</div>
            </div>
            <div className="text-sm text-txt-secondary leading-relaxed">
              Iranian oil unsanctioned (10M bbl online); released 400M SPR barrels; Russian sanctions lifted; inverse relationship to military goal
            </div>
          </div>
        </div>
      </div>

      {/* Cascade Effects */}
      <div className="bg-gradient-to-br from-bg-card to-bg-secondary border border-border rounded-lg p-5">
        <h3 className="font-heading font-semibold text-txt-primary text-lg mb-4">🌊 Domestic Cascade Effects</h3>
        <div className="space-y-3 text-sm text-txt-secondary">
          <div className="flex items-start gap-3 bg-bg-secondary/50 rounded p-3 border border-border/30">
            <span className="text-accent-red font-bold min-w-fit">1.</span>
            <span>Oil prices rise → Gas prices ↑29.5% ($2.98→$3.86) → Consumer spending power reduced per household</span>
          </div>
          <div className="flex items-start gap-3 bg-bg-secondary/50 rounded p-3 border border-border/30">
            <span className="text-accent-red font-bold min-w-fit">2.</span>
            <span>Diesel ↑40.9% ($3.42→$4.82) → Trucking costs ↑ → Grocery prices projected ↑4-6% within 60 days</span>
          </div>
          <div className="flex items-start gap-3 bg-bg-secondary/50 rounded p-3 border border-border/30">
            <span className="text-accent-red font-bold min-w-fit">3.</span>
            <span>Fertilizer (urea) ↑74.2% ($310→$540) → Spring planting costs surge → Food inflation accelerates 2H 2026</span>
          </div>
          <div className="flex items-start gap-3 bg-bg-secondary/50 rounded p-3 border border-border/30">
            <span className="text-accent-orange font-bold min-w-fit">4.</span>
            <span>10Y Treasury ↑30bp (4.28%→4.58%) → Mortgage rates rise → Housing market cools; ARMs reset higher</span>
          </div>
          <div className="flex items-start gap-3 bg-bg-secondary/50 rounded p-3 border border-border/30">
            <span className="text-accent-red font-bold min-w-fit">5.</span>
            <span>S&P 500 ↓5.4% ($6,878→$6,506) → 401(k) losses → Consumer confidence erodes; retail spending at risk</span>
          </div>
          <div className="flex items-start gap-3 bg-bg-secondary/50 rounded p-3 border border-border/30">
            <span className="text-accent-orange font-bold min-w-fit">6.</span>
            <span>$200B supplemental request → Debt/GDP ratio spikes → Political battle over debt ceiling in May</span>
          </div>
        </div>
      </div>
    </div>
  );
}

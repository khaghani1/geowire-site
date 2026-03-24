'use client';

import { useState, useEffect } from 'react';
import { getWarDay, getTotalWarCost, WAR_COST_PER_SECOND } from '@/lib/constants';
import { SEED_LEADERS, type Leader } from '@/lib/articles';
import AdZone from './AdZone';

const STATUS_BADGES: Record<string, { bg: string; text: string }> = {
  alive: { bg: 'bg-accent-green/15', text: 'text-accent-green' },
  dead: { bg: 'bg-accent-red/15', text: 'text-accent-red' },
  unknown: { bg: 'bg-accent-gold/15', text: 'text-accent-gold' },
  hiding: { bg: 'bg-accent-orange/15', text: 'text-accent-orange' },
};

function WarCostTicker() {
  const [cost, setCost] = useState(getTotalWarCost());

  useEffect(() => {
    const iv = setInterval(() => setCost((c) => c + WAR_COST_PER_SECOND), 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="text-center">
      <div className="font-mono text-2xl font-bold cost-counter">
        ${(cost / 1_000_000_000).toFixed(3)}B
      </div>
      <div className="font-mono text-[10px] text-tx-3 mt-1">TOTAL WAR COST (EST.)</div>
      <div className="font-mono text-[10px] text-accent-red mt-0.5">+${WAR_COST_PER_SECOND.toLocaleString()}/sec</div>
    </div>
  );
}

function LeadershipTracker() {
  return (
    <div className="space-y-2">
      {SEED_LEADERS.map((leader) => {
        const badge = STATUS_BADGES[leader.status];
        return (
          <div key={leader.name} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
            <div className="min-w-0">
              <div className="text-sm text-tx-1 truncate">{leader.name}</div>
              <div className="text-[10px] font-mono text-tx-3">{leader.role}</div>
            </div>
            <span className={`${badge.bg} ${badge.text} font-mono text-[9px] px-2 py-0.5 rounded uppercase font-semibold flex-shrink-0 ml-2`}>
              {leader.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      {submitted ? (
        <div className="text-accent-green font-mono text-sm text-center py-4">
          Subscribed. Watch your inbox.
        </div>
      ) : (
        <>
          <p className="text-tx-2 text-sm mb-3">Daily intelligence brief. No spam. Unsubscribe anytime.</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-bg-1 border border-border rounded px-3 py-2 text-sm text-tx-0 placeholder:text-tx-3 focus:border-accent-gold outline-none"
            />
            <button
              onClick={() => email && setSubmitted(true)}
              className="bg-accent-gold text-bg-0 px-4 py-2 rounded text-sm font-semibold hover:bg-accent-gold/90"
            >
              Subscribe
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Sidebar() {
  const warDay = getWarDay();

  return (
    <aside className="space-y-6">
      {/* War Dashboard Mini */}
      <div className="bg-bg-2 border border-accent-red/20 rounded-lg p-4">
        <h3 className="font-mono text-[11px] tracking-widest text-accent-red uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-red live-dot" />
          IRAN WAR — DAY {warDay}
        </h3>
        <WarCostTicker />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-tx-0">8,000+</div>
            <div className="font-mono text-[9px] text-tx-3">TARGETS STRUCK</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-tx-0">13</div>
            <div className="font-mono text-[9px] text-tx-3">US KIA</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-accent-red">3,220</div>
            <div className="font-mono text-[9px] text-tx-3">IRAN DEAD (HRANA)</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-accent-orange">0.6M</div>
            <div className="font-mono text-[9px] text-tx-3">BBL/D HORMUZ</div>
          </div>
        </div>
      </div>

      <AdZone size="sidebar" />

      {/* Leadership Tracker */}
      <div className="bg-bg-2 border border-border rounded-lg p-4">
        <h3 className="font-mono text-[11px] tracking-widest text-tx-2 uppercase mb-3">
          LEADERSHIP TRACKER
        </h3>
        <LeadershipTracker />
      </div>

      <AdZone size="sidebar" />

      {/* Newsletter */}
      <div className="bg-bg-2 border border-accent-gold/20 rounded-lg p-4">
        <h3 className="font-mono text-[11px] tracking-widest text-accent-gold uppercase mb-3">
          THE DAILY WIRE
        </h3>
        <NewsletterSignup />
      </div>

      {/* Key Dates */}
      <div className="bg-bg-2 border border-border rounded-lg p-4">
        <h3 className="font-mono text-[11px] tracking-widest text-tx-2 uppercase mb-3">
          KEY DATES
        </h3>
        <div className="space-y-2.5">
          {[
            { date: 'Feb 28', event: 'Operation Epic Fury begins', type: 'military' },
            { date: 'Mar 1', event: 'Khamenei killed in strike', type: 'critical' },
            { date: 'Mar 3', event: 'Hormuz closed to shipping', type: 'energy' },
            { date: 'Mar 5', event: 'IEA emergency SPR release', type: 'economic' },
            { date: 'Mar 17', event: 'Larijani killed in strike', type: 'critical' },
            { date: 'Mar 21', event: 'Brent crude hits $112', type: 'energy' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <span className="font-mono text-[10px] text-tx-3 w-12 flex-shrink-0 pt-0.5">{item.date}</span>
              <div className="flex-1">
                <span className="text-tx-1">{item.event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdZone size="sidebar" />

      {/* Social Links */}
      <div className="bg-bg-2 border border-border rounded-lg p-4">
        <h3 className="font-mono text-[11px] tracking-widest text-tx-2 uppercase mb-3">
          CONNECT
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'X / Twitter', href: 'https://x.com/Geowire_org' },
            { label: 'Telegram', href: '#' },
            { label: 'LinkedIn', href: '#' },
            { label: 'RSS', href: '#' },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="text-tx-2 hover:text-accent-gold font-mono text-xs border border-border rounded px-3 py-1.5 hover:border-accent-gold/30 transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

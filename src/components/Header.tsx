'use client';
import { useState, useEffect } from 'react';

export default function Header() {
  const [warDay, setWarDay] = useState(22);
  const [time, setTime] = useState('');
  const [activeFronts] = useState(3);
  const [sprRemaining] = useState(48);

  useEffect(() => {
    const warStart = new Date('2026-02-28');
    const update = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - warStart.getTime()) / (1000 * 60 * 60 * 24));
      setWarDay(diff + 1);
      setTime(
        now.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-bg-primary via-bg-primary to-bg-secondary border-b border-border backdrop-blur-md">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-accent-red via-accent-red/30 to-transparent" />

      <div className="max-w-[1800px] mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left section: Branding and live status */}
        <div className="flex items-center gap-6">
          {/* Live indicator with pulse */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-3 w-3">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-red shadow-lg shadow-accent-red/50" />
            </div>
            <span className="text-accent-red font-mono text-xs font-bold tracking-widest uppercase">
              Live Conflict
            </span>
          </div>

          {/* Main branding */}
          <div className="hidden sm:flex flex-col gap-0.5">
            <h1 className="font-heading text-xl font-black text-txt-primary tracking-tight">
              GEOWIRE
            </h1>
            <p className="text-txt-secondary font-mono text-xs tracking-wide">
              Global Intelligence Platform
            </p>
          </div>
        </div>

        {/* Center section: War metrics */}
        <div className="hidden lg:flex items-center gap-6 px-6 py-3 bg-bg-secondary/40 border border-border rounded-lg">
          {/* War day counter */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-txt-dim font-mono text-[10px] tracking-widest uppercase">War Day</span>
            <span className="font-mono font-black text-accent-red text-2xl leading-none tracking-tight">
              {warDay}
            </span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border/50" />

          {/* Active fronts */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-txt-dim font-mono text-[10px] tracking-widest uppercase">Active Fronts</span>
            <span className="font-mono font-black text-accent-blue text-2xl leading-none tracking-tight">
              {activeFronts}
            </span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border/50" />

          {/* SPR remaining */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-txt-dim font-mono text-[10px] tracking-widest uppercase">SPR Hours</span>
            <span className="font-mono font-black text-accent-gold text-2xl leading-none tracking-tight">
              {sprRemaining}
            </span>
          </div>
        </div>

        {/* Right section: Threat level and time */}
        <div className="flex items-center gap-4">
          {/* Threat level indicator */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 bg-accent-red/15 border border-accent-red/50 rounded px-3 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-red" />
              </span>
              <span className="text-accent-red font-mono font-bold text-xs tracking-widest uppercase">
                Critical
              </span>
            </div>
            <span className="text-txt-muted font-mono text-[10px] hidden sm:block">THREAT LEVEL</span>
          </div>

          {/* Current time */}
          <div className="text-right hidden md:block">
            <div className="text-txt-primary font-mono font-semibold text-sm leading-none">{time}</div>
            <div className="text-txt-dim font-mono text-[10px] tracking-wide mt-1">UTC+0</div>
          </div>
        </div>
      </div>

      {/* Bottom accent gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
    </header>
  );
}

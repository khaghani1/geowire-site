'use client';

import { useState, useEffect } from 'react';
import { getWarDay, LANGUAGES } from '@/lib/constants';

export default function Header() {
  const [time, setTime] = useState('');
  const [warDay, setWarDay] = useState(0);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
      setWarDay(getWarDay());
    }
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <header className="bg-bg-1 border-b border-border sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="gw-gradient w-9 h-9 rounded-md flex items-center justify-center">
            <span className="text-bg-0 font-display font-bold text-lg leading-none">GW</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl text-tx-0 leading-tight tracking-tight">GeoWire</span>
            <span className="text-[10px] font-mono text-tx-3 tracking-widest uppercase">Global Intelligence</span>
          </div>
        </div>

        {/* Center: Live indicator */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-accent-red/10 border border-accent-red/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-red live-dot" />
            <span className="font-mono text-xs text-accent-red font-semibold tracking-wider">
              LIVE — IRAN WAR DAY ${warDay}
            </span>
          </div>
        </div>

        {/* Right: Language + Time */}
        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-tx-2 hover:text-tx-0 font-mono text-xs border border-border rounded px-2 py-1"
            >
              EN <span className="text-tx-3">▾</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-bg-2 border border-border rounded shadow-xl z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className="block w-full text-left px-4 py-2 text-sm text-tx-1 hover:bg-bg-3 hover:text-tx-0 font-mono"
                    onClick={() => setLangOpen(false)}
                  >
                    {lang.label} <span className="text-tx-3 ml-2">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time */}
          <div className="hidden sm:block font-mono text-xs text-tx-2">
            {time}
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'energy', label: 'Energy', icon: '⛽', critical: true },
  { id: 'countries', label: 'Countries', icon: '🌍' },
  { id: 'scenarios', label: 'Scenarios', icon: '🔮' },
  { id: 'trade', label: 'Trade', icon: '🚢' },
  { id: 'us', label: 'US Impact', icon: '🇺🇸' },
  { id: 'humanitarian', label: 'Humanitarian', icon: '🏥', critical: true },
  { id: 'geopolitical', label: 'Geopolitical', icon: '♟️' },
  { id: 'analysis', label: 'Analysis', icon: '📝' },
];

interface TabNavProps {
  active: string;
  onChange: (id: string) => void;
}

export default function TabNav({ active, onChange }: TabNavProps) {
  return (
    <nav className="sticky top-[88px] z-40 flex overflow-x-auto scrollbar-hide border-b border-border bg-gradient-to-r from-bg-secondary/80 via-bg-secondary/60 to-bg-primary/80 backdrop-blur-md">
      <div className="flex gap-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-heading whitespace-nowrap transition-all duration-200 group ${
              active === tab.id
                ? 'text-accent-blue'
                : 'text-txt-dim hover:text-txt-secondary'
            }`}
          >
            {/* Background highlight on hover/active */}
            <div
              className={`absolute inset-0 rounded-md transition-all duration-200 ${
                active === tab.id
                  ? 'bg-accent-blue/10'
                  : 'bg-transparent group-hover:bg-accent-blue/5'
              }`}
            />

            {/* Icon with glow for critical tabs */}
            <span className={`relative text-base ${tab.critical && active !== tab.id ? 'group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : ''}`}>
              {tab.icon}
            </span>

            {/* Label */}
            <span className="relative hidden sm:inline">{tab.label}</span>

            {/* Notification dot for critical tabs */}
            {tab.critical && (
              <div className="relative">
                <span
                  className={`inline-flex h-2 w-2 rounded-full transition-all duration-200 ${
                    active === tab.id
                      ? 'bg-accent-blue'
                      : 'bg-accent-red animate-pulse'
                  }`}
                />
              </div>
            )}

            {/* Bottom glow for active tab */}
            {active === tab.id && (
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-accent-blue to-transparent shadow-lg shadow-accent-blue/50" />
            )}
          </button>
        ))}
      </div>

      {/* Right accent fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-secondary to-transparent pointer-events-none" />
    </nav>
  );
}

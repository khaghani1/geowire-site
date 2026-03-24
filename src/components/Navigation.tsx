'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-bg-2/80 backdrop-blur-md border-b border-border sticky top-[65px] z-40">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2 -mx-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-bg-4 text-tx-0'
                    : 'text-tx-2 hover:text-tx-0 hover:bg-bg-3'
                }`}
              >
                {item.icon && <span className="text-sm">{item.icon}</span>}
                {item.label}
                {item.live && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red live-dot ml-0.5" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

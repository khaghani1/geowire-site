'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import TabNav from '@/components/TabNav';
import LiveDashboard from '@/components/LiveDashboard';
import Energy from '@/components/Energy';
import Countries from '@/components/Countries';
import Scenarios from '@/components/Scenarios';
import Trade from '@/components/Trade';
import USImpact from '@/components/USImpact';
import Humanitarian from '@/components/Humanitarian';
import Geopolitical from '@/components/Geopolitical';
import Analysis from '@/components/Analysis';

const TABS: Record<string, React.ComponentType> = {
  dashboard: LiveDashboard,
  energy: Energy,
  countries: Countries,
  scenarios: Scenarios,
  trade: Trade,
  us: USImpact,
  humanitarian: Humanitarian,
  geopolitical: Geopolitical,
  analysis: Analysis,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const TabComponent = TABS[activeTab] || LiveDashboard;

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <div className="pt-[88px]">
        <TabNav active={activeTab} onChange={setActiveTab} />
        <main className="max-w-[1800px] mx-auto p-4 sm:p-6">
          <TabComponent />
        </main>
      </div>
      <footer className="border-t border-border py-4 text-center text-xs text-txt-muted">
        GeoWire v1.0 — Global Intelligence Platform by GeoWire Media — Not affiliated with any government
      </footer>
    </div>
  );
}

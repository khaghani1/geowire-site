// War start date
export const WAR_START = new Date('2026-02-28T00:00:00Z');

// Calculate war day
export function getWarDay(): number {
  const now = new Date();
  const diff = now.getTime() - WAR_START.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

// War cost: estimated $1.75B/day = ~$20,255/second
export const WAR_COST_PER_SECOND = 20255;
export const WAR_COST_PER_DAY = 1_750_000_000;

export function getTotalWarCost(): number {
  const now = new Date();
  const seconds = (now.getTime() - WAR_START.getTime()) / 1000;
  return Math.floor(seconds * WAR_COST_PER_SECOND);
}

// FRED API
export const FRED_API_KEY = 'f8f377edb471980ac3d88f219145c071';
export const FRED_BASE = 'https://api.stlouisfed.org/fred/series/observations';

export const FRED_SERIES: Record<string, { id: string; label: string; unit: string; preWar?: number }> = {
  wti: { id: 'DCOILWTICO', label: 'WTI CRUDE', unit: '$/bbl', preWar: 64 },
  treasury10y: { id: 'DGS10', label: '10Y TREASURY', unit: '%', preWar: 4.25 },
  dxy: { id: 'DTWEXBGS', label: 'DOLLAR INDEX', unit: '', preWar: 104 },
  henryHub: { id: 'DHHNGSP', label: 'NAT GAS', unit: '$/MMBtu', preWar: 2.80 },
  gold: { id: 'GOLDAMGBD228NLBM', label: 'GOLD', unit: '$/oz', preWar: 3200 },
};

// CoinGecko
export const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

// Threat levels
export type ThreatLevel = 'critical' | 'elevated' | 'moderate' | 'stable';

export const THREAT_COLORS: Record<ThreatLevel, string> = {
  critical: '#d63031',
  elevated: '#e17055',
  moderate: '#d4a843',
  stable: '#27ae60',
};

// Navigation items
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Iran War', href: '/category/iran-war', live: true },
  { label: 'Globe', href: '/globe', icon: '🌐' },
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Predict', href: '/predict', icon: '♟️' },
  { label: 'War Cost', href: '/cost', icon: '💸' },
  { label: 'Energy', href: '/category/energy' },
  { label: 'US-China', href: '/category/us-china' },
  { label: 'Russia-Ukraine', href: '/category/russia-ukraine' },
  { label: 'Markets', href: '/category/markets' },
  { label: 'Data', href: '/dashboard' },
];

// Categories
export const CATEGORIES = [
  'iran-war', 'energy', 'us-china', 'russia-ukraine',
  'markets', 'sanctions', 'mena', 'asia-pacific', 'africa', 'americas',
];

// Languages
export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr' },
  { code: 'fa', label: 'فا', name: 'فارسی', dir: 'rtl' },
  { code: 'ar', label: 'عر', name: 'العربية', dir: 'rtl' },
  { code: 'tr', label: 'TR', name: 'Türkçe', dir: 'ltr' },
  { code: 'es', label: 'ES', name: 'Español', dir: 'ltr' },
  { code: 'zh', label: '中', name: '中文', dir: 'ltr' },
];

// Tax brackets (2025 single filer, approximate for calculator)
export const TAX_BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

export const TAX_BRACKETS_MARRIED = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

// Total federal revenue (FY2025 est: ~$4.9T)
export const FEDERAL_REVENUE = 4_900_000_000_000;

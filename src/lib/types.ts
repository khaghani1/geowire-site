export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: Category;
  tags: Tag[];
  author: string;
  language_code: Language;
  original_article_id: string | null;
  read_time_minutes: number;
  threat_level?: ThreatLevel;
  region: Region;
  published_at: string;
  updated_at: string;
  is_hero: boolean;
  is_published: boolean;
}

export type Category =
  | 'iran-war'
  | 'energy'
  | 'us-china'
  | 'russia-ukraine'
  | 'markets'
  | 'sanctions'
  | 'elections'
  | 'mena'
  | 'asia-pacific'
  | 'africa'
  | 'americas';

export type Tag =
  | 'breaking'
  | 'analysis'
  | 'deep-dive'
  | 'intel'
  | 'energy'
  | 'markets';

export type ThreatLevel = 'critical' | 'elevated' | 'moderate' | 'stable';

export type Language = 'en' | 'fa' | 'ar' | 'tr' | 'es' | 'zh';

export type Region =
  | 'middle-east'
  | 'europe'
  | 'asia-pacific'
  | 'americas'
  | 'africa'
  | 'global';

export interface MarketDataPoint {
  id: string;
  indicator: string;
  label: string;
  current_value: number;
  pre_war_value: number;
  change_pct: number;
  unit: string;
  source: string;
  updated_at: string;
}

export interface ThreatCard {
  region: string;
  regionLabel: string;
  title: string;
  level: ThreatLevel;
  dayCount?: number;
  timeAgo: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  language_preference: Language;
  subscribed_at: string;
}

export const CATEGORIES: Record<Category, { label: string; color: string }> = {
  'iran-war': { label: 'Iran War', color: 'text-gw-red' },
  'energy': { label: 'Energy & Commodities', color: 'text-gw-orange' },
  'us-china': { label: 'US-China', color: 'text-gw-blue' },
  'russia-ukraine': { label: 'Russia-Ukraine', color: 'text-gw-gold' },
  'markets': { label: 'Markets', color: 'text-gw-green' },
  'sanctions': { label: 'Sanctions & Trade', color: 'text-purple-400' },
  'elections': { label: 'Elections', color: 'text-cyan-400' },
  'mena': { label: 'MENA', color: 'text-gw-orange' },
  'asia-pacific': { label: 'Asia-Pacific', color: 'text-gw-blue' },
  'africa': { label: 'Africa', color: 'text-emerald-400' },
  'americas': { label: 'Americas', color: 'text-sky-400' },
};

export const LANGUAGES: Record<Language, { label: string; nativeLabel: string; dir: 'ltr' | 'rtl'; font: string }> = {
  en: { label: 'English', nativeLabel: 'EN', dir: 'ltr', font: 'font-sans' },
  fa: { label: 'Farsi', nativeLabel: 'فارسی', dir: 'rtl', font: 'font-farsi' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl', font: 'font-arabic' },
  tr: { label: 'Turkish', nativeLabel: 'TR', dir: 'ltr', font: 'font-sans' },
  es: { label: 'Spanish', nativeLabel: 'ES', dir: 'ltr', font: 'font-sans' },
  zh: { label: 'Chinese', nativeLabel: '中文', dir: 'ltr', font: 'font-chinese' },
};
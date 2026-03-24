'use client';

import { useState, useEffect, useCallback } from 'react';

interface LatestDataPoint {
  value: number;
  prev_value: number | null;
  baseline: number | null;
  label: string | null;
  unit: string | null;
  category: string | null;
  source: string | null;
  updated_at: string;
  change_pct: number | null;
}

interface LiveDataResponse {
  data: Record<string, LatestDataPoint>;
  count: number;
  timestamp: string;
}

interface MetricsResponse {
  data: Record<string, { value: string; label: string; category: string; source: string; updated_at: string }>;
  count: number;
  timestamp: string;
}

interface NewsItem {
  id: number;
  title: string;
  url: string;
  source_name: string;
  category: string;
  published_at: string;
}

// Fetch live market data (prices with baselines)
export function useLiveData(refreshInterval: number = 60000) {
  const [data, setData] = useState<Record<string, LatestDataPoint>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/live/latest');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: LiveDataResponse = await res.json();
      setData(json.data);
      setLastUpdate(json.timestamp);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { data, loading, error, lastUpdate, refresh: fetchData };
}

// Fetch text metrics (war stats, humanitarian data, etc.)
export function useMetrics(category?: string, refreshInterval: number = 60000) {
  const [data, setData] = useState<Record<string, { value: string; label: string; category: string; source: string; updated_at: string }>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const url = category ? `/api/live/metrics?category=${category}` : '/api/live/metrics';
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: MetricsResponse = await res.json();
      setData(json.data);
    } catch (err) {
      console.error('useMetrics error:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { data, loading, refresh: fetchData };
}

// Fetch news headlines
export function useNews(limit: number = 20, refreshInterval: number = 120000) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/live/news?limit=${limit}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setNews(json.data);
    } catch (err) {
      console.error('useNews error:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { news, loading, refresh: fetchData };
}

// Helper: format number with commas
export function fmt(n: number | null | undefined, decimals: number = 2): string {
  if (n === null || n === undefined) return '--';
  if (Math.abs(n) >= 1000) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals });
  }
  return n.toFixed(decimals);
}

// Helper: format currency
export function fmtCurrency(n: number | null | undefined, prefix: string = '$'): string {
  if (n === null || n === undefined) return '--';
  if (Math.abs(n) >= 1000) {
    return prefix + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
  return prefix + n.toFixed(2);
}

// Helper: format percentage change
export function fmtChange(pct: number | null | undefined): string {
  if (pct === null || pct === undefined) return '--';
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

// Helper: get color for change percentage
export function changeColor(pct: number | null | undefined, invertGreen?: boolean): string {
  if (pct === null || pct === undefined) return 'text-txt-secondary';
  if (invertGreen) {
    // For things where down is bad (stocks, gold during crash)
    return pct >= 0 ? 'text-accent-green' : 'text-accent-red';
  }
  // Default: up is red (oil, gas), down is green
  return pct >= 0 ? 'text-accent-red' : 'text-accent-green';
}

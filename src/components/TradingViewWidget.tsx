'use client';

import { useEffect, useRef } from 'react';

// Full interactive TradingView chart
export function TradingViewChart({
  symbol = 'TVC:UKOIL',
  interval = 'D',
  height = 400,
  width = '100%',
}: {
  symbol?: string;
  interval?: string;
  height?: number;
  width?: string | number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string>(`tv_chart_${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).TradingView !== 'undefined') {
        new (window as any).TradingView.widget({
          autosize: false,
          symbol,
          interval,
          timezone: 'America/Chicago',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#0c1018',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: widgetRef.current,
          width: typeof width === 'number' ? width : undefined,
          height,
          backgroundColor: '#0f1520',
          gridColor: '#1a2535',
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      try { document.head.removeChild(script); } catch {}
    };
  }, [symbol, interval, height, width]);

  return (
    <div className="tradingview-widget-container rounded-lg overflow-hidden border border-border">
      <div id={widgetRef.current} ref={containerRef} style={{ height, width }} />
    </div>
  );
}

// Mini chart widget for metric cards
export function TradingViewMini({
  symbol = 'TVC:UKOIL',
  width = 200,
  height = 60,
}: {
  symbol?: string;
  width?: number;
  height?: number;
}) {
  const containerId = useRef(`tv_mini_${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const container = document.getElementById(containerId.current);
    if (!container) return;

    container.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    container.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      width,
      height,
      locale: 'en',
      dateRange: '1M',
      colorTheme: 'dark',
      isTransparent: true,
      autosize: false,
      largeChartUrl: '',
      noTimeScale: true,
      chartOnly: true,
    });
    container.appendChild(script);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [symbol, width, height]);

  return <div id={containerId.current} className="tradingview-widget-container" />;
}

// Ticker Tape (scrolling price bar)
export function TradingViewTicker() {
  const containerId = useRef(`tv_ticker_${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const container = document.getElementById(containerId.current);
    if (!container) return;

    container.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    container.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { description: 'Brent', proName: 'TVC:UKOIL' },
        { description: 'WTI', proName: 'TVC:USOIL' },
        { description: 'Gold', proName: 'COMEX:GC1!' },
        { description: 'S&P 500', proName: 'SP:SPX' },
        { description: 'Nasdaq', proName: 'NASDAQ:NDX' },
        { description: 'VIX', proName: 'CBOE:VIX' },
        { description: 'Nat Gas', proName: 'NYMEX:NG1!' },
        { description: 'Bitcoin', proName: 'BITSTAMP:BTCUSD' },
        { description: 'Dollar', proName: 'TVC:DXY' },
        { description: '10Y Yield', proName: 'TVC:US10Y' },
        { description: 'Wheat', proName: 'CBOT:ZW1!' },
        { description: 'Silver', proName: 'COMEX:SI1!' },
      ],
      showSymbolLogo: false,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'dark',
      locale: 'en',
    });
    container.appendChild(script);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div id={containerId.current} className="tradingview-widget-container w-full" />
  );
}

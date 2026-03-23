import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gw-bg-0': '#08080a',
        'gw-bg-1': '#0e0e12',
        'gw-bg-2': '#141418',
        'gw-bg-3': '#1a1a20',
        'gw-bg-4': '#222229',
        'gw-tx-0': '#f0eeeb',
        'gw-tx-1': '#c8c6c2',
        'gw-tx-2': '#8a8892',
        'gw-tx-3': '#55533e',
        'gw-red': '#d63031',
        'gw-gold': '#d4a843',
        'gw-green': '#27ae60',
        'gw-blue': '#2e86de',
        'gw-orange': '#e17055',
        'gw-border': '#1e1e26',
      },
      fontFamily: {
        display: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        arabic: ['Noto Sans Arabic', 'Vazirmatn', 'sans-serif'],
        farsi: ['Vazirmatn', 'Noto Sans Arabic', 'sans-serif'],
        chinese: ['Noto Sans SC', 'sans-serif'],
      },
      animation: {
        'ticker-scroll': 'ticker-scroll 60s linear infinite',
        'pulse-live': 'pulse-live 2s ease-in-out infinite',
        'count-up': 'count-up 0.3s ease-out',
      },
      keyframes: {
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-live': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}
export default config
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#08080a',
          1: '#0e0e12',
          2: '#141418',
          3: '#1a1a20',
          4: '#222229',
        },
        tx: {
          0: '#f0eeeb',
          1: '#c8c6c2',
          2: '#8a8892',
          3: '#55533e',
        },
        accent: {
          red: '#d63031',
          gold: '#d4a843',
          green: '#27ae60',
          blue: '#2e86de',
          orange: '#e17055',
          cyan: '#00cec9',
        },
        border: {
          DEFAULT: '#1e1e26',
          hover: '#2a2a34',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        arabic: ['"Noto Sans Arabic"', '"Vazirmatn"', 'sans-serif'],
        chinese: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'ticker-scroll': 'ticker 60s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'count-up': 'countup 1s ease-out',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
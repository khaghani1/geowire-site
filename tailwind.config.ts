import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#06090f',
          secondary: '#0c1018',
          card: '#141c2f',
          'card-hover': '#1a2642',
        },
        border: {
          DEFAULT: '#2a3f5f',
          hover: '#3d5280',
        },
        txt: {
          primary: '#f1f5f9',
          secondary: '#b8c7db',
          dim: '#8b9cb7',
          muted: '#6b7c99',
        },
        accent: {
          red: '#ef4444',
          gold: '#fbbf24',
          blue: '#3b82f6',
          green: '#22c55e',
          purple: '#a855f7',
          cyan: '#06b6d4',
          orange: '#f97316',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        heading: ['Outfit', 'sans-serif'],
        body: ['system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
        'scanline': 'scanline 10s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow': 'glow 2.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(239, 68, 68, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)' },
        },
        'pulse-border': {
          '0%, 100%': {
            borderColor: 'rgba(239, 68, 68, 0.3)',
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.2)',
          },
          '50%': {
            borderColor: 'rgba(239, 68, 68, 0.8)',
            boxShadow: '0 0 16px rgba(239, 68, 68, 0.5)',
          },
        },
        'scanline': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100px' },
        },
        'shimmer': {
          '0%, 100%': { textShadow: '0 0 10px rgba(59, 130, 246, 0.3)' },
          '50%': {
            textShadow:
              '0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.3)',
          },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(59, 130, 246, 0.2)' },
          '50%': { boxShadow: '0 0 16px rgba(59, 130, 246, 0.4)' },
        },
      },
      transitionDuration: {
        200: '200ms',
      },
    },
  },
  plugins: [],
};
export default config;

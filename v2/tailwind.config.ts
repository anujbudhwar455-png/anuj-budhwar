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
        ink: {
          950: '#05070f',
          900: '#0a0e1a',
          800: '#10182b',
          700: '#182238',
        },
        glow: {
          cyan: '#22d3ee',
          violet: '#a78bfa',
          fuchsia: '#e879f9',
          teal: '#2dd4bf',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.45)',
        glow: '0 0 40px rgba(34,211,238,0.25)',
        'glow-violet': '0 0 40px rgba(167,139,250,0.25)',
      },
      backgroundImage: {
        'radial-fade':
          'radial-gradient(ellipse at top, rgba(34,211,238,0.12), transparent 55%), radial-gradient(ellipse at bottom right, rgba(167,139,250,0.14), transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

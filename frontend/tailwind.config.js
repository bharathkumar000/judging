/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vice: {
          pink: '#ff2a85',
          rose: '#f43f5e',
          magenta: '#d946ef',
          purple: '#8b5cf6',
          violet: '#7c3aed',
          cyan: '#06b6d4',
          sky: '#0ea5e9',
          amber: '#f59e0b',
          gold: '#fbbf24',
          emerald: '#10b981',
          bg: '#090d16',
          card: '#101726',
          cardHover: '#162035',
          surface: '#182236',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 42, 133, 0.4)',
        },
        brand: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f472b6',
          400: '#ff2a85',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        slate: {
          850: '#141c2c',
          900: '#0d1320',
          950: '#080c14',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
        heading: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'vice-pink': '0 0 20px rgba(255, 42, 133, 0.35)',
        'vice-purple': '0 0 20px rgba(139, 92, 246, 0.35)',
        'vice-cyan': '0 0 20px rgba(6, 182, 212, 0.35)',
        'card-glow': '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
};

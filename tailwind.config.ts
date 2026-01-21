import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './tests/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          sky: '#0057FF',
          night: '#021024'
        },
        neutral: {
          50: '#F7F8FC',
          100: '#ECEFF6',
          200: '#D7DCE8',
          300: '#B5BDD2',
          400: '#8F99B4',
          500: '#6A7495',
          600: '#4A5271',
          700: '#353C57',
          800: '#23273B',
          900: '#131626'
        }
      },
      fontFamily: {
        brand: ['Inter', 'var(--font-inter)', 'sans-serif']
      },
      boxShadow: {
        card: '0 10px 40px rgba(0, 44, 92, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;

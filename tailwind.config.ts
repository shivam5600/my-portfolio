import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: '#0C0C0C',
        haze: '#D7E2EA',
        steel: '#646973',
        mist: '#BBCCD7',
      },
      fontFamily: {
        kanit: ['Kanit', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.18em',
      },
    },
  },
  plugins: [],
} satisfies Config

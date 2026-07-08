/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#07070F',
          900: '#0B0B18',
          800: '#12122A',
          700: '#1A1A38',
        },
        accent: {
          indigo: '#6366F1',
          blue: '#2563EB',
          violet: '#8B5CF6',
          cyan: '#22D3EE',
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(99, 102, 241, 0.45)',
        'glow-lg': '0 0 80px -12px rgba(99, 102, 241, 0.55)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -50px) scale(1.12)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.92)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        blob: 'blob 18s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};

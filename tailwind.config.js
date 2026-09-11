/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'deep-green': '#1B5E20',
        'fresh-green': '#4CAF50',
        'cta-orange': '#FFA726',
        'sale-red': '#E53935',
        cream: '#FAF7F2',
        'card-white': '#FFFFFF',
        'dark-text': '#1F2937',
        'muted-text': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(27, 94, 32, 0.08)',
        card: '0 2px 12px -2px rgba(31, 41, 55, 0.08)',
        'card-hover': '0 12px 32px -4px rgba(27, 94, 32, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'toast-in': 'toastIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        toastIn: { '0%': { opacity: 0, transform: 'translateY(-12px) translateX(-50%)' }, '100%': { opacity: 1, transform: 'translateY(0) translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}

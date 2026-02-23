/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a0a0a', // Onyx black
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#0a0a0a'
        },
        gold: {
          DEFAULT: '#ffd700',
          50: '#fffdf0',
          100: '#fffaeb',
          200: '#fff3c6',
          300: '#ffe98a',
          400: '#ffd700',
          500: '#f0c814',
          600: '#d19e07',
          700: '#a6750a',
          800: '#895e11',
          900: '#744d15',
          950: '#442908'
        },
        background: '#0a0a0a',
        surface: '#1a1a1a',
        'surface-hover': '#2a2a2a',
        text: {
          primary: '#ffffff',
          secondary: '#a3a3a3',
          muted: '#6d6d6d'
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-gold': {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.7)' 
          },
          '50%': { 
            boxShadow: '0 0 0 10px rgba(255, 215, 0, 0)' 
          },
        },
        bounceSubtle: {
          '0%, 100%': { 
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' 
          },
          '50%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' 
          },
        }
      }
    },
  },
  plugins: [],
}
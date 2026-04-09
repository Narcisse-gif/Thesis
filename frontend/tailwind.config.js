/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2e7f33',
          dark: '#1f5c24',
          light: '#4caf52',
          50:  '#f0fdf1',
          100: '#dcfce0',
          200: '#bbf7c1',
          500: '#2e7f33',
          600: '#25682a',
          700: '#1f5c24',
        },
        background: {
          light: '#f6f6f8',
          dark: '#121520',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'lg': '1rem',
        'xl': '1.5rem',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

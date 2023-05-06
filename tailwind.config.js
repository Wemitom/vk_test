/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        secondary: '#fff',
        accent: '#4d8b31',
      },
      fontFamily: {
        sans: ['Oswald', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

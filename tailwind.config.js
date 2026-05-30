/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '390px', // iPhone 14 width — for xs:block on logo text
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50:  '#EFF4FB',
          100: '#D9E5F5',
          200: '#B3CCEB',
          300: '#7AA5D9',
          400: '#4A7DC1',
          500: '#2A5DA8',
          600: '#1E4A8E',
          700: '#173A70',
          800: '#0F2D5E',  // primary brand navy
          900: '#0A1F42',
        },
      },
    },
  },
  plugins: [],
};

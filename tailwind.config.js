/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ubuntu: {
          black: '#333333',
          dark: '#2c001e',
          grey: '#aea79f',
          darkPurple: '#5e2750',
          purple: '#77216f',
          orange: '#dd4814',
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#d6e0fd',
          300: '#b3c7fc',
          400: '#8aa6f9',
          500: '#6282f5',
          600: '#4a64ea',
          700: '#3a4fd8',
          800: '#3342b0',
          900: '#2f3c8c',
          950: '#1e244d',
        },
        coffee: {
          50: '#f9f6f3',
          100: '#f0e9e2',
          200: '#e2d3c3',
          300: '#d0b69d',
          400: '#ba9574',
          500: '#a97c57',
          600: '#9c6c4a',
          700: '#815740',
          800: '#6b4938',
          900: '#5a3d31',
          950: '#301f19',
        },
      },
    },
  },
  plugins: [],
} 
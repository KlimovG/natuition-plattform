/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      boxShadow: {
        'primary-btn': '0 2px 20px rgba(59, 171, 54, 0.54)'
      },
      colors: {
        primary: {
          main: '#3BAB36',
          dark: '#256320',
          light: '#EBFFD9',
        },
        black: '#060D00',
        white: '#FBFBFB',
        grey: {
          light: '#9E9E9E',
          main: '#525252',
          dark: '#F2F2F2'
        },
      },
    },
  },
  plugins: [],
}

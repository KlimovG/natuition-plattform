/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      maxWidth: {
        'layout-lg': '1176px',
        'wrapper': '73.5rem'
      },
      maxHeight:{
        'wrapper': '51.5rem'
      },
      height: {
        'wrapper': '51.5rem'
      },
      boxShadow: {
        'primary-btn': '0 2px 20px rgba(59, 171, 54, 0.54)',
        'secondary-btn': '0 2px 20px rgba(59, 171, 54, 0.54)'
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
          light: '#F2F2F2',
          main: '#525252',
          dark: '#9E9E9E'
        },
      },
    },
  },
  plugins: [],
}

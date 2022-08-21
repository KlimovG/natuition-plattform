/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#81BF45',
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateRows: {
        core: "1fr 500px",
      },
      maxWidth: {
        "layout-lg": "1176px",
        wrapper: "73.5rem",
      },
      maxHeight: {
        wrapper: "51.5rem",
      },
      minHeight: {
        wrapper: "51.5rem",
      },
      height: {
        wrapper: "51.5rem",
        dashboard: "44.5rem",
      },
      boxShadow: {
        "primary-btn": "0 2px 20px rgba(59, 171, 54, 0.54)",
        "secondary-btn": "0 2px 20px rgba(59, 171, 54, 0.54)",
      },
      fontSize: {
        xxs: "0.6rem",
      },
      colors: {
        primary: {
          main: "#3BAB36",
          dark: "#256320",
          light: "#EBFFD9",
        },
        black: "#060D00",
        white: "#FBFBFB",
        gray: {
          white: "#F2F2F2",
          light: "#C4C4C4",
          DEFAULT: "#9E9E9E",
          dark: "#525252",
        },
        green: {
          light: "#EBFFD9",
          DEFAULT: "#3BAB36",
          dark: "#256320",
          bg: "#BFEA94",
        },
      },
    },
  },
  plugins: [],
};

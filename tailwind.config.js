/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateRows: {
        core: "1fr 500px",
        "core-mobile": "auto 1fr auto",
        map: "max-content",
        "1fr": "1fr",
      },
      maxWidth: {
        "layout-lg": "1176px",
        wrapper: "73.5rem",
        "dashboard-web": "60rem",
        stat: "200px",
      },
      width: {
        "dashboard-web": "49rem",
        divider: "1px",
      },
      minWidth: {
        "dashboard-web": "52rem",
        50: "50%",
        stat: "200px",
      },
      maxHeight: {
        wrapper: "48.5rem",
        dashboard: "42rem",
      },
      minHeight: {
        wrapper: "42rem",
        map: "20rem",
        dashboard: "42rem",
      },
      height: {
        wrapper: "51.5rem",
        dashboard: "42rem",
        90: "90%",
        "map-mobile": "40vh",
      },
      spacing: {
        "1-negative": "-1px",
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

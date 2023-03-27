/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        notification: {
          "0%": { transform: "translateY(-40px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        notification: "notification 0.3s ease-in-out 1",
      },
      gridTemplateRows: {
        core: "1fr 500px",
        column: "auto 1fr",
        "core-mobile": "auto 1fr auto",
        "1fr": "1fr",
      },
      maxWidth: {
        "stat-box": "200px",
        "stat-item": "350px",
        wrapper: "73.5rem",
        "dashboard-web": "60rem",
        "layout-lg": "1176px",
      },
      width: {
        divider: "1px",
        "dashboard-web": "49rem",
      },
      minWidth: {
        50: "50%",
        stat: "200px",
        "dashboard-web": "52rem",
      },
      maxHeight: {
        wrapper: "48.5rem",
        dashboard: "42rem",
      },
      minHeight: {
        wrapper: "42rem",
        map: "20rem",
        dashboard: "42rem",
        statistic: "300px",
      },
      height: {
        90: "90%",
        wrapper: "51.5rem",
        dashboard: "42rem",
        "map-mobile": "40vh",
      },
      spacing: {
        "1-negative": "-1px",
      },
      boxShadow: {
        "primary-btn": "0 2px 20px rgba(59, 171, 54, 0.54)",
        "robot-btn": "inset 0 0 0 1px rgba(235, 255, 217, 1)",
        "robot-btn-active": "inset 0 0 0 3px rgba(59, 171, 54, 1)",
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

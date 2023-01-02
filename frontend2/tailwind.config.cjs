/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat"],
      },
      keyframes: {
        fadeIn: {
          "0%": { transform: "scale(0%)" },
          "100%": { transform: "scale(100%)" },
        },
        appear: {
          "0%": { opacity: "0%", translate: "0 10px" },
          "100%": { opacity: "1", translate: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s",
        appear: "appear 0.3s",
      },
      gridTemplateColumns: {
        autoFill: "repeat(auto-fill, minmax(240px, 1fr))",
      },
    },
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
  },
  plugins: [],
};

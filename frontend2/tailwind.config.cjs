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
      },
      animation: {
        fadeIn: "fadeIn 0.2s",
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

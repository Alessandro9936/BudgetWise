/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
      },

      gridTemplateColumns: {
        autoFill: "repeat(auto-fill, minmax(240px, 1fr))",
        autoFillBudgets: "repeat(auto-fill, minmax(280px, 1fr))",
        autoFillBudgetOptions: "repeat(auto-fill, minmax(160px, 1fr))",
      },
    },
    screens: {
      sm: "360px",
      midsm: "608px",
      md: "768px",
      lg: "1080px",
      xl: "1600px",
    },
  },
  plugins: [],
};

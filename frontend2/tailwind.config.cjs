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
          "0%": { opacity: "0%", transform: "scale(0%)" },
          "100%": { opacity: "1", transform: "scale(100%)" },
        },
        appear: {
          "0%": { opacity: "0%", translate: "0 10px" },
          "100%": { opacity: "1", translate: "0" },
        },
        progressBar: {
          "0%": { opacity: "50%", width: "0%" },
          "100%": { opacity: "1", width: "100%" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s",
        appear: "appear 0.3s",
        progressBar: "progressBar 0.7s ease-in-out",
      },
      gridTemplateColumns: {
        autoFill: "repeat(auto-fill, minmax(240px, 1fr))",
        autoFillBudgets: "repeat(auto-fill, minmax(280px, 1fr))",
      },
    },
    screens: {
      sm: "360px",
      midsm: "581px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
  },
  plugins: [],
};

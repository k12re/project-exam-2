/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      "white-pink": "#FFF6F8",
      "light-pink": "#F2BBC9",
      pink: "#D97E96",
      violet: "8C5D7C",
      green: "#025E73",
      "dark-green": "#022626",
      red: "#FF4141",
      "dark-red": "#C50000",
    },
    fontFamily: {
      logo: ["Inspiration", "cursive"],
      btn: ["Geologica"],
      // "AR One Sans", "Anek Latin", "Geologica", "Lexend", "Signika",
    },
    extend: {},
  },

  plugins: [],
};

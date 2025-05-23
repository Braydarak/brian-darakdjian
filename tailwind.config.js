/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 10px rgba(98, 186, 27, 0.5)', 
      },
      colors: {
        primary: "#8E0103",
        secondary: "#FFB950",
        primaryButton: "#A50104",
        shadowButton: "#FF931F",
        grayFont: "#7A0103",
        whiteFont: "#FFFFFF"
      },
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
        IBM: ["IBM Plex Mono", "monospace"],
        RockSalt: ["Rock Salt", "cursive"],
      },
    },
  },
  plugins: [],
}
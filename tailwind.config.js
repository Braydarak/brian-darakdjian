/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 10px rgba(98, 186, 27, 0.5)', 
      },
      colors: {
        primary: "#080808",
        secondary: "#1B1B1B",
        primaryButton: "#3F8E00",
        shadowButton: "#62BA1B",
        grayFont: "#9C9C9C",
        whiteFont: "#FFFFFF"
      },
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
        IBM: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
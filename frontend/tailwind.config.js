/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#00D09C",
          greenHover: "#00B88A",
          red: "#FF5252",
          dark: "#0F172A",
          card: "#1E293B",
          border: "#334155"
        }
      }
    },
  },
  plugins: [],
}

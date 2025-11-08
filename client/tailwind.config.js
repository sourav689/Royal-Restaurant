/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // For Vite, or public/index.html for CRA
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this path is correct for your components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        '#1a1510': '#1a1510', // Dark background
        '#d4af37': '#d4af37', // Gold accent
        '#b8860b': '#b8860b', // Darker gold for gradients
        '#0f1729': '#0f1729', // Dark blue-gray for sections
      }
    },
  },
  plugins: [],
}
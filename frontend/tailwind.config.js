/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
      'light-gray': '#f4f4f4', // Customize this color
    }
  },
  },
  plugins: [],
}


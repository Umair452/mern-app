/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin'
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,tsx,ts}",  // ✅ added jsx
    "./node_modules/flowbite-react/**/*.js",
],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite
  ],
}


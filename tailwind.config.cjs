/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#03BE57'
      }
    },
  },
  plugins: [],
}

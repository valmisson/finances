/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.vue',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/app.vue'
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

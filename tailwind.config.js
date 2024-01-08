/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./js/**/*.js",
    "./*.html",
    "./imageset/*.html",
  ],
  theme: {},
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}

// i'm running this locally in my Terminal with the command: npm run build:css
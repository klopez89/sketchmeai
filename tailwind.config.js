/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./js/**/*.js",
    "./*.html",
    "./imageset/*.html",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require("tw-elements/dist/plugin.cjs"),
  ],
}

// i'm running this locally in my Terminal with the command: npm run build:css
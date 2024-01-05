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
    width: true,
    height: true,
    textColor: true,
    size: true,
    fontSize: true,
    backgroundColor: true,
    backgroundOpacity: true,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}


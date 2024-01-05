/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
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

// "./js/**/*.js",
// "./*.html",
// "./imageset/*.html",
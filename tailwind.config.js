/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./js/**/*.js",
    "./*.html",
    "./**/*.html",
    "./imageset/*.html",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      maxWidth: {
        '80': '20rem', // Adjust the value as needed
      },
      colors: {
        primary: 'black',
        secondary: 'gray.800',
        minor: 'gray.400',
        dark: 'gray.900',
        light: 'gray.100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require("tw-elements/dist/plugin.cjs"),
  ],
}

// i'm running this locally in my Terminal with the command: npm run build:css
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./public/**/*.html",
    ],
    // transform: {
    //   tsx: require('postcss-lit').tailwindTransform
    // }
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

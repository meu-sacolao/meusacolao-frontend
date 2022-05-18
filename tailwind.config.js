const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      borderWidth: {
        '12': '12px',
        '20': '20px',
      }
    },
    fontFamily: {
      'sans': ['Rubik', ...defaultTheme.fontFamily.sans],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: [
    './**/*.vue',
  ]
}
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      borderWidth: {
        '8': '8px',
        '10': '10px',
        '12': '12px',
        '20': '20px',
      },
      maxWidth: {
        'screen': '100vw !important'
      },
      minWidth: {
        'md': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
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
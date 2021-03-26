const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./views/**/*.hbs'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    colors: {
      red: {
        DEFAULT: '#E54B4A',
        dark: '#BA3F37'
      },
      green: {
        DEFAULT: '#4D7883',
        dark: '#465768'
      },
      black: colors.black,
      gray: colors.coolGray,
      white: colors.white
    },
    extend: {
      colors: {
        peach: '#F3B997'
      },
      fontFamily: {
        roboto: ['"Roboto Slab"']
      }
    }
  }
}

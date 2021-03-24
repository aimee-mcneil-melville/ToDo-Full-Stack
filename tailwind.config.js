const colors = require('tailwindcss/colors')

module.exports = {
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
      white: colors.white
    },
    extend: {
      colors: {
        peach: '#F3B997'
      }
    },
    fontFamily: {
      sans: ['"Roboto Slab"', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    }
  }
}

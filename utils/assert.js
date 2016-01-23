var colors = require('colors')
var emoji = require('node-emoji')
var pretty = require('js-object-pretty-print').pretty

module.exports = function (actual, expected, message) {
  if (actual === expected) {
    console.log(colors.green(emoji.get('white_check_mark')), colors.green(message))
  } else {
    console.log(colors.red(emoji.get('negative_squared_cross_mark')), colors.red(message))

    console.log('actual: ', pretty(actual))
    // console.log('...............')
    console.log('expected: ', pretty(expected))
  }
}

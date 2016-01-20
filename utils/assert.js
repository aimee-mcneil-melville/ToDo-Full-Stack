var colors = require('colors')
var emoji = require('node-emoji')

module.exports = function (actual, expected, message) {
  if (actual === expected) {
    console.log(emoji.get('white_check_mark').green, message.green)
  } else {
    console.log(emoji.get('negative_squared_cross_mark').red, message.red)
  }
}

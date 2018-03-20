var test = require('tape')
var outOfBounds = require('../outOfBounds')

test('outOfBounds', function (t) {
  var testArray = [1, 2, 3]
  var expecteds = {
    '-2': true,
    '-1': true,
    0: false,
    1: false,
    2: false,
    3: true,
    4: true
  }

  Object.keys(expecteds).forEach(function (input) {
    var expected = expecteds[input]
    var actual = outOfBounds(input, testArray)

    var message = 'cell count ' + input + ' is ' +
      (expected ? 'out of bounds' : 'not out of bounds')

    t.equal(actual, expected, message)
  })
  t.end()
})

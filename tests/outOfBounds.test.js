<<<<<<< HEAD
var outOfBounds = require('../outOfBounds')

test('outOfBounds', function () {
=======
var test = require('tape')
var outOfBounds = require('../outOfBounds')

test('outOfBounds', function (t) {
>>>>>>> parent of e6f1255... Bring tests back
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

<<<<<<< HEAD
    expect(actual).toBe(expected)
  })
=======
    t.equal(actual, expected, message)
  })
  t.end()
>>>>>>> parent of e6f1255... Bring tests back
})

<<<<<<< HEAD
var underPopulated = require('../underPopulated')

test('underPopulated normal cases', function () {
=======
var test = require('tape')
var underPopulated = require('../underPopulated')

test('underPopulated normal cases', function (t) {
>>>>>>> parent of e6f1255... Bring tests back
  var expecteds = {
    0: true,
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  }

  Object.keys(expecteds).forEach(function (input) {
    var expected = expecteds[input]
    var actual = underPopulated(input)

    var message = 'cell count ' + input + ' is ' +
      (expected ? 'underpopulated' : 'not underpopulated')

<<<<<<< HEAD
    expect(actual).toBe(expected)
  })

=======
    t.equal(actual, expected, message)
  })

  t.end()
>>>>>>> parent of e6f1255... Bring tests back
})

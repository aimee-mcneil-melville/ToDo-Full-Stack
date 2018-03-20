<<<<<<< HEAD
var ressurectable = require('../ressurectable')

test('ressurectable normal cases', function () {
=======
var test = require('tape')
var ressurectable = require('../ressurectable')

test('ressurectable normal cases', function (t) {
>>>>>>> parent of e6f1255... Bring tests back
  var expecteds = {
    0: false,
    1: false,
    2: false,
    3: true,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  }

  Object.keys(expecteds).forEach(function (input) {
    var expected = expecteds[input]
    var actual = ressurectable(parseInt(input, 10))

    var message = 'cell count ' + input + ' is ' +
      (expected ? 'ressurectable' : 'not ressurectable')

<<<<<<< HEAD
    expect(actual).toBe(expected)
  })

=======
    t.equal(actual, expected, message)
  })

  t.end()
>>>>>>> parent of e6f1255... Bring tests back
})

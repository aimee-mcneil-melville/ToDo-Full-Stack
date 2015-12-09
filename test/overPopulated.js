var test = require('tape')
var overPopulated = require('../overPopulated')

test('overPopulated normal cases', function (t) {
  var expecteds = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true
  }

  Object.keys(expecteds).forEach(function (input) {
    var expected = expecteds[input]
    var actual = overPopulated(input)

    var message = 'cell count ' + input + ' is ' +
      (expected ? 'overpopulated' : 'not overpopulated')

    t.equal(actual, expected, message)
  })

  t.end()
})

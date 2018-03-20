var underPopulated = require('../underPopulated')

test('underPopulated normal cases', function () {
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

    expect(actual).toBe(expected)
  })

})

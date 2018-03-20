var indicesOutOfBounds = require('../indicesOutOfBounds')

test('outOfBounds', function () {
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

  Object.keys(expecteds).forEach(function (input1) {
    Object.keys(expecteds).forEach(function (input2) {
      var expected = expecteds[input1] || expecteds[input2]
      var actual = indicesOutOfBounds(input1, input2, testArray)

      var message = 'cell counts are ' + input1 + ' and ' + input2 + ' is ' +
        (expected ? 'out of bounds' : 'not out of bounds')

      expect(actual).toBe(expected)
    })
  })
})

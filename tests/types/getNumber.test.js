var types = require('../../types')

test('types.getNumber returns a number', function () {
  var expected = 'number'
  var actual = typeof(types.getNumber())
  expect(actual).toBe(expected)
})


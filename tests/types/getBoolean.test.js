var types = require('../../types')

test('types.getBoolean returns a boolean', function () {
  var expected = 'boolean'
  var actual = typeof(types.getBoolean())
  expect(actual).toBe(expected)
})


var types = require('../../types')

test('types.getFunction returns a function', function () {
  var expected = 'function'
  var actual = typeof(types.getFunction())
  expect(actual).toBe(expected)
})


var types = require('../../types')

test('types.getString returns a string', function () {
  var expected = 'string'
  var actual = typeof(types.getString())
  expect(actual).toBe(expected)
})


var types = require('../../types')

test('types.getObject returns an object', function () {
  var expected = 'object'
  var actual = typeof(types.getObject())
  expect(actual).toBe(expected)
})


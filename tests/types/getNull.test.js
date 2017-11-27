var types = require('../../types')

test('types.getNull returns null', function () {
  var expected = null
  var actual = types.getNull()
  expect(actual).toBe(expected)
})


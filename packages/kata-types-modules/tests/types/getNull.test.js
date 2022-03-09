const types = require('../../types')

test('types.getNull returns null', function () {
  const expected = null
  const actual = types.getNull()
  expect(actual).toBe(expected)
})

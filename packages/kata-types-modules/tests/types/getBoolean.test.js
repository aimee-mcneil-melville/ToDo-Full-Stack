const types = require('../../types')

test('types.getBoolean returns a boolean', function () {
  const expected = 'boolean'
  const actual = typeof types.getBoolean()
  expect(actual).toBe(expected)
})

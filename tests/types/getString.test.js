const types = require('../../types')

test('types.getString returns a string', function () {
  const expected = 'string'
  const actual = typeof types.getString()
  expect(actual).toBe(expected)
})

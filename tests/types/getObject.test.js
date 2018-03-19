const types = require('../../types')

test('types.getObject returns an object', function () {
  const expected = 'object'
  const actual = typeof types.getObject()
  expect(actual).toBe(expected)
})

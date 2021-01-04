const types = require('../../types')

test('types.getNumber returns a number', function () {
  const expected = 'number'
  const actual = typeof types.getNumber()
  expect(actual).toBe(expected)
})

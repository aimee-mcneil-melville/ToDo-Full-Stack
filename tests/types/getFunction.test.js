const types = require('../../types')

test('types.getFunction returns a function', function () {
  const expected = 'function'
  const actual = typeof types.getFunction()
  expect(actual).toBe(expected)
})

const addStrings = require('../utilities').addStrings

test('addStrings can add number strings and convert them back to a string', () => {
  const expected = '52'
  const actual = addStrings(42, '10')
  expect(actual).toBe(expected)
})

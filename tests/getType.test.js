const getType = require('../utilities').getType

const randomStrings = require('../data/random-strings')

test('"42" is a string data type', () => {
  const expected = 'string'
  const actual = getType('42')
  expect(actual).toBe(expected)
})

test('data is an object', () => {
  const expected = 'object'
  const actual = getType(randomStrings)
  expect(actual).toBe(expected)
})

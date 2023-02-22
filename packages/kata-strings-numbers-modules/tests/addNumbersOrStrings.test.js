const addNumbersOrStrings = require('../utilities').addNumbersOrStrings

test('addNumbersOrStrings can add numbers', () => {
  const expected = 5
  const actual = addNumbersOrStrings(2, 3)
  expect(actual).toBe(expected)
})

test('addNumbersOrStrings can add strings', () => {
  const expected = '3'
  const actual = addNumbersOrStrings('1', '2')
  expect(actual).toBe(expected)
})

test('addNumbersOrStrings can add strings and number (returning a string)', () => {
  const expected = '5'
  const actual = addNumbersOrStrings(2, '3')
  expect(actual).toBe(expected)
})

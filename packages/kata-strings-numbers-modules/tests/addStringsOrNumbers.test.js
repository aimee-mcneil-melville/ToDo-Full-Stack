const addStringsOrNumbers = require('../utilities').addStringsOrNumbers

test('addStringsOrNumbers can add numbers', () => {
  const expected = 5
  const actual = addStringsOrNumbers(2, 3)
  expect(actual).toBe(expected)
})

test('addStringsOrNumbers can add strings', () => {
  const expected = '3'
  const actual = addStringsOrNumbers('1', '2')
  expect(actual).toBe(expected)
})

test('addStringsOrNumbers can add strings and number (returning a string)', () => {
  const expected = '5'
  const actual = addStringsOrNumbers(2, '3')
  expect(actual).toBe(expected)
})

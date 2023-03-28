const sum = require('../utilities').sum

test('sum successfully adds positive numbers', () => {
  const expected = 5
  const actual = sum(2, 3)
  expect(actual).toBe(expected)
})

test('sum successfully adds negative numbers', () => {
  const expected = 0
  const actual = sum(-2, 2)
  expect(actual).toBe(expected)
})

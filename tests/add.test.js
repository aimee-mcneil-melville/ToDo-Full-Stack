const add = require('../utilities').add

test('add successfully adds two numbers', () => {
  const expected = 5
  const actual = add(2, 3)
  expect(actual).toBe(expected)
})

test('add successfully adds two numbers', () => {
  const expected = 0
  const actual = add(-2, 2)
  expect(actual).toBe(expected)
})

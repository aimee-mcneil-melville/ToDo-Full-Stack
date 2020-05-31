const kata = require('../kata.js')

test('getPropertyValue gets values from objects', () => {
  const expected = 21
  const actual = kata.getPropertyValue({ age: 21 }, 'age')
  expect(actual).toBe(expected)
})

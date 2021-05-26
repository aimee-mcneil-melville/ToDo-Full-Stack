const functions = require('../../functions')

// Write a simple find implementation
test('functions.find takes an array as the first parameter, a function as the second parameter, and returns the first single element for which the function returns true', function () {
  const expected = 1

  function isOdd (n) {
    return n % 2 !== 0
  }
  const actual = functions.find([2, 1, 2, 2, 5], isOdd)
  expect(actual).toBe(expected)
})

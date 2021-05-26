const functions = require('../../functions')

// Write a simple map implementation
test('functions.map takes an array as the first parameter, a function as the second parameter, and returns the result of calling the function on each array element', function () {
  const expected = [1, 2, 3]
  function addOne (n) {
    return n + 1
  }
  const actual = functions.map([0, 1, 2], addOne)
  expect(actual).toEqual(expected)
})

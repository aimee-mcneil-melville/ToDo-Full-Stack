const functions = require('../../functions')

// Things to think about:
//  - how does this test ensure that the function `increment` has actually been called?
//  - what is the difference between `increment` and `increment()`
test('functions.callsFunction takes a function as a parameter and calls it once', function () {
  const increment = function () {
    actual++
  }
  let actual = 0
  const expected = 1
  functions.callsFunction(increment)
  expect(actual).toBe(expected)
})

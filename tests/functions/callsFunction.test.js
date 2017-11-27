var functions = require('../../functions')

// If you find this test confusing, don't worry! You don't need to understand it right now.
// If you're curious, after class read up on call, apply, bind, and the `this` keyword.
test('functions.callsFunction takes a function as a parameter and calls it once', function () {
  var increment = function () {
    actual++
  }
  var expected = 1
  var actual = 0
  functions.callsFunction(increment)
  expect(actual).toBe(expected)
})


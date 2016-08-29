// Consolidating all the tests into one file is NOT normal practice!
// We're more interested in getting you used to making tests pass...
// so we didn't want you to have to deal with more than one test at a time
var test = require('ava')

var types = require('../types')
var functions = require('../functions')

test('types.getNumber returns a number', function (t) {
  var expected = 'number'
  var actual = typeof(types.getNumber())
  t.is(actual, expected)
})

test('types.getObject returns an object', function (t) {
  var expected = 'object'
  var actual = typeof(types.getObject())
  t.is(actual, expected)
})

test('types.getString returns a string', function (t) {
  var expected = 'string'
  var actual = typeof(types.getString())
  t.is(actual, expected)
})

test('types.getBoolean returns a boolean', function (t) {
  var expected = 'boolean'
  var actual = typeof(types.getBoolean())
  t.is(actual, expected)
})

test('types.getFunction returns a function', function (t) {
  var expected = 'function'
  var actual = typeof(types.getFunction())
  t.is(actual, expected)
})

test('types.getNull returns null', function (t) {
  var expected = null
  var actual = types.getNull()
  t.is(actual, expected)
})

// If you find this test confusing, don't worry! You don't need to understand it right now.
// If you're curious, after class read up on call, apply, bind, and the `this` keyword.
test('functions.callsTheFunction takes a function as a parameter and calls it once', function (t) {
  var increment = function () {
    actual++
  }
  var expected = 1
  var actual = 0
  functions.callsTheFunction(increment.bind(this))
  t.is(actual, expected)
})

// Same deal: if you're not sure, don't worry too much. Ask a teacher for some guidance.
test('functions.callsProperty accepts a parameter `obj` and calls obj.increment() (once)', function (t) {
  var expected = 1
  var actual = {
    n: 0,
    increment: function () {
      this.n++
    }
  }
  functions.callsProperty(actual)
  t.is(actual.n, expected)
})

// Write a simple map implementation
test('functions.map takes an array as the first parameter, a function as the second parameter, and returns the result of calling the function on each array element', function (t) {
  var expected = [1, 2, 3]
  var actual = functions.map([0, 1, 2], function (n) { return ++n })
  t.deepEqual(actual, expected)
})

// Write a simple filter implementation
test('functions.filter takes an array as the first parameter, a function as the second parameter, and only returns elements for which the function returns true', function (t) {
  var expected = [2]
  var actual = functions.filter([1, 2, 3], function (n) { return n % 2 === 0 })
  t.deepEqual(actual, expected)
})

// Write a simple find implementation
test('functions.find takes an array as the first parameter, a function as the second parameter, and returns the first single element for which the function returns true', function (t) {
  var expected = 1
  var actual = functions.find([2, 1, 2, 2, 5], function (n) {return n % 2 !== 0 })
  t.is(actual, expected)
})

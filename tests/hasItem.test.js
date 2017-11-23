var kata = require('../kata.js')

test('hasItem returns true if item is in array', function () {
  var arr = ['a', 1, null, true]
  var expected = true
  var actual = kata.hasItem(arr, 'a')
  expect(actual).toBe(expected)
})

test('hasItem returns false if item is not in array', function () {
  var arr = ['a', 1, null, true]
  var expected = false
  var actual = kata.hasItem(arr, 'b')
  expect(actual).toBe(expected)
})


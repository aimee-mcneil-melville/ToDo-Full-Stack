var kata = require('../kata.js')

test('getItemAtIndex returns the correct item for an existing index', function () {
  var alphabet = ['a', 'b', 'c', 'd', 'e']
  var expected = 'd'
  var actual = kata.getItemAtIndex(alphabet, 3)
  expect(actual).toBe(expected)
})

test('getItemAtIndex returns a JavaScript Error for a non-existent index', function () {
  var alphabet = ['a', 'b', 'c', 'd', 'e']
  var expected = new Error()
  var actual = kata.getItemAtIndex(alphabet, 5)
  expect(actual).toEqual(expected)
})


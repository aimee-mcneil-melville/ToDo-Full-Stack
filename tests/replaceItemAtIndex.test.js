var kata = require('../kata.js')

test('replaceItemAtIndex replaces the correct item', function () {
  var alphabet = ['a', 'b', 'c', 'd', 'e']
  var expected = ['alpha', 'b', 'c', 'd', 'e']
  kata.replaceItemAtIndex(alphabet, 0, 'alpha')
  expect(alphabet).toEqual(expected)
})


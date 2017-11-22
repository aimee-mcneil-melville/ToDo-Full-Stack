var kata = require('../kata.js')

test('deleteItemAtIndex deletes an element from the array', function () {
  var names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor' ]
  var expected = [ 'Aroha', 'Bob', 'Eleanor' ]
  kata.deleteItemAtIndex(names, 2)
  expect(names).toEqual(expected)
})


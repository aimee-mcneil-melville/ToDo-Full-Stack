var kata = require('../kata.js')

test('deleteItemAtIndex deletes an element from the array', function () {
  var names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor' ]
  var expected = [ 'Aroha', 'Bob', 'Eleanor' ]
  kata.deleteItemAtIndex(names, 2)
  expect(names).toEqual(expected)
})

test('deleteItem deletes ALL instances of item from the array', function () {
  var names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor', 'Bob', 'Bob' ]
  var expected = [ 'Aroha', 'Celia', 'Eleanor' ]
  var actual = kata.deleteItem(names, 'Bob')
  expect(actual).toEqual(expected)
})


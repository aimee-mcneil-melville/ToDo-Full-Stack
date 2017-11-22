var kata = require('../kata.js')

test('insertItemAtIndex inserts an element into the array', function () {
  var names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor' ]
  var expected = [ 'Aroha', 'Bob', 'Celia', 'Dan', 'Eleanor' ]
  kata.insertItemAtIndex(names, 'Dan', 3)
  expect(names).toEqual(expected)
})


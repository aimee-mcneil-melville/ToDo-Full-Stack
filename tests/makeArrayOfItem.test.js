var kata = require('../kata.js')

test('makeArrayOfItem (SINGULAR) makes an array out of one item', function () {
  var expected = ['dog', 'dog', 'dog']
  var actual = kata.makeArrayOfItem('dog', 3)
  expect(actual).toEqual(expected)
})


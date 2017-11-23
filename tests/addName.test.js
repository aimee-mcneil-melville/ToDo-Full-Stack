var kata = require('../kata.js')

test('addName adds a name property', function () {
  var name = 'Matthieu Ricard'
  var actual = {
    address: '123 Happy Place'
  }
  var expected = {
    name: name,
    address: '123 Happy Place'
  }
  kata.addName(actual, name)
  expect(actual).toEqual(expected)
})


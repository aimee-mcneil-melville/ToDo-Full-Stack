var kata = require('../kata.js')

test('makeObject makes objects', function () {
  var expected = { name: 'mix' }
  var actual = kata.makeObject('name', 'mix')
  expect(actual).toEqual(expected)

  var expected2 = { age: 32 }
  var actual2 = kata.makeObject('age', 32)
  expect(actual2).toEqual(expected2)
})


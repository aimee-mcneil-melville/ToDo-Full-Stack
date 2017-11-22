var kata = require('../kata.js')

test('getValue gets values from objects', function () {
  var expected = 21
  var actual = kata.getValue({ age: 21 }, 'age')
  expect(actual).toBe(expected)
})


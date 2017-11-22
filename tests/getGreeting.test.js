var kata = require('../kata.js')

test('getGreeting returns "Hello <name>"', function () {
  var expected = 'Hello Aardvark'
  var actual = kata.getGreeting('Aardvark')
  expect(actual).toBe(expected)
})


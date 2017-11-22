var kata = require('../kata.js')

test('values returns own values for an object', function () {
  var dracula = {
    name: 'Count Dracula',
    email: 'dracula@hotmail.com',
    password: '12345',
    country: 'Transylvania'
  }
  var expected = ['Count Dracula', 'dracula@hotmail.com', '12345', 'Transylvania']
  var actual = kata.values(dracula)
  expect(actual).toEqual(expected)
})


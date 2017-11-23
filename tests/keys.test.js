var kata = require('../kata.js')

test('keys returns own property keys for an object', function () {
  var dracula = {
    name: 'Count Dracula',
    email: 'dracula@hotmail.com',
    password: '12345',
    country: 'Transylvania'
  }
  var expected = ['name', 'email', 'password', 'country']
  var actual = kata.keys(dracula)
  expect(actual).toEqual(expected)
})


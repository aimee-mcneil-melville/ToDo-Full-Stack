var kata = require('../kata.js')

test('unzipObject returns an array of key/value pairs', function () {
  var dracula = {
    name: 'Count Dracula',
    email: 'dracula@hotmail.com',
    password: '12345',
    country: 'Transylvania'
  }
  var expected = Object.keys(dracula)
    .map(function (key) {
      return [key, dracula[key]]
    })
  var actual = kata.unzipObject(dracula)
  expect(actual).toEqual(expected)
})


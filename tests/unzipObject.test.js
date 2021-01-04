const kata = require('../kata.js')

test('unzipObject returns an array of key/value pairs', () => {
  const dracula = {
    name: 'Count Dracula',
    email: 'dracula@hotmail.com',
    password: '12345',
    country: 'Transylvania'
  }
  const expected = Object.keys(dracula).map(key => [key, dracula[key]])

  const actual = kata.unzipObject(dracula)

  expect(actual).toEqual(expected)
})

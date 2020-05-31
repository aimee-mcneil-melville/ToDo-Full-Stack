const kata = require('../kata.js')

test('zipObject returns an object by combining key and value arrays', () => {
  const draculaReborn = {
    name: 'Count Dracula',
    email: 'dracula@hotmail.com',
    password: '12345',
    country: 'Transylvania'
  }
  const actual = kata.zipObject(
    ['name', 'email', 'password', 'country'],
    ['Count Dracula', 'dracula@hotmail.com', '12345', 'Transylvania']
  )
  expect(actual).toEqual(draculaReborn)
})


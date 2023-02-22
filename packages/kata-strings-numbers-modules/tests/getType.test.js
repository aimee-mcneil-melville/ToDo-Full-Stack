const getType = require('../utilities').getType

test('"42" is a string data type', () => {
  const expected = 'string'
  const actual = getType('42')
  expect(actual).toBe(expected)
})

test('curly braces mean we have an object', () => {
  const monster = {
    name: 'Cthulhu',
    email: 'cthulhu@thedeep.com',
    country: "R'lyeh",
    age: 1032988,
  }

  const expected = 'object'
  const actual = getType(monster)
  expect(actual).toBe(expected)
})

const getType = require('../utilities').getType

test('getType identifies "42" as a string data type', () => {
  const expected = 'string'
  const actual = getType('42')
  expect(actual).toBe(expected)
})

test('getType identifies an object data type', () => {
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

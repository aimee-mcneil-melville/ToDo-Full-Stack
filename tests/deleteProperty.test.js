const kata = require('../kata.js')

test('deleteProp deletes properties', () => {
  const mickey = {
    name: 'Mickey Mouse',
    age: 64,
    email: 'mickey@disney.com'
  }

  const expected = {
    name: 'Mickey Mouse',
    age: 64
  }

  const actual = kata.deleteProperty(mickey, 'email')

  expect(actual).toEqual(expected)
  expect(actual).not.toBe(mickey)
})


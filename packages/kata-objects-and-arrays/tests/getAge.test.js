const kata = require('../kata.js')

test('getAge returns the age property of obj', () => {
  const elmo = {
    name: 'Elmo',
    age: 3,
    email: 'elmo@sesamestreet.com',
  }

  const result = kata.getAge(elmo)

  expect(result).toBe(3)
})

var kata = require('../kata.js')

test('ageOneYear adds 1 year to the age property of an object', function () {
  var mickey = {
    name: 'Mickey Mouse',
    age: 64,
    email: 'mickey@disney.com'
  }
  var expected = {
    name: 'Mickey Mouse',
    age: 65,
    email: 'mickey@disney.com'
  }
  kata.ageOneYear(mickey)
  expect(mickey).toEqual(expected)
})


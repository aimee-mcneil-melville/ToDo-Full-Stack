var kata = require('../kata.js')

test('deleteProp deletes properties', function () {
  var mickey = {
    name: 'Mickey Mouse',
    age: 64,
    email: 'mickey@disney.com'
  }
  var expected = {
    name: 'Mickey Mouse',
    age: 64
  }
  kata.deleteProp(mickey, 'email')
  expect(mickey).toEqual(expected)
})


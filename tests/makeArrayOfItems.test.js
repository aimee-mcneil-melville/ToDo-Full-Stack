var kata = require('../kata.js')

test('makeArrayOfItems (PLURAL) makes an array of arguments', function () {
  var expected = ['foo', 'bar', 'wombat', false, 99]
  var actual = kata.makeArrayOfItems('foo', 'bar', 'wombat', false, 99)
  expect(actual).toEqual(expected)
})


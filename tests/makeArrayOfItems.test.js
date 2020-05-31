const kata = require('../kata.js')

test('makeArrayOfItems (PLURAL) makes an array of arguments', () => {
  const expected = ['foo', 'bar', 'wombat', false, 99]
  const actual = kata.makeArrayOfItems('foo', 'bar', 'wombat', false, 99)
  expect(actual).toEqual(expected)
})

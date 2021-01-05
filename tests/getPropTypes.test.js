const getPropTypes = require('../getPropTypes')

test('getPropTypes returns the types of object properties', function () {
  // Arrange
  const objWithDifferentTypes = {
    a: 'c',
    b: 2,
    c: function () { return 'hello' },
    d: false,
    e: {}
  }
  const expected = ['string', 'number', 'function', 'boolean', 'object']

  // Act
  const actual = getPropTypes(objWithDifferentTypes)

  // Assert
  expect(actual).toEqual(expected)
})

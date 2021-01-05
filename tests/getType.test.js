const getType = require('../getType')

test('getType returns correct data type for number', function () {
  // Arrange
  const expected = 'number'

  // Act
  const actual = getType(123)

  // Assert
  expect(actual).toBe(expected)
})

test('getType returns correct data type for string', function () {
  // Arrange
  const expected = 'string'

  // Act
  const actual = getType('123') // Notice the difference between '123' and 123

  // Assert
  expect(actual).toBe(expected)
})

test('getType returns the expected data types', function () {
  // Arrange
  const arrayWithDifferentTypes = ['d', 3, function () { return 'hello' }, true, []]
  const expected = ['string', 'number', 'function', 'boolean', 'object']

  // Act
  const actual = arrayWithDifferentTypes.map(getType)

  // Assert
  expect(actual).toEqual(expected)
})

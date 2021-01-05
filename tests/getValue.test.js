const getValue = require('../getValue')

test('getValue gets a nested object by key', function () {
  // Arrange
  const contacts = {
    123: { address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 },
    124: { address: 'Bag End', name: 'Bilbo Baggins', age: 78 }
  }
  const expected = { address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 }

  // Act
  const actual = getValue(contacts, '123')

  // Assert
  expect(actual).toEqual(expected)
})

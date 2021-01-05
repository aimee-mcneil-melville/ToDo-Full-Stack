const getContacts = require('./getContacts')
const getAddress = require('../getAddress')

test('map and getAddress return the address property from objects in an array', function () {
  // Arrange
  const contacts = getContacts()
  const expected = ['742 Evergreen Terrace', 'Bag End', 'Wayne Manor', 'Skull Island', 'Wayne Manor']

  // Act
  const actual = contacts.map(getAddress)

  // Assert
  expect(actual).toEqual(expected)
})

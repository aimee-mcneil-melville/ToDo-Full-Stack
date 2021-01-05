const getContacts = require('./getContacts')
const where = require('../where')

test('where finds an object by id in an array', function () {
  // Arrange
  const contacts = getContacts()
  const expected = [{ id: '123', address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 }]

  // Act
  const actual = where(contacts, { id: '123' })

  // Assert
  expect(actual).toEqual(expected)
})

test('where finds an object by property', function () {
  // Arrange
  const contacts = getContacts()
  const expected = [{ id: '126', address: 'Skull Island', name: 'Dr Evil', age: 51 }]

  // Act
  const actual = where(contacts, { address: 'Skull Island' })

  // Assert
  expect(actual).toEqual(expected)
})

test('where returns multile correct results', function () {
  // Arrange
  const contacts = getContacts()
  const expected = 2

  // Act
  const actual = where(contacts, { age: 78 }).length

  // Assert
  expect(actual).toBe(expected)
})

test('where finds objects with two search properties', function () {
  // Arrange
  const contacts = getContacts()
  const expected = [{ id: '127', address: 'Wayne Manor', name: 'Alfred', age: 78 }]

  // Act
  const actual = where(contacts, { age: 78, address: 'Wayne Manor' })

  // Assert
  expect(actual).toEqual(expected)
})

import { test, expect } from 'vitest'
import getContacts from './getContacts'
import getAddress from '../getAddress'

test('getAddress returns the address property from objects in an array', function () {
  // Arrange
  const contacts = getContacts()
  const expected = [
    '742 Evergreen Terrace',
    'Bag End',
    'Wayne Manor',
    'Skull Island',
    'Wayne Manor',
  ]

  // Act
  const actual = contacts.map(getAddress)

  // Assert
  expect(actual).toEqual(expected)
})

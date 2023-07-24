import { describe, it, expect } from 'vitest'
import { getAddress } from '../../functions/3-interfaces'

const contacts = [
  { id: 1, name: 'John', address: '123 Main St' },
  { id: 2, name: 'Batman', address: 'Wayne Manor' },
  { id: 3, name: 'Minnie Mouse', address: 'Disneyland' },
  { id: 4, name: 'Kermit the Frog', address: 'Sesame St or the Swamp' },
]

describe('getAddress', () => {
  it('returns a string', () => {
    expect(typeof getAddress(contacts[0])).toBe('string')
  })

  it('returns the correct address of the contacts', () => {
    contacts.forEach((contact) => {
      expect(getAddress(contact)).toBe(contact.address)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { findTheBat } from '../../functions/3-interfaces'

const contacts = [
  { id: 1, name: 'John', address: '123 Main St' },
  { id: 2, name: 'Batman', address: 'Wayne Manor' },
  { id: 3, name: 'Minnie Mouse', address: 'Disneyland' },
  { id: 4, name: 'Kermit the Frog', address: 'Sesame St or the Swamp' },
]

describe('findTheBat', () => {
  it('returns null if there is no Batman', () => {
    const normalPeople = contacts.filter((contact) => contact.name !== 'Batman')
    expect(findTheBat(normalPeople)).toBeNull()
  })

  it('returns a string if Batman is present', () => {
    expect(typeof findTheBat(contacts)).toBe('string')
  })

  it('returns the address of Batman', () => {
    expect(findTheBat(contacts)).toBe('Wayne Manor')
  })
})

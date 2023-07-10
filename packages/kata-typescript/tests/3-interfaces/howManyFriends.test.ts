import { describe, it, expect } from 'vitest'
import { howManyFriends } from '../../functions/3-interfaces'

const contacts = [
  { id: 1, name: 'John', address: '123 Main St' },
  { id: 2, name: 'Batman', address: 'Wayne Manor' },
  { id: 3, name: 'Minnie Mouse', address: 'Disneyland' },
  { id: 4, name: 'Kermit the Frog', address: 'Sesame St or the Swamp' },
]

describe('howManyFriends', () => {
  it('returns a number', () => {
    expect(typeof howManyFriends(contacts)).toBe('number')
  })

  it('returns the correct number of contacts', () => {
    expect(howManyFriends(contacts)).toBe(4)
  })
})

import { describe, it, expect } from 'vitest'
import { getUser } from '../../functions/3-interfaces'

const users = {
  1: { name: 'John', verified: true, picture: 'https://example.com/john.jpg' },
  2: { name: 'Batman', verified: false },
  3: {
    name: 'Minnie Mouse',
    verified: true,
    email: 'thebaddestintown@dis.ney',
  },
  4: { name: 'Kermit the Frog', verified: true },
}

describe('getUser', () => {
  it('returns a user object', () => {
    expect(typeof getUser(1, users)).toBe('object')
  })

  it('returns the correct user', () => {
    const actual = getUser(3, users)
    expect.assertions(5)
    expect(actual).not.toBeNull()

    if (actual !== null) {
      expect(actual.name).toBe('Minnie Mouse')
      expect(actual.verified).toBe(true)
      expect(actual.email).toBe('thebaddestintown@dis.ney')
      expect(actual.picture).toBeUndefined()
    }
  })

  it('returns null if the user does not exist', () => {
    expect(getUser(5, users)).toBeNull()
  })
})

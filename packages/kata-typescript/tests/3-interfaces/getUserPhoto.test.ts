import { describe, it, expect } from 'vitest'
import { getUserPhoto } from '../../functions/3-interfaces'

describe('getUserPhoto', () => {
  it('returns a string containing the users photo', () => {
    const user = {
      name: 'Amy',
      verified: false,
      picture: 'https://example.com/amy.jpg',
    }
    expect(typeof getUserPhoto(user)).toBe('string')
    expect(getUserPhoto(user)).toBe('https://example.com/amy.jpg')
  })

  it('returns a string containing a kitten if the user has no photo', () => {
    const user = {
      name: 'Amy',
      verified: false,
    }
    expect(typeof getUserPhoto(user)).toBe('string')
    expect(getUserPhoto(user)).toBe('https://placekitten.com/200/300')
  })
})

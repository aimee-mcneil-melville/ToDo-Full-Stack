import { describe, it, expect } from 'vitest'
import { verifyUser } from '../../functions/3-interfaces'

describe('verifyUser', () => {
  const user = {
    name: 'Amy',
    verified: false,
  }
  const actual = verifyUser(user, 'amy@hello.com')

  it('returns a (new) object', () => {
    expect(typeof actual).toBe('object')
    expect(actual).not.toBe(user)
  })

  it('returns an object with the correct properties', () => {
    expect(actual.name).toBe('Amy')
    expect(actual.verified).toBe(true)
    expect(actual.email).toBe('amy@hello.com')
    expect(actual.picture).toBeUndefined()
  })
})

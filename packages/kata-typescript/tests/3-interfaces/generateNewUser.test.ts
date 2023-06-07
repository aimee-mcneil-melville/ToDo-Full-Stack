import { generateNewUser } from '../../functions/3-interfaces'

describe('generateNewUser', () => {
  it('returns an object', () => {
    expect(typeof generateNewUser('John')).toBe('object')
  })

  it('returns an object with the correct properties', () => {
    const user = generateNewUser('John')
    expect(user.name).toBe('John')
    expect(user.verified).toBe(false)
    expect(user.picture).toBeUndefined()
    expect(user.email).toBeUndefined()
  })
})

import { getGreeting } from '../../functions/1-types'

describe('getGreeting', () => {
  it('returns a string', () => {
    expect(typeof getGreeting('name')).toBe('string')
  })

  it('return contains "Hello " and the contents of `name`', () => {
    expect(getGreeting('name')).toBe('Hello name')
    expect(getGreeting('Human')).toBe('Hello Human')
  })
})

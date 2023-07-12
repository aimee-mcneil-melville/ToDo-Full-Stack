import { describe, it, expect } from 'vitest'
import { getFullName } from '../../functions/1-types'

describe('getFullName', () => {
  it('returns a string', () => {
    expect(typeof getFullName('first', 'last')).toBe('string')
  })

  it('returns a correctly formatted first and last name', () => {
    expect(getFullName('first', 'last')).toBe('first last')
    expect(getFullName('Bruce', 'Wayne')).toBe('Bruce Wayne')
  })
})

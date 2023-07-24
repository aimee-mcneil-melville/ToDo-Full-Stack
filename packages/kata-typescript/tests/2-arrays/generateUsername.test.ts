import { describe, it, expect } from 'vitest'
import { generateUsername } from '../../functions/2-arrays'

describe('generateUsername (TUPLE)', () => {
  it('returns a string', () => {
    expect(typeof generateUsername(['John', 'Smith', 1990])).toBe('string')
  })

  it('returns a username in the correct format', () => {
    const details: [string, string, number] = ['Ada', 'Lovelace', 1815]
    expect(generateUsername(details)).toBe('lovelacead_1815')
  })
})

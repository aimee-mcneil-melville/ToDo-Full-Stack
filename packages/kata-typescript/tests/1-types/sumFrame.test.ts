import { describe, it, expect } from 'vitest'
import { sumFrame } from '../../functions/1-types'

describe('sumFrame (OPTIONAL PARAMETER)', () => {
  it('returns a number', () => {
    expect(typeof sumFrame(1, 2)).toBe('number')
    expect(typeof sumFrame(1, 2, 3)).toBe('number')
  })

  it('returns the sum of the two parameters', () => {
    expect(sumFrame(1, 2)).toBe(3)
    expect(sumFrame(5, 5)).toBe(10)
  })

  it('returns the sum of the three parameters', () => {
    expect(sumFrame(1, 2, 3)).toBe(6)
    expect(sumFrame(5, 5, 5)).toBe(15)
  })
})

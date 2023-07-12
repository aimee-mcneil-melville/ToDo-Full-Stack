
import { describe, it, expect } from 'vitest'
import { getOpposite } from '../../../functions/6-stretch-narrowing'

describe('getOpposite', () => {
  it('should return the opposite of a string', () => {
    expect(getOpposite('hello')).toBe('olleh')
    expect(getOpposite('dlrow')).toBe('world')
  })

  it('should return the opposite of a number', () => {
    expect(getOpposite(42)).toBe(-42)
    expect(getOpposite(-12)).toBe(12)
  })

  it('should return the opposite of a boolean', () => {
    expect(getOpposite(true)).toBe(false)
    expect(getOpposite(false)).toBe(true)
  })
})

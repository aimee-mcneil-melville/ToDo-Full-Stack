import { describe, it, expect } from 'vitest'
import { addNumbersAndStrings } from '../../functions/1-types'

describe('addNumbersAndStrings (PARAMS UNION TYPE)', () => {
  it('returns a number', () => {
    expect(typeof addNumbersAndStrings(1, 2)).toBe('number')
  })

  it('returns the sum when both parameters are numbers', () => {
    expect(addNumbersAndStrings(1, 2)).toBe(3)
    expect(addNumbersAndStrings(5, 5)).toBe(10)
  })

  it('returns the sum when both parameters are strings', () => {
    expect(addNumbersAndStrings('1', '2')).toBe(3)
    expect(addNumbersAndStrings('5', '5')).toBe(10)
  })

  it('returns the sum when one parameter is a number and the other is a string', () => {
    expect(addNumbersAndStrings(1, '2')).toBe(3)
    expect(addNumbersAndStrings('5', 5)).toBe(10)
  })
})

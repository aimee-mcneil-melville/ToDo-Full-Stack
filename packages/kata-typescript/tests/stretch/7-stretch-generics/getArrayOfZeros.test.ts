import { describe, it, expect } from 'vitest'
import { getArrayOfZeros } from '../../../functions/7-stretch-generics'

describe('getArrayOfZeros', () => {
  it('should return an array', () => {
    expect(Array.isArray(getArrayOfZeros(3))).toBe(true)
  })

  it('should return an array of the specified length', () => {
    expect(getArrayOfZeros(3)).toHaveLength(3)
  })

  it('should return an empty array if the number is less than 1', () => {
    expect(getArrayOfZeros(-3)).toHaveLength(0)
  })

  it('should return an array of zeros', () => {
    expect(getArrayOfZeros(3)).toEqual([0, 0, 0])
  })
})

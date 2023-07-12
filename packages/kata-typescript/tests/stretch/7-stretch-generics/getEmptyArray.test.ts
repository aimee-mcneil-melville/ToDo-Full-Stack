import { describe, it, expect } from 'vitest'
import { getEmptyArray } from '../../../functions/7-stretch-generics'

describe('getEmptyArray', () => {
  it('should return an array with no length', () => {
    const result = getEmptyArray()
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(0)
  })
})

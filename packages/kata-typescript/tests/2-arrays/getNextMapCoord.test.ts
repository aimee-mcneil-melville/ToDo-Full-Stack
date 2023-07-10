import { describe, it, expect } from 'vitest'
import { getNextMapCoord } from '../../functions/2-arrays'

describe('getNextMapCoord (TUPLE and ALIAS)', () => {
  it('returns a tuple of the correct length', () => {
    const actual = getNextMapCoord([1, 2], 'N')
    expect(Array.isArray(actual)).toBe(true)
    expect(actual).toHaveLength(2)
  })

  it('returns a tuple with the correct values', () => {
    expect(getNextMapCoord([42, 12], 'N')).toEqual([42, 13])
    expect(getNextMapCoord([1, 2], 'E')).toEqual([2, 2])
    expect(getNextMapCoord([13, 26], 'W')).toEqual([12, 26])
    expect(getNextMapCoord([10, 20], 'S')).toEqual([10, 19])
  })
})

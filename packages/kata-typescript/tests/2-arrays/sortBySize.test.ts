import { describe, it, expect } from 'vitest'
import { sortBySize } from '../../functions/2-arrays'

describe('sortBySize', () => {
  it('returns a new array of the same length (not the original)', () => {
    const arr = ['hello', 'world']
    const actual = sortBySize(arr)

    expect(Array.isArray(actual)).toBe(true)
    expect(actual).toHaveLength(arr.length)

    expect(actual).not.toBe(arr)
  })

  it('returns the strings in the correct order', () => {
    const words = [
      'bumbling',
      'semiprecious',
      'discombobulated',
      'aaaaaa',
      'giraffe',
      'numbskull',
    ]
    const expected = [
      'aaaaaa',
      'giraffe',
      'bumbling',
      'numbskull',
      'semiprecious',
      'discombobulated',
    ]

    const actual = sortBySize(words)

    expect(actual).toHaveLength(words.length)
    expect(actual).toEqual(expected)
  })
})

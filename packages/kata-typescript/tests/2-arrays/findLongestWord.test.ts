import { findLongestWord } from '../../functions/2-arrays'

describe('findLongestWord', () => {
  it('returns a string', () => {
    expect(typeof findLongestWord(['a', 'b', 'c'])).toBe('string')
  })

  it('returns the longest word in the array', () => {
    const words = [
      'bumbling',
      'semiprecious',
      'discombobulated',
      'aaaaaa',
      'giraffe',
      'numbskull',
    ]
    expect(findLongestWord(words)).toBe('discombobulated')
  })
})

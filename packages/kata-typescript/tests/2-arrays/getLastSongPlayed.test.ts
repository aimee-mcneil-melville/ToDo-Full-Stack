import { describe, it, expect } from 'vitest'
import { getLastSongPlayed } from '../../functions/2-arrays'

describe('getLastSongPlayed', () => {
  it('returns a string', () => {
    expect(typeof getLastSongPlayed(['song1', 'song2', 'song3'])).toBe('string')
  })

  it('returns the last item in the array', () => {
    const songs = [
      'Flowers by Miley Cyrus',
      'Resolution by Matt Corby',
      'Green and Gold by Lianne La Havas',
      'The Way Things Were by Isaac Waddington',
      'Breezeblocks by Alt-j',
    ]
    expect(getLastSongPlayed(songs)).toBe('Breezeblocks by Alt-j')
  })
})

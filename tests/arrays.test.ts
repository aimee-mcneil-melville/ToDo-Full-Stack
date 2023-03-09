import * as arrays from '../files/2-arrays'

describe('getNextNum', () => {
  it('returns a number', () => {
    expect(typeof arrays.getNextNum([1, 2, 3])).toBe('number')
  })

  it('returns the first item in the array', () => {
    expect(arrays.getNextNum([1, 2, 3])).toBe(1)
    expect(arrays.getNextNum([4, 5, 6])).toBe(4)
  })
})

describe('getLastSongPlayed', () => {
  it('returns a string', () => {
    expect(typeof arrays.getLastSongPlayed(['song1', 'song2', 'song3'])).toBe('string')
  })

  it('returns the last item in the array', () => {
    const songs = ['Flowers by Miley Cyrus', 'Resolution by Matt Corby', 'Green and Gold by Lianne La Havas', 'The Way Things Were by Isaac Waddington', 'Breezeblocks by Alt-j']
    expect(arrays.getLastSongPlayed(songs)).toBe('Breezeblocks by Alt-j')
  })
})

describe('findLongestWord', () => {
  it('returns a string', () => {
    expect(typeof arrays.findLongestWord(['a', 'b', 'c'])).toBe('string')
  })

  it('returns the longest word in the array', () => {
    const words = ['bumbling', 'semiprecious', 'discombobulated', 'aaaaaa', 'giraffe', 'numbskull']
    expect(arrays.findLongestWord(words)).toBe('discombobulated')
  })
})

describe('fillArrayWithBees', () => {
  it('returns an array of the correct length', () => {
    const actual = arrays.fillArrayWithBees(1)
    expect(Array.isArray(actual)).toBe(true)
    expect(actual.length).toBe(1)

    expect(arrays.fillArrayWithBees(5).length).toBe(5)
    expect(arrays.fillArrayWithBees(10).length).toBe(10)
  })

  it('returns an array of strings', () => {
    const arr = arrays.fillArrayWithBees(2)
    expect(typeof arr[0]).toBe('string')
    expect(typeof arr[1]).toBe('string')
  })

  it('returns an array of "buzz" strings', () => {
    const arr = arrays.fillArrayWithBees(3)
    expect(arr).toEqual(['buzz', 'buzz', 'buzz'])
  })
})

describe('sortBySize', () => {
  it('returns a new array of the same length (not the original)', () => {
    const arr = ['hello', 'world']
    const actual = arrays.sortBySize(arr)

    expect(Array.isArray(actual)).toBe(true)
    expect(actual.length).toBe(arr.length)

    expect(actual).not.toBe(arr)
  })

  it('returns the strings in the correct order', () => {
    const words = ['bumbling', 'semiprecious', 'discombobulated', 'aaaaaa', 'giraffe', 'numbskull']
    const expected = ['aaaaaa', 'giraffe', 'bumbling', 'numbskull', 'semiprecious', 'discombobulated']

    const actual = arrays.sortBySize(words)

    expect(actual.length).toBe(words.length)
    expect(actual).toEqual(expected)
  })
})

describe('sumStringsAndNumbers (UNION)', () => {
  it('returns a number', () => {
    expect(typeof arrays.sumStringsAndNumbers(['2', 1, '43', 2])).toBe('number')
  })

  it('returns the sum of all numbers in the array', () => {
    const arr = ['2', 1, '43', 2]
    expect(arrays.sumStringsAndNumbers(arr)).toBe(48)

    const arr2 = ['2', 1, '43', 2, 98, '100']
    expect(arrays.sumStringsAndNumbers(arr2)).toBe(246)
  })
})

describe('removeEmptySpots (UNION)', () => {
  it('returns a new array', () => {
    const arr = ['hello', null, 'world']
    const actual = arrays.removeEmptySpots(arr)

    expect(Array.isArray(actual)).toBe(true)
    expect(actual).not.toBe(arr)
  })

  it('returns an array with no empty spots', () => {
    const arr = ['hello', null, 'world']
    const actual = arrays.removeEmptySpots(arr)

    expect(actual.length).toBe(2)
    expect(actual).toEqual(['hello', 'world'])

    const arr2 = [null, null, null, null, null, null, null]
    const actual2 = arrays.removeEmptySpots(arr2)

    expect(actual2.length).toBe(0)
    expect(actual2).toEqual([])
  })
})

describe('generateUserName (TUPLE)', () => {
  it('returns a string', () => {
    expect(typeof arrays.generateUserName(['John', 'Smith', 1990])).toBe('string')
  })

  it('returns a username in the correct format', () => {
    const details: [string, string, number] = ['Ada', 'Lovelace', 1815]
    expect(arrays.generateUserName(details)).toBe('lovelacead_1815')
  })
})

describe('getNextMapCoord (TUPLE and ALIAS)', () => {
  it('returns a tuple of the correct length', () => {
    const actual = arrays.getNextMapCoord([1, 2], 'N')
    expect(Array.isArray(actual)).toBe(true)
    expect(actual.length).toBe(2)
  })

  it('returns a tuple with the correct values', () => {
    expect(arrays.getNextMapCoord([42, 12], 'N')).toEqual([42, 13])
    expect(arrays.getNextMapCoord([1, 2], 'E')).toEqual([2, 2])
    expect(arrays.getNextMapCoord([13, 26], 'W')).toEqual([12, 26])
    expect(arrays.getNextMapCoord([10, 20], 'S')).toEqual([10, 19])
  })
})
  
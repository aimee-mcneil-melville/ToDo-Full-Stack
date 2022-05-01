const { capitalise, validateDay } = require('./helpers')

describe('capitalise', () => {
  test('returns a capitalised string', () => {
    const expected = 'Thursday'
    const actual = capitalise('thursday')
    expect(actual).toBe(expected)
  })

  test('returns an empty string if name parameter is not a string', () => {
    const expected = ''
    const actual = capitalise(42)
    expect(actual).toBe(expected)
  })

  test('returns an empty string if name parameter is an empty string', () => {
    const expected = ''
    const actual = capitalise('')
    expect(actual).toBe(expected)
  })
})

describe('validateDay', () => {
  // test('returns the day if it is in the list', () => {
  //   const expected = 'saturday'
  //   const actual = validateDay('saturday')
  //   expect(actual).toBe(expected)
  // })

  test('returns a lowercase day if it is in the days parameter', () => {
    const expected = 'saturday'
    const actual = validateDay('saturday')
    expect(actual).toBe(expected)
  })

  test('returns the first day from the days parameter if day is not in the days parameter', () => {
    const expected = 'friday'
    const actual = validateDay('tuesday')
    expect(actual).toBe(expected)
  })

  test.todo('returns "friday" if days parameter is not provided')

  // TODO: Implement this functionality in helpers.js
  test.todo('throws an error if the days parameter is not an array of strings')
})

const { capitalise, validateDay } = require('../routes/helpers')

describe('capitalise', () => {
  test('returns a capitalised string', () => {
    const expected = 'Thursday'
    const actual = capitalise('thursday')
    expect(actual).toBe(expected)
  })

  test('returns an empty string if name argument is not a string', () => {
    const expected = ''
    const actual = capitalise(42)
    expect(actual).toBe(expected)
  })

  test('returns an empty string if name argument is an empty string', () => {
    const expected = ''
    const actual = capitalise('')
    expect(actual).toBe(expected)
  })
})

describe('validateDay', () => {
  test("returns the day if it exists in the supplied 'days' array", () => {
    const expected = 'tuesday'
    const actual = validateDay('tuesday', ['monday', 'tuesday', 'wednesday'])
    expect(actual).toBe(expected)
  })

  test("returns the first day from the supplied 'days' array if 'day' is not in that array", () => {
    const expected = 'monday'
    const actual = validateDay('thursday', ['monday', 'tuesday', 'wednesday'])
    expect(actual).toBe(expected)
  })

  test("returns the day from 'eventDays' if 'day' exists in 'eventDays' and no 'days' argument is provided", () => {
    const expected = 'saturday'
    const actual = validateDay('saturday')
    expect(actual).toBe(expected)
  })

  test("returns 'friday' if 'day' does not exist in 'eventDays' and no 'days' argument is provided", () => {
    const expected = 'friday'
    const actual = validateDay('wednesday')
    expect(actual).toBe(expected)
  })

  // Note that neither my test nor my solution cover all scenarios, can you improve them?
  test("returns the matching lowercase day if 'day' is uppercase", () => {
    const expected = 'tuesday'
    const actual = validateDay('Tuesday', ['Monday', 'Tuesday', 'Wednesday'])
    expect(actual).toBe(expected)
  })

  test('throws an error if the days argument is not an array of strings', () => {
    expect(() => validateDay('wednesday', ['cat', 'dog', 42])).toThrow(
      'days is not an array of strings'
    )
  })
})

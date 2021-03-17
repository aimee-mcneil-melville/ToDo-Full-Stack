const filterStringsWithCommas = require('../utilities').filterStringsWithCommas

const randomStrings = require('../data/random-strings')

test('filterStringsWithCommas returns true if there is a comma present', () => {
  const expected = true
  const actual = filterStringsWithCommas('hello, world')
  expect(actual).toBe(expected)
})

test('filterStringsWithCommas returns false if there is no comma present', () => {
  const expected = false
  const actual = filterStringsWithCommas('hello world')
  expect(actual).toBe(expected)
})

test('filter, when using filterStringsWithCommas, returns an array with the correct number of commas', () => {
  const expected = 62
  const stringsWithCommas = randomStrings.filter(filterStringsWithCommas) || []
  expect(stringsWithCommas.length).toBe(expected)
})

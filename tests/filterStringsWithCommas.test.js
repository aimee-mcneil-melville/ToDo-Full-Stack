const filter = require('../utilities').filter
const filterStringsWithCommas = require('../utilities').filterStringsWithCommas

const randomStrings = require('../data/random-strings')

test('filter and filterStringsWithCommas returns the correct number of commas', () => {
  const expected = 62
  const stringsWithCommas = filter(randomStrings, filterStringsWithCommas) || []
  expect(stringsWithCommas).toHaveLength(expected)
})

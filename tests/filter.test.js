const filter = require('../utilities').filter
const isEmail = require('../utilities').isEmail

const randomStrings = require('../data/random-strings')

test('filter and isEmail returns the correct number of emails', () => {
  const expected = 44
  const actual = filter(randomStrings, isEmail) || []
  expect(actual.length).toBe(expected)
})


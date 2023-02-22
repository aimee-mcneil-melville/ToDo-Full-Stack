const filterStringsWithCommas = require('../utilities').filterStringsWithCommas

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

test('example showing how to use filterStringsWithCommas with the array filter method to pull all the strings in an array containing commas', () => {
  const input = [
    'attack feet behind the couch destroy couch flop over',
    'give attitude,hide when guests come over',
    'hopped up on goofballs - hunt anything that moves!',
    'intently,stare,at,the,same,spot',
    'make muffins;flop over',
    'rub face on everything sweet',
    'beast under,the bed',
  ]

  const expected = [
    'give attitude,hide when guests come over',
    'intently,stare,at,the,same,spot',
    'beast under,the bed',
  ]

  // Note that we are passing `filterStringsWithCommas` into `input.filter`,
  // rather than calling it directly.
  // Hint: familiarise yourself with `Array.prototype.filter()` before making
  // changes to your function!
  const actual = input.filter(filterStringsWithCommas)
  expect(actual).toEqual(expected)
})

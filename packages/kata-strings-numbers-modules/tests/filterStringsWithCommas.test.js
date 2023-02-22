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
    '5942 Kenyon Drive',
    'in,esse,XOXO,intelligentsia',
    '1666',
    '2015-11-15 04:30:11 +1300',
    '1211-1221-1234-2201',
    'heirloom,ut,umami,microdosing',
    'Helmer Kassulke DVM',
    'raphaelle@langoshreichel.biz',
    '60.40.31.228',
    '(482) 566-8710 x45067',
    'carry,reiciendis,soluta,consectetur',
  ]

  const expected = [
    'in,esse,XOXO,intelligentsia',
    'heirloom,ut,umami,microdosing',
    'carry,reiciendis,soluta,consectetur',
  ]

  // Note that we are passing `filterStringsWithCommas` into `input.filter`,
  // rather than calling it directly.
  // Hint: familiarise yourself with `Array.prototype.filter()` before making
  // changes to your function!
  const actual = input.filter(filterStringsWithCommas)
  expect(actual).toEqual(expected)
})

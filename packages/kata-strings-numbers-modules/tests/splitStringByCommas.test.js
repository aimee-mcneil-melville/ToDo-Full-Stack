const splitStringByCommas = require('../utilities').splitStringByCommas

test('splitStringByCommas will split a string at each comma', () => {
  const expected = ['hello', 'world']
  const actual = splitStringByCommas('hello,world')
  expect(actual).toEqual(expected)
})

test('splitStringByCommas will not split a string if it has no commas', () => {
  const expected = ['hello world']
  const actual = splitStringByCommas('hello world')
  expect(actual).toEqual(expected)
})

test('example showing how to use splitStringByCommas with the array map method, to split strings in an array', () => {
  const input = [
    '5942 Kenyon Drive',
    'in,esse,XOXO,intelligentsia',
    '1666',
    'heirloom,ut,umami,microdosing',
    'Helmer Kassulke DVM',
  ]

  const expected = [
    ['5942 Kenyon Drive'],
    ['in', 'esse', 'XOXO', 'intelligentsia'],
    ['1666'],
    ['heirloom', 'ut', 'umami', 'microdosing'],
    ['Helmer Kassulke DVM'],
  ]

  // Note that we are passing `splitStringByCommas` into `input.map`, rather
  // than calling it directly.
  // Hint: familiarise yourself with `Array.prototype.map()` before making
  // changes to your function!
  const mapped = input.map(splitStringByCommas)
  expect(mapped).toEqual(expected)
})

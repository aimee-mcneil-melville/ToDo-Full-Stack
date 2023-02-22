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
    'attack feet behind the couch destroy couch flop over',
    'give attitude,hide when guests come over',
    'hopped up on goofballs - hunt anything that moves!',
    'intently,stare,at,the,same,spot',
    'make muffins;flop over',
    'rub face on everything sweet',
    'beast under,the bed',
  ]

  const expected = [
    ['attack feet behind the couch destroy couch flop over'],
    ['give attitude', 'hide when guests come over'],
    ['hopped up on goofballs - hunt anything that moves!'],
    ['intently', 'stare', 'at', 'the', 'same', 'spot'],
    ['make muffins;flop over'],
    ['rub face on everything sweet'],
    ['beast under', 'the bed'],
  ]

  // Note that we are passing `splitStringByCommas` into `input.map`, rather
  // than calling it directly.
  // Hint: familiarise yourself with `Array.prototype.map()` before making
  // changes to your function!
  const mapped = input.map(splitStringByCommas)
  expect(mapped).toEqual(expected)
})

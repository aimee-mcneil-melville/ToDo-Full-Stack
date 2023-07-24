import { test, expect } from 'vitest'
import { splitStringByCommas } from '../utilities.js'

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

test('splitStringByCommas successfully splits different strings', () => {
  const randomStrings = [
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

  // Note that we are passing `splitStringByCommas` into `randomStrings.map`
  const mapped = randomStrings.map(splitStringByCommas)
  expect(mapped).toEqual(expected)
})

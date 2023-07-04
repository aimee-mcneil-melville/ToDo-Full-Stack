import { test, expect } from 'vitest'
import { hasComma } from '../utilities.js'


test('hasComma returns true if there is a comma present', () => {
  const expected = true
  const actual = hasComma('hello, world')
  expect(actual).toBe(expected)
})

test('hasComma returns false if there is no comma present', () => {
  const expected = false
  const actual = hasComma('hello world')
  expect(actual).toBe(expected)
})

test('hasComma can be used successfully on different strings', () => {
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
    'give attitude,hide when guests come over',
    'intently,stare,at,the,same,spot',
    'beast under,the bed',
  ]

  // Note that we are passing `hasComma` into `randomStrings.filter`
  const actual = randomStrings.filter(hasComma)
  expect(actual).toEqual(expected)
})

import { test, expect } from 'vitest'
import * as kata from './kata.js'


test('replaceItemAtIndex replaces the correct item', () => {
  const alphabet = ['a', 'b', 'c', 'd', 'e']
  const expected = ['alpha', 'b', 'c', 'd', 'e']
  const actual = kata.replaceItemAtIndex(alphabet, 0, 'alpha')
  expect(actual).toEqual(expected)
  expect(actual).not.toBe(alphabet)
})

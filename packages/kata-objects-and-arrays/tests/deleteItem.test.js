import { test, expect } from 'vitest'
import * as kata from './kata.js'

test('deleteItem returns a new array without ALL instances of item', () => {
  const names = ['Aroha', 'Bob', 'Celia', 'Eleanor', 'Bob', 'Bob']
  const removed = 'Bob'

  const actual = kata.deleteItem(names, removed)

  expect(actual).not.toContain(removed)
  expect(actual).not.toBe(names)
})

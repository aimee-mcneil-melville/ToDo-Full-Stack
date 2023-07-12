import { test, expect } from 'vitest'
import * as kata from './kata.js'


test('makeArrayOfItem (SINGULAR) makes an array out of one item', () => {
  const expected = ['dog', 'dog', 'dog']
  const actual = kata.makeArrayOfItem('dog', 3)
  expect(actual).toEqual(expected)
})

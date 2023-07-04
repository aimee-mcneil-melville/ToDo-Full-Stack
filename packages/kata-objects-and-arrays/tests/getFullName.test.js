import { test, expect } from 'vitest'
import * as kata from './kata.js'

test('getFullName returns "<firstName> <LastName>"', () => {
  const expected = 'Rose Matafeo'
  const actual = kata.getFullName('Rose', 'Matafeo')
  expect(actual).toBe(expected)
})

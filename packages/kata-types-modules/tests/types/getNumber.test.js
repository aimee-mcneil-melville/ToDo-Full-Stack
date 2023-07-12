import * as types from '../../types.js'
import { test, expect } from 'vitest'

test('types.getNumber returns a number', function () {
  const expected = 'number'
  const actual = typeof types.getNumber()
  expect(actual).toBe(expected)
})

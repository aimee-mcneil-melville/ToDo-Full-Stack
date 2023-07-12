import * as types from '../../types.js'
import { test, expect } from 'vitest'

test('types.getFunction returns a function', function () {
  const expected = 'function'
  const actual = typeof types.getFunction()
  expect(actual).toBe(expected)
})

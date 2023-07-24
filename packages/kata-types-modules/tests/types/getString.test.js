import * as types from '../../types.js'
import { test, expect } from 'vitest'

test('types.getString returns a string', function () {
  const expected = 'string'
  const actual = typeof types.getString()
  expect(actual).toBe(expected)
})

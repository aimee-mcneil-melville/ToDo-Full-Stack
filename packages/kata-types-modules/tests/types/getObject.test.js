import * as types from '../../types.js'
import { test, expect } from 'vitest'

test('types.getObject returns an object', function () {
  const expected = 'object'
  const actual = typeof types.getObject()
  expect(actual).toBe(expected)
})

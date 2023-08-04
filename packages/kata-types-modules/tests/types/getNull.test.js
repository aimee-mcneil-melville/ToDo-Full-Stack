import * as types from '../../types.js'
import { test, expect} from 'vitest'

test('types.getNull returns null', function () {
  const expected = null
  const actual = types.getNull()
  expect(actual).toBe(expected)
})

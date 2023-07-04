import * as functions from '../../functions.js'
import { test, expect } from 'vitest'

// Write a filter implementation. Keep it uncomplicated, if you can!
test('functions.filter takes an array as the first parameter, a function as the second parameter, and only returns elements for which the function returns true', function () {
  const expected = [2, 4]
  function isEven(n) {
    return n % 2 === 0
  }
  const actual = functions.filter([1, 2, 3, 4], isEven)
  expect(actual).toEqual(expected)
})

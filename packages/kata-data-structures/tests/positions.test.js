import { test, expect } from 'vitest'
import { getFirst, getLast } from '../positions'

test('positions.getFirst gets the first item in an array', function () {
  // Arrange
  const alphabet = ['a', 'b', 'c', 'd', 'e']
  const expected = 'a'

  // Act
  const actual = getFirst(alphabet)

  // Assert
  expect(actual).toBe(expected)
})

test('positions.getLast gets the last item in a small array', function () {
  // Arrange
  const alphabet = ['a', 'b', 'c', 'd', 'e']
  const expected = 'e'

  // Act
  const actual = getLast(alphabet)

  // Assert
  expect(actual).toBe(expected)
})

test('positions.getLast gets the last item in a long array', function () {
  // Arrange
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]
  const expected = 'z'

  // Act
  const actual = getLast(alphabet)

  // Assert
  expect(actual).toBe(expected)
})

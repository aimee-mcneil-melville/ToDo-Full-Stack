const kata = require('../kata.js')

test('hasItem returns true if item is in array', () => {
  const arr = ['a', 1, null, true]
  const actual = kata.hasItem(arr, 'a')
  expect(actual).toBe(true)
})

test('hasItem returns false if item is not in array', () => {
  const arr = ['a', 1, null, true]
  const actual = kata.hasItem(arr, 'b')
  expect(actual).toBe(false)
})

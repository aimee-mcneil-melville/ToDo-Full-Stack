const kata = require('../kata.js')

test('deleteItemAtIndex returns a new array without an element', () => {
  const names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor' ]
  const removed = 'Celia'

  const actual = kata.deleteItemAtIndex(names, 2)

  expect(actual).not.toContain(removed)
  expect(actual).not.toBe(names)
})

test('deleteItem returns a new array without ALL instances of item', () => {
  const names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor', 'Bob', 'Bob' ]
  const removed = 'Bob'

  const actual = kata.deleteItem(names, removed)

  expect(actual).not.toContain(removed)
  expect(actual).not.toBe(names)
})


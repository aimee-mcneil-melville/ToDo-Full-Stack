const kata = require('../kata.js')

test('deleteItemAtIndex returns an array without an element', () => {
  const names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor' ]
  const removed = 'Celia'

  const actual = kata.deleteItemAtIndex(names, 2)

  expect(actual).not.toContain(removed)
  expect(actual).not.toBe(names)
})


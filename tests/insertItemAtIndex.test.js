const kata = require('../kata.js')

test('insertItemAtIndex inserts an element into the array', () => {
  const names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor' ]
  const toAdd = 'Dan'
  const actual = kata.insertItemAtIndex(names, toAdd, 3)
  expect(actual).toContain(toAdd)
  expect(actual).not.toBe(names)
})

const kata = require('../kata.js')

test('getItemAtIndex returns the correct item for an existing index', () => {
  const alphabet = ['a', 'b', 'c', 'd', 'e']
  const expected = 'd'
  const actual = kata.getItemAtIndex(alphabet, 3)
  expect(actual).toBe(expected)
})

test('getItemAtIndex returns a JavaScript Error for a non-existent index', () => {
  const alphabet = ['a', 'b', 'c', 'd', 'e']
  const expected = new Error()

  const actual = kata.getItemAtIndex(alphabet, 5)

  expect(actual).toEqual(expected)
})

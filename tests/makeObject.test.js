const kata = require('../kata.js')

test('makeObject makes objects', () => {
  const expected1 = { name: 'mix' }
  const actual1 = kata.makeObject('name', 'mix')
  expect(actual1).toEqual(expected1)

  const expected2 = { age: 32 }
  const actual2 = kata.makeObject('age', 32)
  expect(actual2).toEqual(expected2)
})

const kata = require('../kata.js')

test('returnErrorIfFalsy returns the correct Error when passed 0', () => {
  const expected = new Error('Oh no, an error!')
  const actual = kata.returnErrorIfFalsy(0)
  expect(actual).toEqual(expected)
})

test('returnErrorIfFalsy(1) is undefined', () => {
  const expected = undefined
  const actual = kata.returnErrorIfFalsy(1)
  expect(actual).toBe(expected)
})

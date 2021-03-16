const countIf = require('../utilities').countIf

const mixedArray = [1, '21', null, Date.now(), 5, {}, 42]

test('countIf can count the numbers in an array', () => {
  const checkerFunc = (thing) => typeof thing === 'number'
  const expected = 4
  const actual = countIf(mixedArray, checkerFunc)
  expect(actual).toBe(expected)
})

test('countIf can count the strings in an array', () => {
  const checkerFunc = (thing) => typeof thing === 'string'
  const expected = 1
  const actual = countIf(mixedArray, checkerFunc)
  expect(actual).toBe(expected)
})

test('countIf can count the objects in an array', () => {
  const checkerFunc = (thing) => typeof thing === 'object'
  const expected = 2
  const actual = countIf(mixedArray, checkerFunc)
  expect(actual).toBe(expected)
})

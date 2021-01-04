const countIf = require('../utilities').countIf

const mixedArray = [1, '21', null, Date.now(), 5, {}, 42]

function isType (type) {
  // eslint-disable-next-line valid-typeof
  return (thing) => typeof thing === type
}

test('countIf can count the numbers in an array', () => {
  const expected = 4
  const actual = countIf(mixedArray, isType('number'))
  expect(actual).toBe(expected)
})

test('countIf can count the strings in an array', () => {
  const expected = 1
  const actual = countIf(mixedArray, isType('string'))
  expect(actual).toBe(expected)
})

test('countIf can count the objects in an array', () => {
  const expected = 2
  const actual = countIf(mixedArray, isType('object'))
  expect(actual).toBe(expected)
})

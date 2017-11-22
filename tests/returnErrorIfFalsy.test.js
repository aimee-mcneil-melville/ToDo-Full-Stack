var kata = require('../kata.js')

test('returnErrorIfFalsy returns the correct Error when passed 0', function () {
  var expected = new Error('Oh no, an error!')
  var actual = kata.returnErrorIfFalsy(0)
  expect(actual).toEqual(expected)
})

test('returnErrorIfFalsy(1) is undefined', function () {
  var expected = undefined
  var actual = kata.returnErrorIfFalsy(1)
  expect(actual).toBe(expected)
})


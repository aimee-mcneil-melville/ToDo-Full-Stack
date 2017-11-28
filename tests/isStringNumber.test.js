const isStringNumber = require('../utilities').isStringNumber

test('"42" is a string number', () => {
  const expected = true
  const actual = isStringNumber('42')
  expect(actual).toBe(expected)
})

test('isStringNumber does not give a false positive', () => {
  const expected = false
  const actual = isStringNumber('jsksk')
  expect(actual).toBe(expected)
})

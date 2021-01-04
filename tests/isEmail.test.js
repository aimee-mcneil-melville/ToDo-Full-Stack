const isEmail = require('../utilities').isEmail

test('isEmail detects an email address', () => {
  const expected = true
  const actual = isEmail('user@company.com')
  expect(actual).toBe(expected)
})

test('isEmail does not give a false positive without domain', () => {
  const expected = false
  const actual = isEmail('3333@')
  expect(actual).toBe(expected)
})

test('isEmail does not give a false positive without user', () => {
  const expected = false
  const actual = isEmail('johnny.b.goode')
  expect(actual).toBe(expected)
})

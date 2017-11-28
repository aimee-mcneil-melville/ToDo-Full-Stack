const map = require('../utilities').map

test('filter and isEmail returns the correct number of emails', () => {
  const someNumbers = [2, 4, 6]
  const expectedNumbers = [4, 8, 12]
  const timesTwo = num => num * 2
  const actualNumbers = map(someNumbers, timesTwo) || []

  for (let i = 0; i < expectedNumbers.length; i++) {
    expect(expectedNumbers[i]).toBe(actualNumbers[i])
  }
})


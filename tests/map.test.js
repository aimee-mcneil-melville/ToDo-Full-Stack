const map = require('../utilities').map

test('map returns the correct array of values', () => {
  const someNumbers = [2, 4, 6]
  const expectedNumbers = [4, 8, 12]
  const timesTwo = num => num * 2
  const actualNumbers = map(someNumbers, timesTwo) || []

  for (let i = 0; i < expectedNumbers.length; i++) {
    expect(expectedNumbers[i]).toBe(actualNumbers[i])
  }
})

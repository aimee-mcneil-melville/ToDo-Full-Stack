const isOutOfBounds = require('../isOutOfBounds')

test('isOutOfBounds', () => {
  const testArray = [1, 2, 3]
  const expecteds = {
    '-2': true,
    '-1': true,
    0: false,
    1: false,
    2: false,
    3: true,
    4: true,
  }

  Object.keys(expecteds).forEach((input) => {
    const expected = expecteds[input]
    const actual = isOutOfBounds(input, testArray)

    expect(actual).toBe(expected)
  })
})

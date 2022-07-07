const isOverPopulated = require('../isOverPopulated')

test('isOverPopulated normal cases', () => {
  const expecteds = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
  }

  Object.keys(expecteds).forEach((input) => {
    const expected = expecteds[input]
    const actual = isOverPopulated(input)

    expect(actual).toBe(expected)
  })
})

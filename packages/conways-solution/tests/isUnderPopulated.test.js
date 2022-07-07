const isUnderPopulated = require('../isUnderPopulated')

test('isUnderPopulated normal cases', () => {
  const expecteds = {
    0: true,
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  }

  Object.keys(expecteds).forEach((input) => {
    const expected = expecteds[input]
    const actual = isUnderPopulated(input)

    expect(actual).toBe(expected)
  })
})

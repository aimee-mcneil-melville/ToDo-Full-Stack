const filter = require('../utilities').filter

test('filter returns an array containing only values that pass the specified condition', () => {
  const animals = [
    'dragon',
    'orangutan',
    'lizard',
    'dog',
    'kiwi',
    'dingo',
    'eagle',
    'dinosaur'
  ]

  const condition = animal => animal.startsWith('d')

  const actual = filter(animals, condition)

  expect(actual).toEqual([
    'dragon',
    'dog',
    'dingo',
    'dinosaur'
  ])
})

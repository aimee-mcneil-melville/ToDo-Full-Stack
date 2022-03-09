/* global test, expect */

const duel = require('./duel.js')

// testing you're own functions from another project
test('basic duel with a dark lord', function () {
  // fairly simple - expecting a response from a simple function
  expect(duel.disarmOnly()).toBe('EXPELLIARMUS!')

  // testing result of function with argument
  expect(duel.defendYourself('Avada Kedevara')).toBe(duel.disarmOnly())

  // Arrange / Act / Asset
  const expected = 'Stupefy!' // arrange
  const actual = duel.defendYourself('crucio') // act
  expect(actual).toBe(expected) // assert
})

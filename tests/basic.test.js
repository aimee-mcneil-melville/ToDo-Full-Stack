/* global test, expect */

test('test some basic js', () => {
  expect(2 + 2 === 4).toBeTruthy()
  expect(3 * 3).toBe(9)

  const result = ['dave', 'sharon']
  result.push('flora')
  expect(result).toEqual(['dave', 'sharon', 'flora'])
})

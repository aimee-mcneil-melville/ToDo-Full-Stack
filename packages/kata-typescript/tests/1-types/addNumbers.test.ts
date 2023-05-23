import { addNumbers } from '../../functions/1-types'

describe('addNumbers', () => {
  it('returns a number', () => {
    expect(typeof addNumbers(1, 2)).toBe('number')
  })

  it('returns the sum of the two parameters', () => {
    expect(addNumbers(1, 2)).toBe(3)
    expect(addNumbers(5, 5)).toBe(10)
  })
})

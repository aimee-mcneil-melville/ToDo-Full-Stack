import { sumMatchingType } from '../../functions/1-types'

describe('sumMatchingType (UNION TYPE PARAMS & RETURN)', () => {
  it('returns a number when both parameters are numbers', () => {
    expect(typeof sumMatchingType(1, 2)).toBe('number')
    expect(sumMatchingType(1, 2)).toBe(3)
  })

  it('returns a string when both parameters are strings', () => {
    expect(typeof sumMatchingType('1', '2')).toBe('string')
    expect(sumMatchingType('1', '2')).toBe('3')
  })

  it('returns a string when one parameter is a number and the other is a string', () => {
    expect(typeof sumMatchingType(1, '2')).toBe('string')
    expect(sumMatchingType(1, '2')).toBe('3')
  })
})

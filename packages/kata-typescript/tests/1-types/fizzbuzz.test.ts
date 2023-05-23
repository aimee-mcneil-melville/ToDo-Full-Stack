import { fizzbuzz } from '../../functions/1-types'

describe('fizzbuzz (UNION RETURN TYPE)', () => {
  it('returns a string when the parameter is divisible by 3 and/or 5', () => {
    expect(typeof fizzbuzz(3)).toBe('string')
    expect(typeof fizzbuzz(5)).toBe('string')
    expect(typeof fizzbuzz(15)).toBe('string')
  })

  it('returns a number when the parameter is not divisible by 3 and/or 5', () => {
    expect(typeof fizzbuzz(1)).toBe('number')
    expect(typeof fizzbuzz(2)).toBe('number')
    expect(typeof fizzbuzz(4)).toBe('number')
  })

  it('returns the appropriate fizz/buzz response, or original number', () => {
    expect(fizzbuzz(1)).toBe(1)
    expect(fizzbuzz(2)).toBe(2)
    expect(fizzbuzz(3)).toBe('fizz')
    expect(fizzbuzz(5)).toBe('buzz')
    expect(fizzbuzz(7)).toBe(7)
    expect(fizzbuzz(11)).toBe(11)
    expect(fizzbuzz(15)).toBe('fizzbuzz')
  })
})

import { sumStringsAndNumbers } from '../../functions/2-arrays'

describe('sumStringsAndNumbers (UNION)', () => {
  it('returns a number', () => {
    expect(typeof sumStringsAndNumbers(['2', 1, '43', 2])).toBe('number')
  })

  it('returns the sum of all numbers in the array', () => {
    const arr = ['2', 1, '43', 2]
    expect(sumStringsAndNumbers(arr)).toBe(48)

    const arr2 = ['2', 1, '43', 2, 98, '100']
    expect(sumStringsAndNumbers(arr2)).toBe(246)
  })
})

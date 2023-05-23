import { getNextNum } from '../../functions/2-arrays'

describe('getNextNum', () => {
  it('returns a number', () => {
    expect(typeof getNextNum([1, 2, 3])).toBe('number')
  })

  it('returns the first item in the array', () => {
    expect(getNextNum([1, 2, 3])).toBe(1)
    expect(getNextNum([4, 5, 6])).toBe(4)
  })
})

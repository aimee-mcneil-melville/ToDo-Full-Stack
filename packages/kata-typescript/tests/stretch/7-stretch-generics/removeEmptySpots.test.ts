import { removeEmptySpots } from '../../../functions/7-stretch-generics'

describe('removeEmptySpots', () => {
  it('should return an array', () => {
    expect(Array.isArray(removeEmptySpots([1, 2, null, 3]))).toBe(true)
  })

  it('should return an array with no empty spots', () => {
    expect(removeEmptySpots([1, 2, null, 3])).toEqual([1, 2, 3])
    expect(removeEmptySpots([null, 'hello', null, null, 'world'])).toEqual([
      'hello',
      'world',
    ])
  })
})

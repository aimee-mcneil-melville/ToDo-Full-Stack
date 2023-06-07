import { getArrayOfBees } from '../../../functions/7-stretch-generics'

describe('getArrayOfBees', () => {
  it('should return an array', () => {
    expect(Array.isArray(getArrayOfBees(3))).toBe(true)
  })

  it('should return an array of the specified length', () => {
    expect(getArrayOfBees(3)).toHaveLength(3)
  })

  it('should return an empty array if the number is less than 1', () => {
    expect(getArrayOfBees(-3)).toHaveLength(0)
  })

  it('should return an array of bees', () => {
    expect(getArrayOfBees(3)).toEqual(['bee', 'bee', 'bee'])
  })
})

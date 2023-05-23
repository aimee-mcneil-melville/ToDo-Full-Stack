import { fillArrayWithAnything } from '../../../functions/7-stretch-generics'

describe('fillArrayWithAnything', () => {
  it('should return an array', () => {
    expect(Array.isArray(fillArrayWithAnything('hello', 3))).toBe(true)
  })

  it('should return an array of the specified length', () => {
    expect(fillArrayWithAnything('hello', 3)).toHaveLength(3)
  })

  it('should return an empty array if the number is less than 1', () => {
    expect(fillArrayWithAnything('hello', -3)).toHaveLength(0)
  })

  it('should return an array of the specified value', () => {
    expect(fillArrayWithAnything('hello', 3)).toEqual([
      'hello',
      'hello',
      'hello',
    ])
  })

  it('should return an array of the specified value and type', () => {
    expect(fillArrayWithAnything(0, 6)).toEqual([0, 0, 0, 0, 0, 0])
  })
})

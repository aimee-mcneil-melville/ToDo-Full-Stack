import { getCapitaliseFn } from '../../../functions/4-stretch-function-type'

describe('getCapitaliseFn', () => {
  it('returns a function', () => {
    expect(typeof getCapitaliseFn()).toBe('function')
  })

  it('returns a function that returns a string', () => {
    expect(typeof getCapitaliseFn()('')).toBe('string')
  })

  it('returns a function that returns the string with the first letter capitalised', () => {
    expect(getCapitaliseFn()('hello')).toBe('Hello')
    expect(getCapitaliseFn()('world')).toBe('World')
    expect(getCapitaliseFn()('hello world')).toBe('Hello world')
  })
})

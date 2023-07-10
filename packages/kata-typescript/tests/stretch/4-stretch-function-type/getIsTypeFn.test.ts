import { describe, it, expect } from 'vitest'
import { getIsTypeFn } from '../../../functions/4-stretch-function-type'

describe('getIsTypeFn', () => {
  it('returns a function', () => {
    expect(typeof getIsTypeFn('string')).toBe('function')
  })

  it('returns a function that returns a boolean', () => {
    expect(typeof getIsTypeFn('string')('')).toBe('boolean')
  })

  it('returns a function that returns true if the value is the specified type', () => {
    expect(getIsTypeFn('string')('')).toBe(true)
    expect(getIsTypeFn('number')(1)).toBe(true)
    expect(getIsTypeFn('boolean')(true)).toBe(true)
    expect(getIsTypeFn('object')({})).toBe(true)
    expect(getIsTypeFn('function')(() => {})).toBe(true)
    expect(getIsTypeFn('undefined')(undefined)).toBe(true)
  })

  it('returns a function that returns false if the value is not the specified type', () => {
    expect(getIsTypeFn('string')(1)).toBe(false)
    expect(getIsTypeFn('number')('')).toBe(false)
    expect(getIsTypeFn('boolean')({})).toBe(false)
    expect(getIsTypeFn('object')(() => {})).toBe(false)
    expect(getIsTypeFn('function')(undefined)).toBe(false)
    expect(getIsTypeFn('undefined')(null)).toBe(false)
  })
})

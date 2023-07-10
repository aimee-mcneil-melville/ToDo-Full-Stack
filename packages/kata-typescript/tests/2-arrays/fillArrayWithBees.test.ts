import { describe, it, expect } from 'vitest'
import { fillArrayWithBees } from '../../functions/2-arrays'

describe('fillArrayWithBees', () => {
  it('returns an array of the correct length', () => {
    const actual = fillArrayWithBees(1)
    expect(Array.isArray(actual)).toBe(true)
    expect(actual).toHaveLength(1)

    expect(fillArrayWithBees(5)).toHaveLength(5)
    expect(fillArrayWithBees(10)).toHaveLength(10)
  })

  it('returns an array of strings', () => {
    const arr = fillArrayWithBees(2)
    expect(typeof arr[0]).toBe('string')
    expect(typeof arr[1]).toBe('string')
  })

  it('returns an array of "buzz" strings', () => {
    const arr = fillArrayWithBees(3)
    expect(arr).toEqual(['buzz', 'buzz', 'buzz'])
  })
})

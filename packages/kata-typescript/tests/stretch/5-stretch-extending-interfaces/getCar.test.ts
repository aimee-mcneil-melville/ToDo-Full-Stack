import { describe, it, expect } from 'vitest'
import { getCar } from '../../../functions/5-stretch-extending-interfaces'

describe('getCar', () => {
  it('getCars returns a Car', () => {
    const expected = {
      make: 'Honda',
      model: 'Jazz',
      year: 2003,
      doors: 5,
    }

    expect(getCar('Honda', 'Jazz', 2003, 5)).toEqual(expected)
  })
})

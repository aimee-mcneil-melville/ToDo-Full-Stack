import { describe, it, expect } from 'vitest'
import { getTruck } from '../../../functions/5-stretch-extending-interfaces'

describe('getTruck', () => {
  it('getTrucks returns a Truck', () => {
    const expected = {
      make: 'Renault',
      model: 'T High',
      year: 2021,
      wheels: 18,
      trailer: true,
    }

    expect(getTruck('Renault', 'T High', 2021, 18, true)).toEqual(expected)
  })
})

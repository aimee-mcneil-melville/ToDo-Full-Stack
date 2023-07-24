import { describe, it, expect } from 'vitest'
import { getVehicle } from '../../../functions/5-stretch-extending-interfaces'

describe('getVehicle', () => {
  it('returns a Vehicle', () => {
    const expected = {
      make: 'Ford',
      model: 'F-150',
      year: 2019,
    }

    expect(getVehicle('Ford', 'F-150', 2019)).toEqual(expected)
  })
})

import { describe, it, expect } from 'vitest'
import { generateVehicles } from '../../../functions/5-stretch-extending-interfaces'

describe('generateVehicles', () => {
  it('returns an array of Vehicles', () => {
    const expected = [
      { make: 'Ford', model: 'F-150', year: 2019 },
      { make: 'Chevy', model: 'Camaro', year: 2020, doors: 2 },
      { make: 'Toyota', model: 'Prius', year: 2018, doors: 4 },
      {
        make: 'Harley-Davidson',
        model: 'Sportster',
        year: 2019,
        sidecar: true,
      },
      { make: 'Ford', model: 'F-150', year: 2019, wheels: 4, trailer: false },
    ]

    expect(generateVehicles()).toEqual(expected)
  })
})

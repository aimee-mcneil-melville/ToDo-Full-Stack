import { describe, it, expect } from 'vitest'
import { getMotorcycle } from '../../../functions/5-stretch-extending-interfaces'

describe('getMotorcycle', () => {
  it('getMotorcycles returns a Motorcycle', () => {
    const expected = {
      make: 'Triumph',
      model: 'Speed Twin',
      year: 1939,
      sidecar: true,
    }

    expect(getMotorcycle('Triumph', 'Speed Twin', 1939, true)).toEqual(expected)
  })
})

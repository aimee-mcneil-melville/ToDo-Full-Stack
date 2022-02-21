import { setLocation, SET_LOCATION } from './location'

describe('setLocation', () => {
  it('returns the correct action', () => {
    const location = {
      lat: 123,
      lon: -123,
    }
    const action = setLocation(location)
    expect(action.type).toBe(SET_LOCATION)
    expect(action.location.lon).toBe(-123)
  })
})

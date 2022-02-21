import { SET_LOCATION } from '../actions/location'
import locationReducer from './location'

describe('location reducer', () => {
  it('returns new location object on "SET_LOCATION"', () => {
    const oldState = {
      lat: 111,
      lon: 99,
    }
    const action = {
      type: SET_LOCATION,
      location: {
        lat: 123,
        lon: 123,
      },
    }
    const newState = locationReducer(oldState, action)
    expect(newState.lat).toBe(123)
    expect(newState).not.toBe(oldState)
  })

  it('returns old state on unknown action type', () => {
    const oldState = {
      lat: 111,
      lon: 99,
    }
    const action = {
      type: 'RANDOM_OTHER_ACTION',
    }
    const newState = locationReducer(oldState, action)
    expect(newState).toBe(oldState)
  })
})

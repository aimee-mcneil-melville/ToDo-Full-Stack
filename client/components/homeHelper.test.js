import { getUserLocation } from './homeHelper'
import { USER_LOCATION } from '../actions/user'
import { dispatch } from '../store'

jest.mock('../store')

afterEach(() => dispatch.mockClear())

describe('getUserLocation', () => {
  describe('when geolocation available', () => {
    const mockNavigator = {
      geolocation: {
        getCurrentPosition: (cbFunc) => {
          cbFunc({ coords: { latitude: 123, longitude: -123 } })
        }
      }
    }
    it('dispatches setUserLocation correctly', () => {
      expect.assertions(3)
      const mockSetLocationCallback = jest.fn(() => {
        const dispatchCall = dispatch.mock.calls[0][0]
        expect(dispatchCall.type).toBe(USER_LOCATION)
        expect(dispatchCall.location.latitude).toBe(123)
        expect(dispatchCall.location.longitude).toBe(-123)
      })
      getUserLocation(mockSetLocationCallback, mockNavigator)
    })
    it('calls setLocation callback correctly', () => {
      expect.assertions(2)
      const mockSetLocationCallback = jest.fn(({ userCoordinates }) => {
        expect(userCoordinates.lat).toBe(123)
        expect(userCoordinates.lon).toBe(-123)
      })
      getUserLocation(mockSetLocationCallback, mockNavigator)
    })
  })
  describe('when geolocation not available', () => {
    const mockNavigator = {}
    it('does not call dispatch nor the callback', () => {
      const mockSetLocationCallback = jest.fn()
      getUserLocation(mockSetLocationCallback, mockNavigator)
      expect(mockSetLocationCallback).not.toHaveBeenCalled()
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})

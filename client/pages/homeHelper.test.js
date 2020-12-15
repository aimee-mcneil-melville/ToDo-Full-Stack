import { getUserLocation, getGardenLocations } from './homeHelper'
import { USER_LOCATION } from '../actions/user'
import { CLEAR_WAITING } from '../actions/waiting'
import { getGardens } from '../api/gardens'
import { dispatch } from '../store'

jest.mock('../store')
jest.mock('../api/gardens')

afterEach(() => dispatch.mockClear())

describe('getUserLocation', () => {
  describe('-> when geolocation available', () => {
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
      const mockSetLocationCallback = jest.fn((userCoordinates) => {
        expect(userCoordinates.lat).toBe(123)
        expect(userCoordinates.lon).toBe(-123)
      })
      getUserLocation(mockSetLocationCallback, mockNavigator)
    })
  })

  describe('-> when geolocation not available', () => {
    const mockNavigator = {}
    it('does not call dispatch nor the callback', () => {
      const mockSetLocationCallback = jest.fn()
      getUserLocation(mockSetLocationCallback, mockNavigator)
      expect(mockSetLocationCallback).not.toHaveBeenCalled()
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})

describe('getGardenLocations', () => {
  describe('-> on getGardens success', () => {
    it('dispatches waiting actions correctly', () => {
      getGardens.mockImplementation(() => Promise.resolve())
      const mockSetGardensCallback = jest.fn()
      const mockSetAddressesCallback = jest.fn()
      return getGardenLocations(mockSetGardensCallback, mockSetAddressesCallback)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_WAITING })
          return null
        })
    })

    it('calls state setting functions', () => {
      expect.assertions(4)
      getGardens.mockImplementation(() => Promise.resolve([{
        lat: 111,
        lon: -111,
        address: '111 One Lane'
      }, {
        lat: 222,
        lon: -222,
        address: '222 Two Lane'
      }]))
      const mockSetGardensCallback = jest.fn((gardensCoordinates) => {
        expect(gardensCoordinates[1].lon).toBe(-222)
        expect(gardensCoordinates).toHaveLength(2)
      })
      const mockSetAddressesCallback = jest.fn((addresses) => {
        expect(addresses).toHaveLength(2)
        expect(addresses[0]).toMatch('111 One')
      })
      return getGardenLocations(mockSetGardensCallback, mockSetAddressesCallback)
    })
  })

  describe('-> on getGardens rejection', () => {
    it('dispatches error correctly', () => {
      getGardens.mockImplementation(() => Promise.reject(new Error('mock error')))
      return getGardenLocations()
        .then(() => {
          expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
          return null
        })
    })
  })
})

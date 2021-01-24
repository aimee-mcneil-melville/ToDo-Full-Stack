import { getUserLocation, getGardenLocations } from './homeHelper'
import { SET_WAITING, CLEAR_WAITING } from '../actions/waiting'
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

    it('calls setLocation callback correctly if isMounted returns true', () => {
      expect.assertions(2)
      const mockSetLocationCallback = jest.fn((userCoordinates) => {
        expect(userCoordinates.lat).toBe(123)
        expect(userCoordinates.lon).toBe(-123)
      })
      function isMounted () {
        return true
      }
      getUserLocation(mockSetLocationCallback, isMounted, mockNavigator)
    })

    it('does not call setLocation callback if isMounted returns false', () => {
      const mockSetLocationCallback = jest.fn()
      function isMounted () {
        return false
      }
      getUserLocation(mockSetLocationCallback, isMounted, mockNavigator)
      expect(mockSetLocationCallback).not.toHaveBeenCalled()
    })
  })

  describe('-> when geolocation not available', () => {
    const mockNavigator = {}
    it('does not call the callback', () => {
      const mockSetLocationCallback = jest.fn()
      getUserLocation(mockSetLocationCallback, mockNavigator)
      expect(mockSetLocationCallback).not.toHaveBeenCalled()
    })
  })
})

describe('getGardenLocations', () => {
  describe('-> on getGardens success', () => {
    it('dispatches waiting actions correctly', () => {
      getGardens.mockImplementation(() => Promise.resolve())
      return getGardenLocations()
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
          expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_WAITING })
          return null
        })
    })

    it('returns correct locations object', () => {
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
      return getGardenLocations()
        .then(({ gardenCoords, addrs }) => {
          expect(gardenCoords[1].lon).toBe(-222)
          expect(gardenCoords).toHaveLength(2)
          expect(addrs).toHaveLength(2)
          expect(addrs[0]).toMatch('111 One')
          return null
        })
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

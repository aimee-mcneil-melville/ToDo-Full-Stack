import { getUserLocation, getGardenLocations } from './homeHelper'
import { SET_WAITING, CLEAR_WAITING } from '../../actions/waiting'
import { getState, dispatch } from '../../store'

jest.mock('../../store')

afterEach(() => dispatch.mockClear())

describe('getUserLocation', () => {
  describe('-> when location is in the store', () => {
    it('calls setCoords callback with stored location', () => {
      expect.assertions(2)
      getState.mockImplementation(() => {
        return {
          location: {
            lat: 321,
            lon: -321,
          },
        }
      })
      const setCoords = jest.fn((userCoordinates) => {
        expect(userCoordinates.lat).toBe(321)
        expect(userCoordinates.lon).toBe(-321)
      })
      getUserLocation(setCoords)
    })
  })

  describe('-> when location not in the store', () => {
    describe('-> when geolocation available', () => {
      const mockNavigator = {
        geolocation: {
          getCurrentPosition: (cbFunc) => {
            cbFunc({ coords: { latitude: 123, longitude: -123 } })
          },
        },
      }

      it('dispatches setLocation action correctly', () => {
        getState.mockImplementation(() => {
          return { location: { lat: null, lon: null } }
        })
        getUserLocation(
          () => {},
          () => false,
          mockNavigator
        )
        expect(dispatch.mock.calls[0][0].location.lat).toBe(123)
      })

      it('calls setCoords callback correctly if isMounted returns true', () => {
        getState.mockImplementation(() => {
          return { location: { lat: null, lon: null } }
        })
        expect.assertions(2)
        const setCoords = jest.fn((userCoordinates) => {
          expect(userCoordinates.lat).toBe(123)
          expect(userCoordinates.lon).toBe(-123)
        })
        function isMounted() {
          return true
        }
        getUserLocation(setCoords, isMounted, mockNavigator)
      })

      it('does not call setCoords callback if isMounted returns false', () => {
        getState.mockImplementation(() => {
          return { location: { lat: null, lon: null } }
        })
        const setCoords = jest.fn()
        function isMounted() {
          return false
        }
        getUserLocation(setCoords, isMounted, mockNavigator)
        expect(setCoords).not.toHaveBeenCalled()
      })
    })

    describe('-> when geolocation not available', () => {
      const mockNavigator = {}
      it('does not call the callback', () => {
        getState.mockImplementation(() => {
          return { location: { lat: null, lon: null } }
        })
        const setCoords = jest.fn()
        getUserLocation(setCoords, mockNavigator)
        expect(setCoords).not.toHaveBeenCalled()
      })
    })
  })
})

describe('getGardenLocations', () => {
  describe('-> on GET /gardens api call success', () => {
    it('dispatches waiting actions correctly', () => {
      function consume() {
        return Promise.resolve()
      }
      return getGardenLocations(consume).then(() => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
        expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_WAITING })
        return null
      })
    })

    it('returns correct locations object', () => {
      function consume() {
        return Promise.resolve({
          body: {
            gardens: [
              {
                lat: 111,
                lon: -111,
                address: '111 One Lane',
              },
              {
                lat: 222,
                lon: -222,
                address: '222 Two Lane',
              },
            ],
          },
        })
      }
      return getGardenLocations(consume).then(({ gardenCoords, addrs }) => {
        expect(gardenCoords[1].lon).toBe(-222)
        expect(gardenCoords).toHaveLength(2)
        expect(addrs).toHaveLength(2)
        expect(addrs[0]).toMatch('111 One')
        return null
      })
    })
  })

  describe('-> on GET /gardens api call rejection', () => {
    it('dispatches error correctly', () => {
      function consume() {
        return Promise.reject(new Error('mock error'))
      }
      return getGardenLocations(consume).then(() => {
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        return null
      })
    })
  })
})

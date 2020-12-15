import { getGarden } from './gardenHelper'
import { SET_WAITING, CLEAR_WAITING } from '../actions/waiting'
import { dispatch, getState } from '../store'
import { getGardenById } from '../api/gardens'

jest.mock('../store')
jest.mock('../api/gardens')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('getGarden', () => {
  describe('-> getGardenById success', () => {
    it('dispatches waiting correctly', () => {
      expect.assertions(2)
      getState.mockImplementation(() => ({ user: {} }))
      getGardenById.mockImplementation(() => Promise.resolve({}))
      const mockSetGarden = jest.fn()
      return getGarden(mockSetGarden)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
          expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_WAITING })
          return null
        })
    })
    it('calls setGarden with correct values', () => {
      expect.assertions(8)
      getState.mockImplementation(() => ({ user: { gardenId: 2 } }))
      getGardenById.mockImplementation((id) => {
        expect(id).toBe(2)
        return Promise.resolve({
          name: 'test garden',
          description: 'a rad test garden',
          url: 'cooltestgarden.com',
          events: [],
          address: 'cool place, nz',
          lat: 123,
          lon: -123
        })
      })
      const mockSetGarden = (garden) => {
        expect(garden.name).toBe('test garden')
        expect(garden.description).toMatch('rad test garden')
        expect(garden.url).toMatch('cooltestgarden')
        expect(garden.events).toHaveLength(0)
        expect(garden.address).toMatch('cool place')
        expect(garden.lat).toBe(123)
        expect(garden.lon).toBe(-123)
      }
      return getGarden(mockSetGarden)
    })
  })

  describe('-> getGardenById rejection', () => {
    it('dispatches error correctly', () => {
      getState.mockImplementation(() => ({ user: { gardenId: null } }))
      getGardenById.mockImplementation(() => Promise.reject(new Error('mock error')))
      return getGarden()
        .then(() => {
          expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
          return null
        })
    })
  })
})

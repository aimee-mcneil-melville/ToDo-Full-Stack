import { dispatch } from '../../store'
import { getAllGardens } from './gardensHelper'
import { SET_WAITING, CLEAR_WAITING } from '../../actions/waiting'
import { SHOW_ERROR } from '../../actions/error'

jest.mock('../../store')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('getAllGardens', () => {
  describe('-> GET /gardens/ api call success', () => {
    it('dispatches waiting actions correctly', () => {
      function consume() {
        return Promise.resolve()
      }
      return getAllGardens(consume).then(() => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
        expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_WAITING })
        return null
      })
    })
    it('returns correct gardens array', () => {
      function consume() {
        return Promise.resolve({
          body: {
            gardens: [
              {
                id: 0,
                name: 'Test Garden',
                address: '123 Sesame St',
                description: 'A test run garden for testing out gardening.',
                lat: 123,
                lon: 321,
                url: 'https://www.testgarden.com/',
              },
              {
                id: 1,
                name: 'Test Garden 2',
                address: '234 Sesame St',
                description:
                  'A second test run garden for testing out gardening.',
                lat: 234,
                lon: 432,
                url: 'https://www.testgarden2.com/',
              },
            ],
          },
        })
      }
      return getAllGardens(consume).then((gardens) => {
        expect(gardens[0].id).toBe(0)
        expect(gardens[0].name).toBe('Test Garden')
        expect(gardens[0].address).toBe('123 Sesame St')
        expect(gardens[0].description).toBe(
          'A test run garden for testing out gardening.'
        )
        expect(gardens[0].lat).toBe(123)
        expect(gardens[0].lon).toBe(321)
        expect(gardens[0].url).toBe('https://www.testgarden.com/')
        expect(gardens[1].id).toBe(1)
        expect(gardens[1].name).toBe('Test Garden 2')
        expect(gardens[1].address).toBe('234 Sesame St')
        expect(gardens[1].description).toBe(
          'A second test run garden for testing out gardening.'
        )
        expect(gardens[1].lat).toBe(234)
        expect(gardens[1].lon).toBe(432)
        expect(gardens[1].url).toBe('https://www.testgarden2.com/')
        expect(gardens).toHaveLength(2)
        return null
      })
    })
  })
  describe('-> on GET /gardens api call rejection', () => {
    it('dispatches error correctly', () => {
      function consume() {
        return Promise.reject(new Error('mock error'))
      }
      return getAllGardens(consume).then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: SHOW_ERROR,
          errorMessage: 'mock error',
        })
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        return null
      })
    })
  })
})

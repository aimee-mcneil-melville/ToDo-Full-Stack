import { getGarden } from './gardenHelper'
import { SET_WAITING, CLEAR_WAITING } from '../actions/waiting'
import { dispatch, getState } from '../store'
import { getUserGarden } from '../api/gardens'

jest.mock('../store')
jest.mock('../api/gardens')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('getGarden', () => {
  it('calls getUserGarden, dispatches correctly and returns the garden', () => {
    expect.assertions(7)
    getState.mockImplementation(() => ({ user: { gardenId: 2 } }))
    getUserGarden.mockImplementation((id) => {
      expect(id).toBe(2)
      return Promise.resolve({
        name: 'test garden',
        description: 'a rad test garden',
        url: 'cooltestgarden.com',
        events: []
      })
    })
    return getGarden()
      .then((garden) => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
        expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_WAITING })
        expect(garden.name).toBe('test garden')
        expect(garden.description).toMatch('rad test garden')
        expect(garden.url).toMatch('cooltestgarden')
        expect(garden.events).toHaveLength(0)
        return null
      })
  })

  it('dispatches error if getUserGarden rejects', () => {
    getState.mockImplementation(() => ({ user: { gardenId: null } }))
    getUserGarden.mockImplementation(() => Promise.reject(new Error('mock error')))
    return getGarden()
      .then(() => {
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        return null
      })
  })
})

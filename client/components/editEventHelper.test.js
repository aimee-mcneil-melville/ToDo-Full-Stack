import { getEvent } from './editEventHelper'
import { getEventById } from '../api/events'
import { CLEAR_WAITING } from '../actions/waiting'
import { dispatch } from '../store'

jest.mock('../api/events')
jest.mock('../store')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('getEvent', () => {
  it('gets and returns event, and dispatches correctly', () => {
    expect.assertions(6)
    getEventById.mockImplementation((id) => {
      expect(id).toBe(1)
      return Promise.resolve({
        title: 'test event',
        date: '2020-12-18',
        description: 'epic test event',
        volunteersNeeded: 14
      })
    })
    return getEvent(1)
      .then((event) => {
        expect(dispatch.mock.calls[1][0].type).toBe(CLEAR_WAITING)
        expect(event.title).toBe('test event')
        expect(event.date).toBe('2020-12-18')
        expect(event.description).toMatch('epic')
        expect(event.volunteersNeeded).toBe(14)
        return null
      })
  })

  it('dispatches error if getEventById rejects', () => {
    getEventById.mockImplementation(() => Promise.reject(new Error('mock error')))
    return getEvent(999)
      .then(() => {
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        return null
      })
  })
})

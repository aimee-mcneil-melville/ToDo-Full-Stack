import { getEvent, updateEvent } from './editEventHelper'
import { CLEAR_WAITING } from '../../../actions/waiting'
import { dispatch, getState } from '../../../store'

jest.mock('../../../store')

// resets the store.dispatch calls between tests
afterEach(() => {
  return dispatch.mockClear()
})

describe('getEvent', () => {
  it('returns event, dispatches correctly on GET /events/:id api call success', () => {
    function consume(url) {
      expect(url).toBe('/events/1')
      return Promise.resolve({
        body: {
          title: 'test event',
          date: '2020-12-18',
          description: 'epic test event',
          volunteersNeeded: 14,
        },
      })
    }
    return getEvent(1, consume).then((event) => {
      expect(event.title).toBe('test event')
      expect(event.volunteersNeeded).toBe(14)
      expect(dispatch.mock.calls[1][0].type).toBe(CLEAR_WAITING)
      return null
    })
  })

  it('dispatches error on GET /events/:id api call rejection', () => {
    function consume() {
      return Promise.reject(new Error('mock error'))
    }
    return getEvent(999, consume).then(() => {
      expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
      return null
    })
  })
})

describe('updateEvent', () => {
  it('dispatches, redirects correctly on PATCH /events/:id api call success', () => {
    getState.mockImplementation(() => ({
      user: { gardenId: 1, token: 'dummytoken' },
    }))
    const event = {
      id: 1,
      title: 'test event',
      date: '2021-03-22',
      volunteersNeeded: 5,
      description: 'really rad event',
      gardenId: 1,
    }
    const navigateTo = jest.fn()
    function consume(url, token, method, eventToUpdate) {
      expect(url).toBe('/events/1')
      expect(method).toBe('patch')
      expect(eventToUpdate.title).toBe('test event')
      expect(eventToUpdate).not.toBe(event)
      return Promise.resolve()
    }
    return updateEvent('1', event, navigateTo, consume).then(() => {
      expect(dispatch.mock.calls[1][0].type).toBe(CLEAR_WAITING)
      expect(navigateTo).toHaveBeenCalledWith('/gardens/1')
      return null
    })
  })

  it('dispatches error on PATCH /events/id api call rejection', () => {
    const navigateTo = jest.fn()
    function consume() {
      return Promise.reject(new Error('mock error'))
    }
    return updateEvent(999, {}, navigateTo, consume).then(() => {
      expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
      expect(navigateTo).not.toHaveBeenCalled()
      return null
    })
  })
})

import { addEvent } from './addEventHelper'
import { CLEAR_WAITING } from '../../../actions/waiting'
import { dispatch, getState } from '../../../store'

jest.mock('../../../store')

// resets the store.dispatch calls between tests
afterEach(() => {
  return dispatch.mockClear()
})

describe('addEvent', () => {
  it('dispatches and redirects correctly on POST /events api call success', () => {
    getState.mockImplementation(() => ({
      user: { gardenId: 1, token: 'dummytoken' },
    }))
    const event = {
      title: 'test event',
      date: '2021-03-22',
      volunteersNeeded: 5,
      description: 'really rad event',
    }
    const navigateTo = jest.fn()
    function consume(url, token, method, newEvent) {
      expect(method).toBe('post')
      expect(newEvent).not.toBe(event)
      expect(newEvent.gardenId).toBe(1)
      expect(newEvent.title).toBe('test event')
      return Promise.resolve()
    }
    return addEvent(event, navigateTo, consume).then(() => {
      expect(dispatch.mock.calls[1][0].type).toBe(CLEAR_WAITING)
      expect(navigateTo).toHaveBeenCalledWith('/gardens/1')
      return null
    })
  })

  it('dispatches error on POST /events rejection', () => {
    const navigateTo = jest.fn()
    getState.mockImplementation(() => ({
      user: { gardenId: 1, token: 'dummytoken' },
    }))
    function consume() {
      return Promise.reject(new Error('mock error'))
    }
    return addEvent({}, navigateTo, consume).then(() => {
      expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
      expect(navigateTo).not.toHaveBeenCalled()
      return null
    })
  })
})

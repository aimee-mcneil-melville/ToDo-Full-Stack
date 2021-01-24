import { addEvent } from './addEventHelper'
import { postEvent } from '../../api/events'
import { CLEAR_WAITING } from '../../actions/waiting'
import { dispatch, getState } from '../../store'

jest.mock('../../api/events')
jest.mock('../../store')

// resets the store.dispatch calls between tests
afterEach(() => {
  return dispatch.mockClear()
})

describe('addEvent', () => {
  it('calls postEvent, dispatches and redirects correctly', () => {
    expect.assertions(5)
    const event = {
      title: 'test event',
      date: '2021-03-22',
      volunteersNeeded: 5,
      description: 'really rad event'
    }
    const navigateTo = jest.fn()
    getState.mockImplementation(() => ({ user: { gardenId: 1 } }))
    postEvent.mockImplementation((newEvent) => {
      expect(newEvent).not.toBe(event)
      expect(newEvent.gardenId).toBe(1)
      expect(newEvent.title).toBe('test event')
      return Promise.resolve()
    })
    return addEvent(event, navigateTo)
      .then(() => {
        expect(dispatch.mock.calls[1][0].type).toBe(CLEAR_WAITING)
        expect(navigateTo).toHaveBeenCalledWith('/garden')
        return null
      })
  })

  it('dispatches error if postEvent rejects', () => {
    const navigateTo = jest.fn()
    getState.mockImplementation(() => ({ user: { gardenId: 1 } }))
    postEvent.mockImplementation(() => Promise.reject(new Error('mock error')))
    return addEvent({}, navigateTo)
      .then(() => {
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        expect(navigateTo).not.toHaveBeenCalled()
        return null
      })
  })
})

import { getEvent } from './eventHelper'
import { SET_WAITING, CLEAR_WAITING } from '../../actions/waiting'
import { dispatch } from '../../store'

jest.mock('../../store')

afterEach(() => {
  return jest.resetAllMocks()
})

const mockUserAdmin = {
  isAdmin: true,
}

const mockUserNonAdmin = {
  isAdmin: false,
  id: 1,
}

describe('getEvent', () => {
  describe('-> GET /events/:id api call success', () => {
    it('dispatches with the correct event action for admin', () => {
      function consume(path) {
        expect(path).toMatch('2')
        return Promise.resolve({
          body: {
            gardenName: 'test name',
            gardenAddress: 'test address',
            title: 'test event',
            date: '2021-04-30',
            volunteersNeeded: 3,
            description: 'wow great description',
            volunteers: [{}],
            extraVolunteers: [{}],
            fake: 'asdf',
          },
        })
      }

      return getEvent(2, mockUserAdmin, consume).then((event) => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
        expect(dispatch).toHaveBeenCalledWith({
          type: CLEAR_WAITING,
        })
        expect(event.title).toBe('test event')
        expect(event.volunteers).toHaveLength(1)
        expect(event.extraVolunteers).toHaveLength(1)
        expect(event).not.toHaveProperty('fake')
        return null
      })
    })
    it('dispatches with the correct event action for non admin', () => {
      function consume(path) {
        expect(path).toMatch('2')
        return Promise.resolve({
          body: {
            gardenName: 'test name',
            gardenAddress: 'test address',
            title: 'test event',
            date: '2021-04-30',
            volunteersNeeded: 3,
            description: 'wow great description',
            volunteers: [{ userId: mockUserNonAdmin.id }],
            isVolunteer: true,
            extraVolunteers: [],
            fake: 'asdf',
          },
        })
      }

      return getEvent(2, mockUserNonAdmin, consume).then((event) => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
        expect(dispatch).toHaveBeenCalledWith({
          type: CLEAR_WAITING,
        })
        expect(event.title).toBe('test event')
        expect(event.isVolunteer).toBe(true)
        expect(event).not.toHaveProperty('fake')
        return null
      })
    })
  })

  describe('-> GET /event/:id api call rejection', () => {
    it('dispatches error correctly', () => {
      function consume() {
        return Promise.reject(new Error('mock error'))
      }
      return getEvent(null, mockUserAdmin, consume).then(() => {
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        return null
      })
    })
  })
})

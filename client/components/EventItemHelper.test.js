import { getGarden } from '../pages/gardenHelper'
import { dispatch, getState } from '../store'
import { getIfVolunteer, toggleVolunteerButton } from './EventItemHelper'

jest.mock('../store')

afterEach(() => {
  return dispatch.mockClear()
})

describe('getIfVolunteer', () => {
  it('return true if userId is in the volunteers array', () => {
    getState.mockImplementation(() => ({ user: { id: 2 } }))
    const volunteers = [
      { userId: 2, eventId: 2 },
      { userId: 3, eventId: 1 }
    ]
    const test = getIfVolunteer(volunteers)
    expect(getState).toHaveBeenCalled()
    expect(test).toBe(true)
  })
})

// describe('toggleVolunteerButton', () => {
//   it('dispatches post', () => {
//     getState.mockImplementation(() => ())
//   })
//   it('dispatches delete', () => {
//     getState.mockImplementation(() => ())
//   })
// })

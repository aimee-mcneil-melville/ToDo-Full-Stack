import { getGarden } from '../pages/gardenHelper'
import { dispatch, getState } from '../store'
import { getIfVolunteer, toggleVolunteerButton } from './EventItemHelper'

jest.mock('../store')

describe('getIfVolunteer', () => {
  it('return true if userId is in the volunteers array', () => {
    getState.mockImplementation((storeState) => storeState.user.id: 2)
    const volunteers = [
      { userId: 2, eventId: 2 },
      { userId: 3, eventId: 1 }
    ]
    getIfVolunteer(volunteers)
    expect(getState).toHaveBeenCalled

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

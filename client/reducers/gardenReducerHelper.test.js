import { updateVolCount } from './gardenReducerHelper'

describe('gardenReducerHelper', () => {
  it('increase volunteer count when clicked', () => {
    const inputState = {
      name: 'Test garden',
      events: [
        {
          id: 2,
          title: 'Bla',
          totalVolunteers: 100,
          isVolunteer: false,
        },
        {
          id: 3,
          title: 'Bla1',
          totalVolunteers: 30,
          isVolunteer: false,
        },
      ],
    }

    const eventId = 2

    const actualState = updateVolCount(inputState, eventId)
    expect(actualState.events[0].totalVolunteers).toBe(101)
    expect(actualState.events[0].isVolunteer).toBeTruthy()
    expect(actualState.events[1].totalVolunteers).toBe(30)
    expect(actualState.events[1].isVolunteer).toBeFalsy()
  })

  it('decrease volunteer count when clicked', () => {
    const inputState = {
      name: 'Test garden',
      events: [
        {
          id: 2,
          title: 'Bla',
          totalVolunteers: 100,
          isVolunteer: true,
        },
        {
          id: 3,
          title: 'Bla1',
          totalVolunteers: 30,
          isVolunteer: true,
        },
      ],
    }

    const eventId = 2

    const actualState = updateVolCount(inputState, eventId)
    expect(actualState.events[0].totalVolunteers).toBe(99)
    expect(actualState.events[0].isVolunteer).toBeFalsy()
    expect(actualState.events[1].totalVolunteers).toBe(30)
    expect(actualState.events[1].isVolunteer).toBeTruthy()
  })
})

import { SET_GARDEN, UPDATE_EVENT_VOLS } from '../actions/garden'
import gardenReducer from './garden'
import updateVolCount from './gardenReducerHelper'

describe('garden reducer', () => {
  it('returns new garden object on "SET_GARDEN"', () => {
    const oldGarden = {
      id: 1,
      name: 'cool garden'
    }

    const action = {
      type: SET_GARDEN,
      garden: {
        id: 2,
        name: 'very cool garden'
      }
    }
    const newState = gardenReducer(oldGarden, action)
    expect(newState.id).toBe(2)
    expect(newState).not.toBe(oldGarden)
  })

  it('returns old state on unknown action type', () => {
    const oldGarden = {
      id: 1,
      name: 'cool garden'
    }

    const action = {
      type: 'RANDOM_OTHER_ACTION'
    }
    const newState = gardenReducer(oldGarden, action)
    expect(newState).toBe(oldGarden)
  })
})

it('increase & decrease volunteer count when clicked', () => {
  const inputState = {
    name: 'Test garden',
    description: 'A garden to test',
    url: 'www.test.com',
    events: [
      {
        id: '2',
        volunteersNeeded: 20,
        title: 'Bla',
        date: '2020-02-20',
        description: 'bla',
        totalVolunteers: 2,
        isVolunteer: false
      }
    ],
    address: '',
    lat: 0,
    lon: 0
  }

  const expectedFalseState = {
    name: 'Test garden',
    description: 'A garden to test',
    url: 'www.test.com',
    events: [
      {
        id: '2',
        volunteersNeeded: 20,
        title: 'Bla',
        date: '2020-02-20',
        description: 'bla',
        totalVolunteers: 3,
        isVolunteer: false
      }
    ],
    address: '',
    lat: 0,
    lon: 0
  }

  const expectedTrueState = {
    name: 'Test garden',
    description: 'A garden to test',
    url: 'www.test.com',
    events: [
      {
        id: '2',
        volunteersNeeded: 20,
        title: 'Bla',
        date: '2020-02-20',
        description: 'bla',
        totalVolunteers: 1,
        isVolunteer: true
      }
    ],
    address: '',
    lat: 0,
    lon: 0
  }

  const action = {
    type: UPDATE_EVENT_VOLS,
    eventId: 2
  }
  const actualState = updateVolCount(inputState, action)
  expect(actualState.events.totalVolunteers).toBe(expectedFalseState.events.totalVolunteers)
  expect(actualState.events.totalVolunteers).toBe(expectedTrueState.events.totalVolunteers)
})

import { SET_GARDEN } from '../actions/garden'
import gardenReducer from './garden'

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

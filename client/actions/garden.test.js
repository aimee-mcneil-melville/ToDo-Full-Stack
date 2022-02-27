import {
  setGarden,
  updateEventVols,
  SET_GARDEN,
  UPDATE_EVENT_VOLS,
} from './garden'

describe('setGarden', () => {
  it('returns the correct action', () => {
    const action = setGarden({ name: 'garden' })
    expect(action.type).toBe(SET_GARDEN)
    expect(action.garden).toEqual({ name: 'garden' })
  })
})

describe('updateEventVols', () => {
  it('returns the correct action', () => {
    const action = updateEventVols(2)
    expect(action.type).toBe(UPDATE_EVENT_VOLS)
    expect(action.eventId).toBe(2)
  })
})

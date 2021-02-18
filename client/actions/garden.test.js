import { setGarden, SET_GARDEN } from './garden'

describe('setGarden', () => {
  it('returns the correct action', () => {
    const action = setGarden({ name: 'garden' })
    expect(action.type).toBe(SET_GARDEN)
    expect(action.garden).toEqual({ name: 'garden' })
  })
})

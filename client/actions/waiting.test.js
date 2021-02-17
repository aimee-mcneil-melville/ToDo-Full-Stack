import {
  setWaiting,
  clearWaiting,
  SET_WAITING,
  CLEAR_WAITING
} from './waiting'

describe('setWaiting', () => {
  it('returns the correct action', () => {
    const action = setWaiting()
    expect(action.type).toBe(SET_WAITING)
  })
})

describe('clearWaiting', () => {
  it('returns the correct action', () => {
    const action = clearWaiting()
    expect(action.type).toBe(CLEAR_WAITING)
  })
})

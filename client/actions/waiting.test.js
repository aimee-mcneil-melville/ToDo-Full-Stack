import { setWaiting, SET_WAITING } from './waiting'

test('setWaiting returns the correct action', () => {
  const action = setWaiting()
  expect(action.type).toBe(SET_WAITING)
})

import waitingReducer from './waiting'

test('returns true on "SET_WAITING"', () => {
  const action = {
    type: 'SET_WAITING'
  }
  const newState = waitingReducer(false, action)
  expect(newState).toBeTruthy()
})

test('returns old state on unknown action type', () => {
  const action = {
    type: 'RANDOM_OTHER_ACTION'
  }
  const newState = waitingReducer(false, action)
  expect(newState).toBeFalsy()
})

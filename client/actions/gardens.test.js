import { requestGardens, receiveGardens, showError, fetchGardens } from './gardens'

test('REQUEST_GARDENS returns the correct action', () => {
  const action = requestGardens()

  expect(action.type).toBe('REQUEST_GARDENS')
})

test('RECEIVE_GARDENS returns the correct action', () => {
  const gardens = 'gardens'
  const action = receiveGardens(gardens)
  expect(action.type).toBe('RECEIVE_GARDENS')
  expect(action.gardens).toBe('gardens')
})

test('SHOW_ERROR action returns the correct action', () => {
  const action = showError('Houston, we have a problem')
  expect(action.type).toBe('SHOW_ERROR')
  expect(action.errorMessage).toBe('Houston, we have a problem')
})

// TODO complete fetchGardens() test
// test('fetchGardens returns gardens object', () => {
//   const action = fetchGardens()
//   console.log('actions/garden.test.js > action:', JSON.stringify(action, null, 2))
//   expect(action.gardens).toBe('Hmmm')
// })

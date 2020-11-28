import { HIDE_ERROR } from '../actions/error'
import { hide } from './errorHelper'
import { dispatch } from '../store'

jest.mock('../store', () => {
  return {
    dispatch: jest.fn()
  }
})

afterEach(() => {
  return jest.resetAllMocks()
})

test('hide dispatches the hideError action', () => {
  hide()
  expect(dispatch).toHaveBeenCalledWith({ type: HIDE_ERROR })
})

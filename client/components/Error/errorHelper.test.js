import { HIDE_ERROR } from '../../actions/error'
import { hide } from './errorHelper'
import { dispatch } from '../../store'

jest.mock('../../store')

describe('hide', () => {
  it('dispatches the hideError action', () => {
    hide()
    expect(dispatch).toHaveBeenCalledWith({ type: HIDE_ERROR })
  })
})

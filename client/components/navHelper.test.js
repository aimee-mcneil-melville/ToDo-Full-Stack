import { CLEAR_USER } from '../actions/user'
import { logOff } from '../auth'
import { dispatch } from '../store'
import { logOut } from './navHelper'

jest.mock('../auth')
jest.mock('../store')

describe('logOut', () => {
  it('calls logOff and dispatches the clear user action', () => {
    logOut()
    expect(logOff).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_USER })
  })
})

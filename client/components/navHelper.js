import { dispatch } from '../store'
import { logOff } from '../auth'
import { clearUser } from '../actions/user'

export function logOut () {
  logOff()
  dispatch(clearUser())
}

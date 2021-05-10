import requestor from '../consume'
import { dispatch } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'

export function toggleAttendance (volunteerData, consume = requestor) {
  dispatch(setWaiting())

  return consume('/volunteer', 'patch', volunteerData)
    .then(() => {
      dispatch(clearWaiting())
      return true
    })
    .catch(error => {
      dispatch(showError(error.message))
      return false
    })
}

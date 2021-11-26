import requestor from '../../consume'
import { dispatch } from '../../store'
import { setWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'
import { getGardenList } from '../actions/gardernList'

export function getAllGarden (consume = requestor) {
  dispatch(setWaiting())
  const headers = {
    Accept: 'application/json'
  }

  return consume('/', '', 'get', {}, headers)
    .then(() => {
      dispatch(getGardenList())
      return null
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

import requestor from '../../consume'
import { dispatch } from '../../store'
import { clearWaiting, setWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'

export function getAllGardens(consume = requestor) {
  dispatch(setWaiting())

  return consume('/gardens')
    .then((res) => {
      dispatch(clearWaiting())
      const { gardens } = res.body
      return gardens
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

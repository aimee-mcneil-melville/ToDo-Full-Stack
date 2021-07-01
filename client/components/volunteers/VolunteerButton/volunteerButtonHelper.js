import requestor from '../../../consume'
import { dispatch, getState } from '../../../store'
import { setWaiting, clearWaiting } from '../../../actions/waiting'
import { showError } from '../../../actions/error'

export function toggleVolunteerStatus (eventId, isVolunteer, consume = requestor) {
  const storeState = getState()
  const { id } = storeState.user
  if (!id) {
    dispatch(showError('Please register or sign in to volunteer.'))
    return Promise.resolve()
  } else {
    dispatch(setWaiting())
    const routeMethod = isVolunteer ? 'delete' : 'post'
    const userData = { userId: id, eventId }

    return consume('/volunteers', routeMethod, userData)
      .then(() => {
        dispatch(clearWaiting())
        return true
      })
      .catch((error) => {
        dispatch(showError(error.message))
        return null
      })
  }
}

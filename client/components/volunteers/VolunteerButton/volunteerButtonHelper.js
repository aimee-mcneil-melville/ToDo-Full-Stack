import requestor from '../../../consume'
import { dispatch, getState } from '../../../store'
import { setWaiting, clearWaiting } from '../../../actions/waiting'
import { showError } from '../../../actions/error'

export function toggleVolunteerStatus (eventId, willVolunteer, setVolunteering, consume = requestor) {
  const storeState = getState()
  const { id } = storeState.user
  if (!id) {
    dispatch(showError('Please register or sign in to volunteer.'))
  } else {
    dispatch(setWaiting())
    const routeMethod = willVolunteer ? 'post' : 'delete'
    const userData = { userId: id, eventId }

    return consume('/volunteers', routeMethod, userData)
      .then(() => {
        dispatch(clearWaiting())
        setVolunteering(willVolunteer)
        return null
      })
      .catch((error) => {
        dispatch(showError(error.message))
        return null
      })
  }
}

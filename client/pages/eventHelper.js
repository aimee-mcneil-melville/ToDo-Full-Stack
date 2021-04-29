import requestor from '../consume'
import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'

export function getEvent (consume = requestor) {
  const storeState = getState()
  const { id } = storeState.event
  dispatch(setWaiting())
  return consume(`/events/${id}`)
    .then((res) => {
      const { title, date, volunteersNeeded, description } = res.body
      dispatch(clearWaiting())
      return { title, date, volunteersNeeded, description }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

export function checkVolunteerStatus (eventId, isVolunteer, consume = requestor) {
  const storeState = getState()
  const { id } = storeState.user
  if (!id) {
    dispatch(showError('Please register or sign in to volunteer.'))
    return Promise.resolve(false)
  }
  else {
    dispatch(setWaiting())
    const routeMethod = isVolunteer ? 'delete' : 'post'
    const userData = { userId: id, eventId }
  
    return consume('/volunteer', routeMethod, userData)
      .then(() => {
        dispatch(clearWaiting())
        return true
      })
      .catch((error) => {
        dispatch(showError(error.message))
        return false
      })
  }
}

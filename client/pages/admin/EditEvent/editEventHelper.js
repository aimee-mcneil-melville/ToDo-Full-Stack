import { dispatch, getState } from '../../../store'
import { setWaiting, clearWaiting } from '../../../actions/waiting'
import { showError } from '../../../actions/error'
import requestor from '../../../consume'

export function getEvent(id, consume = requestor) {
  dispatch(setWaiting())
  return consume(`/events/${id}`)
    .then((res) => {
      dispatch(clearWaiting())
      const { title, date, volunteersNeeded, description } = res.body
      return { title, date, description, volunteersNeeded }
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
}

export function updateEvent(gardenId, event, navigateTo, consume = requestor) {
  const storeState = getState()
  const { token } = storeState.user
  const eventToUpdate = {
    id: Number(event.id),
    ...event,
  }
  dispatch(setWaiting())
  return consume(`/events/${event.id}`, token, 'patch', eventToUpdate)
    .then(() => {
      navigateTo(`/gardens/${gardenId}`)
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
    .finally(() => {
      dispatch(clearWaiting())
    })
}

export function cancelEvent(id, navigateTo, consume = requestor) {
  const storeState = getState()
  const { token } = storeState.user
  const eventToUpdate = {
    id: Number(id),
  }
  return consume(`/events/${id}/cancel`, token, 'patch', eventToUpdate)
    .then(() => {
      navigateTo()
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
    .finally(() => {
      dispatch(clearWaiting())
    })
}

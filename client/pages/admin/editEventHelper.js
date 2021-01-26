import { dispatch } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'
import requestor from '../../consume'

export function getEvent (id, consume = requestor) {
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

export function updateEvent (id, event, navigateTo, consume = requestor) {
  const eventToUpdate = {
    id: Number(id),
    ...event
  }
  dispatch(setWaiting())
  return consume(`/events/${id}`, 'patch', eventToUpdate)
    .then(() => {
      dispatch(clearWaiting())
      navigateTo('/garden')
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
}

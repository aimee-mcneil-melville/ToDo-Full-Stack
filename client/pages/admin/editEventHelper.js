import { dispatch } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'
import { getEventById, patchEvent } from '../../api/events'

export function getEvent (id, setEventDetails) {
  dispatch(setWaiting())
  return getEventById(id)
    .then((event) => {
      dispatch(clearWaiting())
      const { title, date, volunteersNeeded, description } = event
      setEventDetails({ title, date, description, volunteersNeeded })
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
}

export function updateEvent (id, event, navigateTo) {
  const eventToUpdate = {
    id: Number(id),
    ...event
  }
  dispatch(setWaiting())
  return patchEvent(eventToUpdate)
    .then(() => {
      dispatch(clearWaiting())
      navigateTo('/garden')
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
}

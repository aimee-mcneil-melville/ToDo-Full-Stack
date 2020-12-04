import { dispatch } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { getEventById } from '../api/events'

export function getEvent (id) {
  dispatch(setWaiting())
  return getEventById(id)
    .then((event) => {
      dispatch(clearWaiting())
      const { title, date, volunteersNeeded, description } = event
      console.log('helper', volunteersNeeded)
      return { title, date, description, volunteersNeeded }
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
}

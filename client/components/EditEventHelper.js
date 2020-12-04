import { dispatch } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { getEventById } from '../api/events'

export function getEvent (id) {
  dispatch(setWaiting())
  return getEventById(id)
    .then((res) => {
      dispatch(clearWaiting())
      // eslint-disable-next-line camelcase
      const { title, date, volunteers_needed, description } = res
      return {
        title,
        date,
        description,
        volunteers: volunteers_needed
      }
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
}

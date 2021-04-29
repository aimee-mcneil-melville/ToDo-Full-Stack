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
      const { gardenId, title, date, volunteersNeeded, description } = res.body
      dispatch(clearWaiting())
      return { gardenId, title, date, volunteersNeeded, description }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

import requestor from '../consume'
import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'

export function getEvent (id, consume = requestor) {
  // const storeState = getState()
  // const { id } = storeState.event
  dispatch(setWaiting())
  return consume(`/events/${id}`)
    .then((res) => {
      dispatch(clearWaiting())
      const { title, gardenName, date, volunteersNeeded, description } = res.body
      return { title, gardenName, date, volunteersNeeded, description }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

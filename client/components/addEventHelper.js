import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { postEvent } from '../api/events'

export function addEvent (event, navigateTo) {
  const storeState = getState()
  const { gardenId } = storeState.user
  const newEvent = {
    gardenId,
    ...event
  }
  dispatch(setWaiting())
  return postEvent(newEvent)
    .then(() => {
      dispatch(clearWaiting())
      navigateTo('/garden')
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
}

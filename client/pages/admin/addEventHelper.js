import { dispatch, getState } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'
import requestor from '../../consume'

export function addEvent (event, navigateTo, consume = requestor) {
  const storeState = getState()
  const { gardenId } = storeState.user
  const newEvent = {
    gardenId,
    ...event
  }
  dispatch(setWaiting())
  return consume('/events', 'post', newEvent)
    .then(() => {
      dispatch(clearWaiting())
      navigateTo('/garden')
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
}

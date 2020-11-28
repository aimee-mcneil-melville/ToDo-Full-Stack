import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { getUserGarden } from '../api/gardens'

export function getGarden () {
  const storeState = getState()
  const { gardenId } = storeState.user
  if (gardenId) {
    dispatch(setWaiting())
    return getUserGarden(gardenId)
      .then(res => {
        dispatch(clearWaiting())
        const { name, description, url, events } = res
        return {
          name,
          description,
          url,
          events
        }
      })
      .catch((error) => {
        dispatch(showError(error.message))
      })
  } else {
    return Promise.resolve()
  }
}

import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { getUserGarden } from '../api/gardens'

export function getGarden () {
  const storeState = getState()
  const { gardenId } = storeState.user
  dispatch(setWaiting())
  return getUserGarden(gardenId)
    .then(garden => {
      dispatch(clearWaiting())
      const { name, description, url, address, events, lat, lon } = garden
      return {
        name,
        description,
        address,
        url,
        events,
        lat,
        lon
      }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

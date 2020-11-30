import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { getUserGarden, getGardens } from '../api/gardens'

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

export function fetchGardens () {
  dispatch(setWaiting())
  return getGardens()
    .then(gardens => {
      dispatch(clearWaiting())
      return gardens
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

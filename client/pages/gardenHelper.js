import { dispatch, getState } from '../store'
import { setWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import requestor from '../consume'
import { setGarden } from '../actions/garden'
import { isAuthenticated } from '../auth'

export function getGarden (consume = requestor) {
  const storeState = getState()
  const { gardenId } = storeState.user
  dispatch(setWaiting())
  return consume(`/gardens/${gardenId}`)
    .then((res) => {
      const { name, description, url, address, events, lat, lon } = res.body
      dispatch(setGarden({
        name,
        description,
        address,
        url,
        events,
        lat,
        lon
      }))
      return null
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

export function signedIn () {
  return isAuthenticated()
}

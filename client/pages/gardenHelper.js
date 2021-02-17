import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import requestor from '../consume'

export function getGarden (consume = requestor) {
  const storeState = getState()
  const { gardenId } = storeState.user
  dispatch(setWaiting())
  return consume(`/gardens/${gardenId}`)
    .then((res) => {
      dispatch(clearWaiting())
      const { name, description, url, address, events, lat, lon } = res.body
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

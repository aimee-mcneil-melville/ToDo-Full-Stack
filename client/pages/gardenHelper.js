import requestor from '../consume'
import { dispatch } from '../store'
import { setWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { setGarden } from '../actions/garden'

export function getGarden (id, consume = requestor) {
  dispatch(setWaiting())
  return consume(`/gardens/${id}`)
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

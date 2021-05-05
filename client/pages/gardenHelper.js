import requestor from '../consume'
import { dispatch } from '../store'
import { setWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { setGarden } from '../actions/garden'

export function getGarden (id, consume = requestor) {
  dispatch(setWaiting())
  return consume(`/gardens/${id}`)
    .then((res) => {
      const garden = res.body
      dispatch(setGarden({
        name: garden.name,
        description: garden.description,
        address: garden.address,
        url: garden.url,
        events: garden.events,
        lat: garden.lat,
        lon: garden.lon
      }))
      return null
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

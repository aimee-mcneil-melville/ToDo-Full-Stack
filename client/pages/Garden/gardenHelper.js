import requestor from '../../consume'
import { dispatch } from '../../store'
import { setWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'
import { setGarden } from '../../actions/garden'

export function getGarden(id, user, consume = requestor) {
  dispatch(setWaiting())
  const headers = {
    Accept: 'application/json',
    userid: user.id,
  }

  return consume(`/gardens/${id}`, '', 'get', {}, headers)
    .then((res) => {
      const garden = res.body
      dispatch(
        setGarden({
          name: garden.name,
          description: garden.description,
          address: garden.address,
          url: garden.url,
          events: garden.events,
          lat: garden.lat,
          lon: garden.lon,
        })
      )
      return null
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

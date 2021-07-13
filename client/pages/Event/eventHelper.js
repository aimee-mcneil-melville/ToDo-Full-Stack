import requestor from '../../consume'
import { dispatch } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'

export function getEvent (id, consume = requestor) {
  dispatch(setWaiting())
  return consume(`/events/${id}`)
    .then((res) => {
      dispatch(clearWaiting())
      const event = res.body
      return {
        id: event.id,
        date: event.date,
        title: event.title,
        gardenName: event.gardenName,
        gardenAddress: event.gardenAddress,
        volunteersNeeded: event.volunteersNeeded,
        description: event.description,
        volunteers: event.volunteers,
        isVolunteer: event.isVolunteer,
        extraVolunteers: event.extraVolunteers,
        lat: event.lat,
        lon: event.lon
      }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

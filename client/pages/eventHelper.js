import requestor from '../consume'
import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'

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
        isVolunteer: event.isVolunteer
      }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

export function toggleVolunteerStatus (eventId, isVolunteer, consume = requestor) {
  const storeState = getState()
  const { id } = storeState.user
  if (!id) {
    dispatch(showError('Please register or sign in to volunteer.'))
    return Promise.resolve(false)
  } else {
    dispatch(setWaiting())
    const routeMethod = isVolunteer ? 'delete' : 'post'
    const userData = { userId: id, eventId }

    return consume('/volunteers', routeMethod, userData)
      .then(() => true)
      .catch((error) => {
        dispatch(showError(error.message))
        return false
      })
      .finally(() => {
        dispatch(clearWaiting())
      })
  }
}

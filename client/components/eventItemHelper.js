import { dispatch, getState } from '../store'
import { setWaiting } from '../actions/waiting'
import requestor from '../consume'
import { getGarden } from '../pages/gardenHelper'

export function toggleVolunteerStatus (eventId, isVolunteer, consume = requestor) {
  const storeState = getState()
  const { id } = storeState.user

  dispatch(setWaiting())

  const routeMethod = isVolunteer ? 'delete' : 'post'

  const userData = { userId: id, eventId }

  return consume('/volunteer', routeMethod, userData)
    .then((event) => {
      getGarden()
      return null
    })
}

import { dispatch, getState } from '../store'
import { setWaiting } from '../actions/waiting'
import requestor from '../consume'
import { getGarden } from '../pages/gardenHelper'

export function getIfVolunteer (volunteers) {
  const storeState = getState()
  const { id } = storeState.user

  return volunteers.some(vol => vol.userId === id)
}

export function toggleVolunteerButton (eventId, isVolunteer, consume = requestor) {
  const storeState = getState()
  const { id } = storeState.user

  dispatch(setWaiting())

  // query if, add or delete
  const routeMethod = isVolunteer ? 'delete' : 'post'

  const userData = { userId: id, eventId }

  return consume('/events/volunteer', routeMethod, userData)
    .then((event) => {
      getGarden()
      return null
    })
}

// dispatch waiting
// add or delete to volunteers table
// dispatch success
// toggle button

import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import requestor from '../consume'

export function getIfVolunteer (volunteers) {
  const storeState = getState()
  const { id } = storeState.user

  const index = volunteers.findIndex((volunteerObj) => {
    return volunteerObj.id === id
  })

  const ifVolunteer = index !== -1

  return ifVolunteer
}

export function toggleVolunteerButton (eventId, isVolunteer, consume = requestor) {
  const storeState = getState()
  const { id } = storeState.user

  dispatch(setWaiting())

  // query if, add or delete
  const routeMethod = isVolunteer ? 'delete' : 'post'

  const userData = { userId: id, eventId }

  return consume('/events/volunteer', routeMethod, userData)
    .then(() => {
      dispatch(clearWaiting())
      return null
    })
}

// dispatch waiting
// add or delete to volunteers table
// dispatch success
// toggle button

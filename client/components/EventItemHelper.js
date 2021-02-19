import { dispatch, getState } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import requestor from '../consume'

export function getIfVolunteer (volunteers) {
  const storeState = getState()
  const { userId } = storeState.user
  // change to match user.id

  const index = volunteers.findIndex((volunteerObj) => {
    return volunteerObj.id === userId
  })

  const ifVolunteer = index !== -1

  return ifVolunteer
}

export function toggleVolunteerButton (id, isVolunteer, consume = requestor) {
  const storeState = getState()
  const { userId } = storeState.user
  dispatch(setWaiting())

  // query if, add or delete
  const routeMethod = isVolunteer ? 'delete' : 'post'

  return consume('/events/volunteer', routeMethod, { userId, eventId: id })
    .then(() => {
      dispatch(clearWaiting())
      return null
    })
}

// dispatch waiting
// add or delete to volunteers table
// dispatch success
// toggle button

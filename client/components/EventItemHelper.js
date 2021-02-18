import { dispatch, getState } from '../store'

export function getIfVolunteer (volunteers) {
  const storeState = getState()
  const { username } = storeState.user
  // const username = 'clare'

  const index = volunteers.findIndex((volunteer) => {
    return volunteer === username
  })

  const ifVolunteer = index !== -1

  return ifVolunteer
}

// export function () {

// }

import requestor from '../../../consume'
import { dispatch } from '../../../store'
import { setWaiting, clearWaiting } from '../../../actions/waiting'
import { showError } from '../../../actions/error'

export function addVolunteer(
  volunteer,
  addExtraVolunteer,
  consume = requestor
) {
  dispatch(setWaiting())

  return consume('/volunteers/extras', 'post', volunteer)
    .then((response) => {
      dispatch(clearWaiting())
      const newVolunteer = { ...volunteer, ...response.body }
      addExtraVolunteer(newVolunteer)
      return null
    })

    .catch((error) => {
      dispatch(showError(error.message))
      return null
    })
}

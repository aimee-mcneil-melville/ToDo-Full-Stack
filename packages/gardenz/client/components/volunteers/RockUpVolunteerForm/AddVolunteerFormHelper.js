import requestor from '../../../consume'
import { dispatch, getState } from '../../../store'
import { setWaiting, clearWaiting } from '../../../actions/waiting'
import { showError } from '../../../actions/error'

export function addVolunteer (volunteer, addExtraVolunteer, consume = requestor) {
  const { token } = getState().user
  dispatch(setWaiting())

  return consume('/volunteers/extras', token, 'post', volunteer)
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

import requestor from '../../consume'
import { dispatch } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'

export function registerUser (user, navigateTo, consume = requestor) {
  const newUser = {
    garden_id: user.gardenId,
    first_name: user.firstName,
    last_name: user.lastName,
    username: user.username
  }
  dispatch(setWaiting())
  return consume('/profile', 'post', newUser)
    .then(() => {
      navigateTo(`gardens/${user.gardenId}`)
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
    .finally(() => {
      dispatch(clearWaiting())
    })
}

import requestor from '../../consume'
import { dispatch } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'

export function registerUser (user, navigateTo, consume = requestor) {
  const newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    gardenId: user.gardenId,
    username: user.username,
    email: user.email,
    auth0Id: user.auth0Id
  }
  dispatch(setWaiting())
  return consume('/users', 'post', newUser)
    .then(() => {
      console.log('helper')
      navigateTo(`gardens/${user.gardenId}`)
      return null
    })
    .catch((err) => {
      console.log('catch')
      dispatch(showError(err.message))
    })
    .finally(() => {
      dispatch(clearWaiting())
    })
}

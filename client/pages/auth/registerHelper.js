import { register, isAuthenticated, getDecodedToken } from '../../auth'
import { dispatch } from '../../store'
import { setUser } from '../../actions/user'
import { setWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'

export function registerUser (user, navigateTo) {
  const { username, password, gardenId, email } = user
  dispatch(setWaiting())
  return register({
    username,
    password,
    gardenId: Number(gardenId),
    email
  },
  { baseUrl: '/api/v1' })
    .then(() => {
      if (isAuthenticated()) {
        const { username, isAdmin, gardenId, email } = getDecodedToken()
        dispatch(setUser({ username, isAdmin, gardenId, email }))
        navigateTo('/garden')
      } else {
        throw new Error('Not authenticated')
      }
      return null
    })
    .catch((error) => {
      error.message === 'USERNAME_UNAVAILABLE'
        ? dispatch(showError('This username is not available'))
        : dispatch(showError(error.message))
    })
}

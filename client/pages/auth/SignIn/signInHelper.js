import { isAuthenticated, signIn, config } from '../../../auth'
import { dispatch } from '../../../store'
import { setUser } from '../../../actions/user'
import { setWaiting } from '../../../actions/waiting'
import { showError } from '../../../actions/error'

export function signInUser (user) {
  const { username, password } = user

  dispatch(setWaiting())
  return signIn({ username, password }, config)
    .then(() => {
      if (isAuthenticated()) {
        dispatch(setUser())
      } else {
        throw new Error('Not authenticated')
      }
      return null
    })
    .catch((error) => {
      error.message === 'INVALID_CREDENTIALS'
        ? dispatch(showError('Username/password combination not found'))
        : dispatch(showError(error.message))
    })
}

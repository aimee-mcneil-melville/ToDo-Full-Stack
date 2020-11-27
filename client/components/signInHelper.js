import { isAuthenticated, signIn, getDecodedToken } from '../auth'
import { dispatch } from '../store'
import { setUser } from '../actions/user'

export function signInUser (user, navigateTo) {
  const { username, password } = user
  return signIn({ username, password }, { baseUrl: '/api/v1' })
    .then(() => {
      if (isAuthenticated()) {
        const { username, isAdmin, gardenId } = getDecodedToken()
        dispatch(setUser({ username, isAdmin, gardenId }))
        navigateTo('/garden')
      }
      return null
    })
}

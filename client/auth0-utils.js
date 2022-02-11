import { setUser } from './actions/user'
import store from './store'

export async function cacheUser (useAuth0, state) {
  // TODO: call the useAuth0 and destructure:
  // isAuthenticated, getAccessTokenSilently and user

  const isAuthenticated = false // <- TODO: delete this and use the value from useAuth0()
  if (isAuthenticated && !state?.token) {
    try {
      const userToSave = {
        auth0Id: '',
        email: '',
        token: ''
      }

      store.dispatch(setUser(userToSave))
    } catch (err) {
      console.error(err)
    }
  }
}

import { useDispatch, useSelector } from 'react-redux'
import { updateLoggedInUser } from './actions/loggedInUser'

// eslint-disable-next-line no-unused-vars
export function cacheUser(useAuth0) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)

  // TODO: call the useAuth0 and destructure:
  // isAuthenticated, getAccessTokenSilently and user

  const isAuthenticated = false // <- TODO: delete this and use the value from useAuth0()
  if (isAuthenticated && !loggedInUser?.token) {
    try {
      // TODO: call getAccessTokenSilently and replace the token string below

      const userToSave = {
        auth0Id: user?.sub,
        email: user?.email,
        token: '',
      }

      dispatch(updateLoggedInUser(userToSave))
    } catch (err) {
      console.error(err)
    }
  }
}

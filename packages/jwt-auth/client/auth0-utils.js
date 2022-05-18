import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from './actions/loggedInUser'

// eslint-disable-next-line no-unused-vars
export async function cacheUser(useAuth0) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)

  // TODO: call the useAuth0 and destructure:
  // isAuthenticated, getAccessTokenSilently and user

  const isAuthenticated = false // <- TODO: delete this and use the value from useAuth0()
  if (isAuthenticated && !loggedInUser?.token) {
    try {
      const userToSave = {
        auth0Id: '',
        email: '',
        token: '',
      }

      dispatch(setLoggedInUser(userToSave))
    } catch (err) {
      console.error(err)
    }
  }
}

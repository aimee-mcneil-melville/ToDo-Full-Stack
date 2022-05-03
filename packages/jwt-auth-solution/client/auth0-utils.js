import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from './actions/loggedInUser'

export async function cacheUser(useAuth0) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0()

  if (isAuthenticated && !loggedInUser?.token) {
    try {
      const token = await getAccessTokenSilently()
      const userToSave = {
        auth0Id: user.sub,
        email: user.email,
        token,
      }

      dispatch(setLoggedInUser(userToSave))
    } catch (err) {
      console.error(err)
    }
  }
}

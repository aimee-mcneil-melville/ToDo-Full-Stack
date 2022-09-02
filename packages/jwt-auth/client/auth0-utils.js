import { useDispatch, useSelector } from 'react-redux'
// TODO: import useAuth0 function

import { updateLoggedInUser } from './actions/loggedInUser'

// eslint-disable-next-line no-unused-vars
export function useCacheUser() {
  const dispatch = useDispatch()
  const tokenInRedux = useSelector((state) =>
    Boolean(state.loggedInUser?.token)
  )

  // TODO: call the useAuth0 and destructure:
  // isAuthenticated, getAccessTokenSilently and user

  const isAuthenticated = false // <- TODO: delete this and use the value from useAuth0()
  const user = null // <- TODO: delete this and use the value from useAuth0()

  if (isAuthenticated && !tokenInRedux) {
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

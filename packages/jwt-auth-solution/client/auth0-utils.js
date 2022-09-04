import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { updateLoggedInUser } from './actions/loggedInUser'

// eslint-disable-next-line no-unused-vars
export async function cacheUser() {
  const dispatch = useDispatch()
  const tokenInRedux = useSelector((state) =>
    Boolean(state.loggedInUser?.token)
  )

  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0()

  if (isAuthenticated && !tokenInRedux) {
    try {
      const token = await getAccessTokenSilently()

      const userToSave = {
        auth0Id: user?.sub,
        email: user?.email,
        token: token,
      }

      dispatch(updateLoggedInUser(userToSave))
    } catch (err) {
      console.error(err)
    }
  }
}

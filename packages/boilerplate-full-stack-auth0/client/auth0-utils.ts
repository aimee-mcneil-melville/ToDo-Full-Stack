import { useEffect } from 'react'
import { setUser } from './actions/user'
import { getUserRoles } from './apis/users'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

const emptyUser = {
  auth0Id: '',
  email: '',
  name: '',
  token: '',
}

export function useAuthCache() {
  const dispatch = useDispatch()
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()

  useEffect(() => {
    function saveUser(user = emptyUser) {
      dispatch(setUser(user))
    }

    async function cacheUser() {
      if (
        isAuthenticated &&
        user != null &&
        user.sub &&
        user.email &&
        user.nickname
      ) {
        try {
          const token = await getAccessTokenSilently()
          const roles = await getUserRoles(user.sub)
          const userToSave = {
            auth0Id: user.sub,
            email: user.email,
            name: user.nickname,
            token,
            roles,
          }
          saveUser(userToSave)
        } catch (err) {
          console.error(err)
        }
      } else {
        saveUser()
      }
    }

    cacheUser()
  }, [dispatch, isAuthenticated, getAccessTokenSilently, user])
}

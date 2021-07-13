import consume from './consume'
import { dispatch } from './store'
import { showError } from './actions/error'
import { setUser } from './actions/user'

const emptyUser = {
  id: null,
  username: '',
  isAdmin: false,
  gardenId: null
}

function saveUser (user = emptyUser) {
  dispatch(setUser(user))
}

export async function cacheUser (useAuth0) {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()
  if (isAuthenticated) {
    try {
      const token = await getAccessTokenSilently()
      const res = await consume(`/users/${user.sub}`, token)
      console.log(res.body)
      saveUser(res.body
      //   {
      //   id: 1234,
      //   firstName: 'el',
      //   lastName: 'woodhouse',
      //   email: 'ewoo@history.com',
      //   username: 'el',
      //   isAdmin: false,
      //   gardenId: 3
      // }
      )
    } catch (err) {
      dispatch(showError('Unable to set the current user'))
      console.error(err)
    }
  } else {
    saveUser()
  }
}

export function getLoginFn (useAuth0) {
  return useAuth0().loginWithRedirect
}

export function getRegisterFn (useAuth0) {
  const { loginWithRedirect } = useAuth0()
  const redirectUri = `${window.location.origin}/profile`
  return () => loginWithRedirect({
    redirectUri,
    screen_hint: 'signup',
    scope: 'role:member'
  })
}

export function getLogoutFn (useAuth0) {
  return useAuth0().logout
}

export function getIsAuthenticated (useAuth0) {
  return useAuth0().isAuthenticated
}

export async function getAccessToken () {
  try {
    return await auth0.getTokenSilently({
      audience: 'https://garden/nz/api',
      scope: 'read:users'
    })
  } catch (error) {
    if (error.error !== 'login_required') {
      throw error
    }
  }
}

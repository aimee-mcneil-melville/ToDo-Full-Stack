import { setUser } from './actions/user'
import store from './store'

const emptyUser = {
  email: '',
  name: '',
  token: ''
}


function saveUser (user = emptyUser) {
  store.dispatch(setUser(user))
}

export async function cacheUser (useAuth0) {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()
  if (isAuthenticated) {
    try {
      const token = await getAccessTokenSilently()
      const userToSave = { email: user.email, name: user.nickname, token }
      saveUser(userToSave)
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

export function getLogoutFn (useAuth0) {
  return useAuth0().logout
}

export function getIsAuthenticated (useAuth0) {
  return useAuth0().isAuthenticated
}
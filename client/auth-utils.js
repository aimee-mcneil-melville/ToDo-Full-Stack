const emptyUser = {
  id: null,
  username: '',
  isAdmin: false,
  gardenId: null
}

export function getUser (useAuth0) {
  const { isAuthenticated, user } = useAuth0()

  if (isAuthenticated) {
    const { username, isAdmin, gardenId, id } = user
    return {
      id,
      username,
      gardenId,
      isAdmin
    }
  }

  return emptyUser
}

export function getLoginFn (useAuth0) {
  return useAuth0().loginWithRedirect
}

export function getRegisterFn (useAuth0) {
  const { loginWithRedirect } = useAuth0()
  const redirectUri = `${window.location.origin}/profile`
  return () => loginWithRedirect({ redirectUri, screen_hint: 'signup' })
}

export function getLogoutFn (useAuth0) {
  return useAuth0().logout
}

export function getIsAuthenticated (useAuth0) {
  return useAuth0().isAuthenticated
}

// export async function getAccessToken () {
//   try {
//     return await auth0.getTokenSilently({
//       audience: 'https://garden/nz/api',
//       scope: 'read:users'
//     })
//   } catch (error) {
//     if (error.error !== 'login_required') {
//       throw error
//     }
//   }
// }

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

export function getLogoutFn (useAuth0) {
  return useAuth0().logout
}

export function getIsAuthenticated (useAuth0) {
  return useAuth0().isAuthenticated
}

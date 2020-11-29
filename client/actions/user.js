export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'
export const USER_LOCATION = 'USER_LOCATION'

export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

export const clearUser = () => {
  return {
    type: CLEAR_USER
  }
}

export const setUserLocation = (location) => {
  return {
    type: USER_LOCATION,
    location
  }
}

import { SET_USER, CLEAR_USER, USER_LOCATION } from '../actions/user'

const emptyUser = {
  username: '',
  isAdmin: false,
  gardenId: null,
  latitude: null,
  longitude: null
}

const user = (state = emptyUser, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user

    case CLEAR_USER:
      return emptyUser

    case USER_LOCATION:
    {
      const latitude = action.location.latitude
      const longitude = action.location.longitude
      return {
        ...state,
        latitude,
        longitude
      }
    }

    default:
      return state
  }
}

export default user

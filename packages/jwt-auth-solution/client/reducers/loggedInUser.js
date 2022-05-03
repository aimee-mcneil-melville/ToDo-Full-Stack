import {
  SET_LOGGED_IN_USER,
  CLEAR_LOGGED_IN_USER,
} from '../actions/loggedInUser'

const emptyUser = {
  auth0Id: '',
  email: '',
  token: '',
}

export default function user(state = emptyUser, action) {
  const { type, payload } = action

  switch (type) {
    case SET_LOGGED_IN_USER:
      return payload

    case CLEAR_LOGGED_IN_USER:
      return emptyUser

    default:
      return state
  }
}

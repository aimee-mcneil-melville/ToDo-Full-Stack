import { isAuthenticated, getDecodedToken } from '../auth'
import { SET_USER, CLEAR_USER } from '../actions/user'

const emptyUser = {
  id: null,
  username: '',
  isAdmin: false,
  gardenId: null
}

export default function user (state = getUser(), action) {
  switch (action.type) {
    case SET_USER:
      return action.user

    case CLEAR_USER:
      return emptyUser

    default:
      return state
  }
}

export function getUser () {
  if (isAuthenticated()) {
    const { username, isAdmin, gardenId, id } = getDecodedToken()
    return {
      username,
      isAdmin,
      gardenId,
      id
    }
  }
  return emptyUser
}

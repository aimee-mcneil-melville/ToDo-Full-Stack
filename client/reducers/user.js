import { SET_USER, CLEAR_USER } from '../actions/user'

const emptyUser = {
  id: null,
  isAdmin: false,
  firstName: '',
  gardenId: null,
  token: '',
}

export default function user(state = emptyUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user

    case CLEAR_USER:
      return emptyUser

    default:
      return state
  }
}

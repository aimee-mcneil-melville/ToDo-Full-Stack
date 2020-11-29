import { SET_USER, CLEAR_USER, USER_LOCATION } from '../actions/user'

const emptyUser = {
  username: '',
  isAdmin: false,
  gardenId: null
}

const user = (state = emptyUser, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user

    case CLEAR_USER:
      return emptyUser

    case USER_LOCATION:
      console.log('reducers/user.js > action.location:', action.location)
      return action.location

    default:
      return state
  }
}

export default user

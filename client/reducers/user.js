import { SET_USER } from '../actions'

const initialState = {
  username: '',
  isAdmin: false,
  gardenId: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

export default user

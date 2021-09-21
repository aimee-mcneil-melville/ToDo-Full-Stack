import { SET_FRIENDS_SUCCESS } from '../actions/index.js'

const friendsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_FRIENDS_SUCCESS:
      return action.friends
    default:
      return state
  }
}

export default friendsReducer

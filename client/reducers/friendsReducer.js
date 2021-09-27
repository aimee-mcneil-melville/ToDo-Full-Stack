import { SET_FRIENDS } from '../actions/index.js'

const friendsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friends
    default:
      return state
  }
}

export default friendsReducer

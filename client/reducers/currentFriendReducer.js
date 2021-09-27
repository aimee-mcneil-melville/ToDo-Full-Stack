import { SET_CURRENT_FRIEND } from '../actions/index.js'

const currentFriendReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_FRIEND:
      return action.friend
    default:
      return state
  }
}

export default currentFriendReducer

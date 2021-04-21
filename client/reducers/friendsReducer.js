import { SET_FRIENDS } from '../actions/index.js'

const initialState = []

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friends
    default:
      return state
  }
}

export default friendsReducer

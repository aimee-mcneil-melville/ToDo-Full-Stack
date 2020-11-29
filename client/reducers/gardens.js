import { REQUEST_GARDENS, RECEIVE_GARDENS } from '../actions/gardens'

const gardens = (state = [], action) => {
  switch (action.type) {
    case REQUEST_GARDENS:
      return null

    case RECEIVE_GARDENS:
      return action.gardens

    default:
      return state
  }
}

export default gardens

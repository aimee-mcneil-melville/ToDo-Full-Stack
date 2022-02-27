import { SET_LOCATION } from '../actions/location'

const initialState = {
  lat: null,
  lon: null,
}

export default function location(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return action.location

    default:
      return state
  }
}

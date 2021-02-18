import { SET_GARDEN } from '../actions/garden'

const initialState = {
  name: '',
  description: '',
  url: '',
  events: [],
  address: '',
  lat: 0,
  lon: 0
}

export default function garden (state = initialState, action) {
  switch (action.type) {
    case SET_GARDEN:
      return action.garden
    default:
      return state
  }
}

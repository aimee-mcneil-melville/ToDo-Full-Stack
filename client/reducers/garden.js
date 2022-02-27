import { SET_GARDEN, UPDATE_EVENT_VOLS } from '../actions/garden'
import { updateVolCount } from './gardenReducerHelper'

const initialState = {
  name: '',
  description: '',
  url: '',
  events: [],
  address: '',
  lat: 0,
  lon: 0,
}

export default function garden(state = initialState, action) {
  switch (action.type) {
    case SET_GARDEN:
      return action.garden
    case UPDATE_EVENT_VOLS:
      return updateVolCount(state, action.eventId)
    default:
      return state
  }
}

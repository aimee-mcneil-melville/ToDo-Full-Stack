import { SET_GARDEN, UPDATE_EVENT_VOLS } from '../actions/garden'

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
    case UPDATE_EVENT_VOLS:
      return updateVolCount(state, action)
    default:
      return state
  }
}

function updateVolCount (state, action) {
  const updatedEvents = state.events.map(event => {
    if (event.id === action.eventId) {
      if (event.isVolunteer === false) {
        event.totalVolunteers += 1
        event.isVolunteer = true
      } else {
        event.totalVolunteers -= 1
        event.isVolunteer = false
      }
      return event
    } else {
      return event
    }
  })

  const newGarden = {
    ...state,
    events: updatedEvents
  }

  console.log('newGarden', newGarden)
  return newGarden
}

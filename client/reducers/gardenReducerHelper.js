export default function updateVolCount (state, action) {
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
  return newGarden
}

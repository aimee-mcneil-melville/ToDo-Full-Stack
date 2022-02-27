export const SET_GARDEN = 'SET_GARDEN'
export const UPDATE_EVENT_VOLS = 'UPDATE_EVENT_VOLS'

export function setGarden(garden) {
  return {
    type: SET_GARDEN,
    garden,
  }
}

export function updateEventVols(eventId) {
  return {
    type: UPDATE_EVENT_VOLS,
    eventId,
  }
}

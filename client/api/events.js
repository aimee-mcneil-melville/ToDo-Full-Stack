import requestor from './consume'
import { showError } from '../actions/error'
import { dispatch } from '../store'

export function getEvents (gardenId, consume = requestor) {
  return consume(`/gardens/${gardenId}`)
    .then(res => {
      return res.body
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

export function editEvent (event, consume = requestor) {
  return consume(`/events/${event.id}/edit`, 'patch', event)
    .then(res => {
      return res.body
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

export function addEvent (newEvent, consume = requestor) {
  return consume('/events', 'post', newEvent)
    .then(res => {
      return res.body
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

export function getEventById (id, consume = requestor) {
  return consume(`/events/${id}/edit`)
    .then(res => {
      return res.body
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

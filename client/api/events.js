import requestor from './consume'
import { showError } from '../actions/error'
import { dispatch } from '../store'

export function getEventById (id, consume = requestor) {
  return consume(`/events/${id}/edit`)
    .then(res => {
      return res.body
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

export function patchEvent (event, consume = requestor) {
  return consume(`/events/${event.id}/edit`, 'patch', event)
    .then(res => {
      return res.body
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

export function postEvent (newEvent, consume = requestor) {
  return consume('/events', 'post', newEvent)
    .then(res => {
      return res.body
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

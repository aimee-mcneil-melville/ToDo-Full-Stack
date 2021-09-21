import requestor from '../../../consume'
import { dispatch } from '../../../store'
import { setWaiting, clearWaiting } from '../../../actions/waiting'
import { showError } from '../../../actions/error'

export function getEvent (id, consume = requestor) {
  dispatch(setWaiting())
  return consume(`/events/${id}`).then(res => {
    dispatch(clearWaiting())
    const event = res.body
    return {
      title: event.title,
      gardenName: event.gardenName,
      gardenAddress: event.gardenAddress,
      date: event.date,
      volunteersNeeded: event.volunteersNeeded,
      description: event.description
    }
  }).catch(err => {
    dispatch(showError(err.message))
  })
}

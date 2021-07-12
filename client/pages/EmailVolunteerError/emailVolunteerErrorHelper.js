import requestor from '../../consume'
import { showError } from '../../actions/error'
import { dispatch } from '../../store'

export function getEventDetails (id, consume = requestor) {
  return consume(`/events/${id}`)
    .then((res) => {
      const event = res.body
      return {

        title: event.title,
        gardenName: event.gardenName,
        isVolunteer: event.isVolunteer
      }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

export function checkUserIds (emailId, browserId) {
  return (browserId === Number(emailId))
}

export function handleClick (userId, eventId) {
  const userData = { userId, eventId }

  return requestor('/volunteers', 'post', userData)
    .then(() => {
      console.log('successfully volunteered!')
      return null
    })
    .catch((error) => {
      dispatch(showError(error.message))
      return null
    })
}

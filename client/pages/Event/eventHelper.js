import requestor from '../../consume'
import { dispatch } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'

export function getEvent(id, user, consume = requestor) {
  dispatch(setWaiting())
  return consume(`/events/${id}`)
    .then((res) => {
      dispatch(clearWaiting())
      const {
        id,
        date,
        title,
        gardenId,
        gardenName,
        gardenAddress,
        volunteersNeeded,
        volunteers,
        extraVolunteers,
        description,
        lat,
        lon,
        status,
      } = res.body
      const result = {
        id,
        date,
        title,
        gardenId,
        gardenName,
        gardenAddress,
        volunteersNeeded,
        description,
        lat,
        lon,
        status,
      }
      return user.isAdmin
        ? {
            ...result,
            volunteers,
            extraVolunteers,
          }
        : {
            ...result,
            isVolunteer: volunteers.some((v) => v.userId === user.id),
          }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}

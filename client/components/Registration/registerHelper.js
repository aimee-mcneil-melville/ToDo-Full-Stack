import requestor from '../../consume'
import { dispatch, getState } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { setUser } from '../../actions/user'
import { showError } from '../../actions/error'

export function registerUser (user, authUser, navigateTo, consume = requestor) {
  const newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    gardenId: user.gardenId,
    username: user.username,
    email: authUser.email,
    auth0Id: authUser.sub
  }
  const storeState = getState()
  const { token } = storeState.user

  dispatch(setWaiting())

  return consume('/users', token, 'post', newUser)
    .then((res) => {
      console.log('resbody: ', res.body)
      dispatch(setUser(res.body))
      navigateTo(`/gardens/${user.gardenId}`)
      return res.body
    })
    .catch((err) => {
      console.log(err)
      dispatch(showError(err.message))
    })
    .finally(() => {
      dispatch(clearWaiting())
    })
}

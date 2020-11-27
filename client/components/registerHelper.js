import { register, isAuthenticated, getDecodedToken } from 'authenticare/client'

import { dispatch } from '../store'
import { setUser } from '../actions/user'

export function registerUser (user, navigateTo) {
  const { username, password, gardenId } = user
  register({
    username,
    password,
    gardenId: Number(gardenId)
  },
  { baseUrl: '/api/v1' })
    .then(() => {
      if (isAuthenticated()) {
        const { username, isAdmin, gardenId } = getDecodedToken()
        dispatch(setUser({ username, isAdmin, gardenId }))
        navigateTo('/garden')
      }
      return null
    })
    .catch((error) => {
      console.log('error: ', error.message)
    })
}

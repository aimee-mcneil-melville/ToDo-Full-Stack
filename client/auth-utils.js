// import { isAuthenticated, getDecodedToken } from './auth'

// const emptyUser = { <---- Dont delete?
//   id: null,
//   username: '',
//   isAdmin: false,
//   gardenId: null
// }

export function getUser () {
  // if (isAuthenticated()) {
  // const { username, isAdmin, gardenId, id } = getDecodedToken()
  return {
    username: 'Josh',
    isAdmin: true,
    gardenId: 1,
    id: 2
  }
  // }
  // return emptyUser
}

// import requestor from '../../consume'
// import { dispatch } from '../../store'

// export function getPosts(id, user, consume = requestor) {
//   dispatch(setWaiting())
//   const headers = {
//     Accept: 'application/json',
//     userid: user.id
//   }

//   return consume(`/gardens/${id}/posts`, token, 'get', {}, headers)
//     .then((res) => {
//       const garden = res.body
//       console.log(garden)
//       return null
//     })
//     .catch((error) => {
//       dispatch(showError(error.message))
//     })
// }

export function fetchPostsByGardenId(gardenId) {
  return Promise.resolve([{
    id: 1,
    name: 'replace this and call consume'
  }])
}

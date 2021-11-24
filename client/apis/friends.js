import request from 'superagent'

const rootUrl = '/api/v1'

export function getFriends (id) {
  return request.get(rootUrl + '/friends/' + id)
    .then(res => {
      return res.body.friends
    })
}

export function addFriend (userId, followingId) {
  return request.post(rootUrl + '/friends/' + userId)
    .send({ userId, followingId })
    .then(res => {
      return res.body
    })
}

export function deleteFriend (userId, followingId) {
  return request.delete(rootUrl + '/friend/' + userId)
    .send({ userId, followingId })
    .then(() => {
      console.log('User unfollowed')
      return null
    })
}

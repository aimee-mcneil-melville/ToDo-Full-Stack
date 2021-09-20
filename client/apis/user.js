import request from 'superagent'

const rootUrl = '/api/v1/user'

export function updateUser (userData) {
  return request.patch(rootUrl + userData.id + '/update')
    .send(userData)
    .then(res => res.body)
}

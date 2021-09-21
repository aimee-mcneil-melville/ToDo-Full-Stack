import request from 'superagent'

const rootUrl = '/api/v1'

export function getUsers () {
  return request.get(rootUrl + '/users')
    .then(res => {
      return res.body.users
    })
}

export function addUser (user) {
  return request.post(rootUrl + '/users')
    .send(user)
}

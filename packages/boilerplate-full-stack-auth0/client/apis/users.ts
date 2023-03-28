import request from 'superagent'
import { User, UserData } from '../../models/user'

const rootUrl = '/api/v1'

export function getUsers() {
  return request.get(rootUrl + '/users').then((res) => {
    return res.body.users as User[]
  })
}

export function addUser(user: UserData) {
  return request.post(rootUrl + '/users').send(user)
}

export function getUserRoles(id: string | undefined) {
  return request.get(`${rootUrl}/users/${id}`).then((res) => {
    return res.body.roles as string | undefined
  })
}

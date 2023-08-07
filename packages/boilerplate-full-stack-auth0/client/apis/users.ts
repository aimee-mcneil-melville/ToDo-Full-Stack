import request from 'superagent'
import { User, UserData } from '../../models/user.ts'

const rootUrl = '/api/v1'

export async function getUsers() {
  const res = await request.get(rootUrl + '/users')
  return res.body.users as User[]
}

export async function addUser(user: UserData) {
  await request.post(rootUrl + '/users').send(user)
}

export async function getUserRoles(id: string | undefined) {
  const res = await request.get(`${rootUrl}/users/${id}`)
  return res.body.roles as string | undefined
}

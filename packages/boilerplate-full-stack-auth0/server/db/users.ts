import { User, UserData } from '../../models/user.ts'
import connection from './connection.ts'

export async function getUsers(db = connection) {
  const data = await db('users').select(
    'id',
    'auth0_id as auth0Id',
    'name',
    'email',
    'description'
  )

  return data as User[]
}

export async function addUser(input: UserData, db = connection) {
  const { auth0Id, name, email, description } = input
  const user = { auth0_id: auth0Id, name, email, description }

  return await db('users').insert(user)
}

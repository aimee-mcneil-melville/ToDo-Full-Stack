import request from 'supertest'

jest.mock('../../../server/db/users', () => ({
  userExists: jest.fn(),
  createUser: jest.fn(),
}))

jest.mock('../../../server/auth/token', () => ({
  issue: jest.fn(),
}))

const usersDb = require('../../../server/db/users')
const token = require('../../../server/auth/token')
const server = require('../../../server/server')

test('/register succeeds for new user', () => {
  let expected = 'OK'

  // Mock userExists to return false
  usersDb.userExists.mockImplementation(user_name => Promise.resolve(false))
  // Mock createUser to work (resolve)
  usersDb.createUser.mockImplementation((user_name, first_name, last_name, password) => Promise.resolve())
  // Mock issue to do nothing
  token.issue.mockImplementation((req,res) => res.json({ message: expected, token: 'XXXX' }))

  return request(server).post('/api/auth/register')
  .expect(200)
  .then(res => {
    let actual = res.body.message

    expect(actual).toEqual(expected)
  })
})

test('/register fails for existing user', () => {
  let expected = 'User Name Taken'

  // Mock userExists to return true
  usersDb.userExists.mockImplementation(user_name => Promise.resolve(true))

  return request(server).post('/api/auth/register')
  .expect(400)
  .then(res => {
    let actual = res.body.message

    expect(actual).toEqual(expected)
  })
})

test('/register fails for create error', () => {
  let expected = 'Server Error'

  // Mock userExists to return true
  usersDb.userExists.mockImplementation(user_name => Promise.resolve(false))
  // Mock createUser to fail (reject)
  usersDb.createUser.mockImplementation((user_name, first_name, last_name, password) => Promise.reject())

  return request(server).post('/api/auth/register')
  .expect(500)
  .then(res => {
    let actual = res.body.message

    expect(actual).toEqual(expected)
  })
})

const request = require('supertest')
const server = require('../server')
const db = require('../db/user')
jest.mock('../db/user')

test('PATCH updating user', () => {
  db.updateUser = jest.fn()
  db.updateUser.mockImplementation(() => {
    return Promise.resolve()
  })
  const userData = {}
  return request(server)
    .patch('/api/v1/user/10001/update')
    .send(userData)
    .then((response) => {
      expect(response.status).toBe(200)
      return null
    })
})

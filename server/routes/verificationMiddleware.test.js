const server = require('../server')
const request = require('supertest')

const db = require('../db/volunteers')
const { getMockToken } = require('./mockToken')

jest.mock('../db/volunteers')

const mockNonAdminAuthHeader = {
  Authorization: `Bearer ${getMockToken(1, 'testuser', 'testuser@test.co', false)}`
}

describe('Test verify user function', () => {
  it('responds with 401 when user id in token is different than user id in req.body', () => {
    db.addVolunteer.mockImplementation(() => Promise.resolve(201))
    return request(server)
      .post('/api/v1/volunteers')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 2, eventId: 1 })
      .then(res => {
        expect(res.status).toBe(401)
        return null
      })
  })

  it('responds with 201 when user id in token is the same as user id in req.body', () => {
    db.addVolunteer.mockImplementation(() => Promise.resolve(201))
    return request(server)
      .post('/api/v1/volunteers')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 1, eventId: 1 })
      .then(res => {
        expect(res.status).toBe(201)
        return null
      })
  })
})

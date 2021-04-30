const server = require('../server')
const request = require('supertest')
const { getMockToken } = require('./mockToken')
const db = require('../db/volunteers')
jest.mock('../db/volunteers')

const testAuthHeader = {
    Authorization: `Bearer ${getMockToken(1, 'testuser', 'testuser@test.co', false)}`
}

describe('Test verify user function', () => {
    it('should response with 401 when token user is different with req.body userId', () => {
        db.addVolunteer.mockImplementation(() => Promise.resolve(201))
        return request(server)
            .post('/api/v1/volunteer')
            .set(testAuthHeader)
            .send({ userId: 2, eventId: 1 })
            .then(res => {
                expect(res.status).toBe(401)
                return null
            })
    })

    it('should response with 201 when token user is the same with req.body userId', () => {
        db.addVolunteer.mockImplementation(() => Promise.resolve(201))
        return request(server)
            .post('/api/v1/volunteer')
            .set(testAuthHeader)
            .send({ userId: 1, eventId: 1 })
            .then(res => {
                expect(res.status).toBe(201)
                return null
            })
    })
})

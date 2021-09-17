const request = require('supertest')
const server = require('../server')
const db = require('../db/friends')
jest.mock('../db/friends')

test('GET /user_id return all friends', () => {
  db.getFriends.mockImplementation(() => {
    return Promise.resolve([
      { id: 10001, name: 'Jared', lastName: 'Pinfold', nickname: 'Daoloth69' },
      { id: 10002, name: 'Remington', lastName: 'Smythe', nickname: 'Remmy' },
      { id: 10003, name: 'Gertrude', lastName: 'Diamond', nickname: 'D1am0nd' }
    ])
  })
  return request(server)
    .get('/api/v1/friends/10001')
    .expect(200)
    .then((response) => {
      expect(response.body.friends).toHaveLength(3)
      return null
    })
})

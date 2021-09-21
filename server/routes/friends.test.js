const request = require('supertest')
const server = require('../server')
const db = require('../db/friends')
// const { test } = require('../db/knexfile')
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

test('POST /user_id adds a new friend', () => {
  db.addFriend = jest.fn()
  db.addFriend.mockImplementation(newFriend => {
    return Promise.resolve()
  })
  const newFriend = { id: 10001, name: 'Jared', lastName: 'Pinfold', nickname: 'Daoloth69' }
  return request(server)
    .post('/api/v1/friends/user_id')
    .send(newFriend)
    .expect(200)
    .then((response) => {
      expect(response.status).toBe(200)
      return null
    })
})

test('DELETE deletes user from following list', () => {
  db.deleteFriend = jest.fn()
  db.deleteFriend.mockImplementation(oldFriend => {
    return Promise.resolve()
  })
  return request(server)
    .delete('/api/v1/friends/1')
    .expect(200)
    .then((response) => {
      expect(response.status).toBe(200)
      return null
    })
})

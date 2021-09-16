const request = require('supertest')

const server = require('../server')
const db = require('../db/friends')
const { test } = require('../db/knexfile')

jest.mock('../db/friends')

test('GET /user_id return all friends', () => {
  db.getFriends.mockImplementation(() => {
    return Promise.resolve([
      { id: 1, name: 'test name 1', lastName: 'test lastName 1', nickname: 'test nickname 1' },
      { id: 2, name: 'test name 2', lastName: 'test lastName 2', nickname: 'test nickname 2' },
      { id: 3, name: 'test name 3', lastName: 'test lastName 3', nickname: 'test nickname 3' }
    ])
  })
  return request(server)
    .get('/10001')
    .expect(200)
    // eslint-disable-next-line promise/always-return
    .then(res => {
      console.log('res.body: ', res.body)
      expect(res.body.user_id).toHaveLength(3)
    })
})

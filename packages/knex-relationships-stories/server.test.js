require('@testing-library/jest-dom')
const request = require('supertest')

const { render } = require('./test-utils')
const db = require('./db')
const server = require('./server')

jest.mock('./db')

test('GET / responds with correctly rendered users', () => {
  db.getUsers.mockImplementation(() =>
    Promise.resolve([
      { id: 2, name: 'test user 2', email: 'test2@user.nz' },
      { id: 4, name: 'test user 4', email: 'test4@user.nz' },
    ])
  )

  return request(server)
    .get('/')
    .expect(200)
    .then((res) => {
      const screen = render(res)

      const user2 = screen.getByText('test user 2 (test2@user.nz)')
      expect(user2).toBeInTheDocument()

      const user4 = screen.getByText('test user 4 (test4@user.nz)')
      expect(user4).toBeInTheDocument()
    })
})

const request = require('supertest')

jest.mock('../db', () => ({
  createUser: (userName, myGarden) =>
    Promise.resolve({ userName: 'user', myGarden: 1 })
}))

test('POST /register', () => {
  // Arrange

  // Act
  return request(server)
    .post('/register')

  // Assert
    .then((user) => {
      expect(user.toContain('user', 1))
    }
    )
}
)

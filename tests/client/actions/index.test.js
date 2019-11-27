import {requestLogin} from '../../../client/actions/login'

test('Login request', () => {
  // Arrange
  const expectedType  = 'LOGIN_REQUEST'

  // Act
  const actual = requestLogin()

  // Assert
  expect(actual).toHaveProperty('type')
  expect(actual).toHaveProperty('isFetching')
  expect(actual).toHaveProperty('isAuthenticated')

  expect(actual.type).toEqual(expectedType)
})

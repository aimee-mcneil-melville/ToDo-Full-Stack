import { isAuthenticated, getDecodedToken } from './auth'
import { getUser } from './auth-utils'

jest.mock('./auth')

describe('getUser', () => {
  it('returns user data from token if authenticated', () => {
    isAuthenticated.mockImplementation(() => true)
    getDecodedToken.mockImplementation(() => {
      return {
        username: 'test username',
        isAdmin: false,
        gardenId: 2,
        id: 5
      }
    })
    const user = getUser()
    expect(user.username).toBe('test username')
  })

  it('returns empty user if user not authenticated', () => {
    isAuthenticated.mockImplementation(() => false)
    getDecodedToken.mockImplementation(() => ({}))
    const user = getUser()
    expect(user.username).toBe('')
  })
})

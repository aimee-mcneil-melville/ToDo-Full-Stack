import { signInUser } from './signInHelper'
import { signIn, isAuthenticated, getDecodedToken } from '../auth'
import { dispatch } from '../store'

jest.mock('../auth')
jest.mock('../store')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('signInUser', () => {
  it('signs in and dispatches correctly on signIn success', () => {
    expect.assertions(3)
    signIn.mockImplementation((credentials) => {
      expect(credentials.username).toBe('testuser')
      return Promise.resolve()
    })
    isAuthenticated.mockImplementation(() => true)
    getDecodedToken.mockImplementation(() => ({}))
    const user = {
      username: 'testuser',
      password: 'testpassword'
    }
    const navigateTo = jest.fn()
    return signInUser(user, navigateTo)
      .then(() => {
        expect(navigateTo).toHaveBeenCalledWith('/garden')
        expect(dispatch.mock.calls[1][0]).toHaveProperty('user')
        return null
      })
  })

  it('signs in but dispatches error if not authenticated', () => {
    expect.assertions(2)
    signIn.mockImplementation(() => Promise.resolve())
    isAuthenticated.mockImplementation(() => false)
    const user = {
      username: 'testuser2',
      password: 'testpassword'
    }
    const navigateTo = jest.fn()
    return signInUser(user, navigateTo)
      .then(() => {
        expect(navigateTo).not.toHaveBeenCalled()
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('Not authenticated')
        return null
      })
  })

  it('dispatches error if signIn rejects', () => {
    expect.assertions(2)
    signIn.mockImplementation(() => Promise.reject(new Error('mock error')))
    const user = {
      username: 'baduser',
      password: 'badpassword'
    }
    const navigateTo = jest.fn()
    return signInUser(user, navigateTo)
      .then(() => {
        expect(navigateTo).not.toHaveBeenCalled()
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        return null
      })
  })
})

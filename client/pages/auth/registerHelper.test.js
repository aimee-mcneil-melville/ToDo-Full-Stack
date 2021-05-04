import { registerUser } from './registerHelper'
import { register, isAuthenticated } from '../../auth'
import { dispatch } from '../../store'
import { SET_USER } from '../../actions/user'

jest.mock('../../auth')
jest.mock('../../store')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('registerUser', () => {
  it('registers and dispatches correctly on register success', () => {
    expect.assertions(2)
    register.mockImplementation((newUser) => {
      expect(newUser.gardenId).toBe(1)
      return Promise.resolve()
    })
    isAuthenticated.mockImplementation(() => true)
    const user = {
      username: 'testuser',
      password: 'testpassword',
      gardenId: '1',
      email: 'testemail'
    }
    const navigateTo = jest.fn()
    return registerUser(user, navigateTo)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_USER })
        return null
      })
  })

  it('registers but dispatches error if not authenticated', () => {
    expect.assertions(2)
    register.mockImplementation(() => Promise.resolve())
    isAuthenticated.mockImplementation(() => false)
    const user = {
      username: 'testuser2',
      password: 'testpassword',
      gardenId: '1',
      email: 'testemail'
    }
    const navigateTo = jest.fn()
    return registerUser(user, navigateTo)
      .then(() => {
        expect(navigateTo).not.toHaveBeenCalled()
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('Not authenticated')
        return null
      })
  })

  it('dispatches a generic error if register rejects', () => {
    expect.assertions(2)
    register.mockImplementation(() => Promise.reject(new Error('mock error')))
    const user = {
      username: 'baduser',
      password: 'badpassword',
      gardenId: '3',
      email: 'bademail'
    }
    const navigateTo = jest.fn()
    return registerUser(user, navigateTo)
      .then(() => {
        expect(navigateTo).not.toHaveBeenCalled()
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        return null
      })
  })

  it('dispatches an error when registering an existing username', () => {
    expect.assertions(2)
    register.mockImplementation(() => Promise.reject(new Error('USERNAME_UNAVAILABLE')))
    const user = {
      username: 'baduser',
      password: 'badpassword',
      gardenId: '3'
    }
    const navigateTo = jest.fn()
    return registerUser(user, navigateTo)
      .then(() => {
        expect(navigateTo).not.toHaveBeenCalled()
        expect(dispatch.mock.calls[1][0].errorMessage).toMatch('username is not available')
        return null
      })
  })
})

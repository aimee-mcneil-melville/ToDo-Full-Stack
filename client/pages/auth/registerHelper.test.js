import { registerUser } from './registerHelper'
import { register, isAuthenticated, getDecodedToken } from '../../auth'
import { dispatch } from '../../store'

jest.mock('../../auth')
jest.mock('../../store')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('registerUser', () => {
  it('registers and dispatches correctly on register success', () => {
    expect.assertions(3)
    register.mockImplementation((newUser) => {
      expect(newUser.gardenId).toBe(1)
      return Promise.resolve()
    })
    isAuthenticated.mockImplementation(() => true)
    getDecodedToken.mockImplementation(() => ({}))
    const user = {
      username: 'testuser',
      password: 'testpassword',
      gardenId: '1'
    }
    const navigateTo = jest.fn()
    return registerUser(user, navigateTo)
      .then(() => {
        expect(navigateTo).toHaveBeenCalledWith('/garden')
        expect(dispatch.mock.calls[1][0]).toHaveProperty('user')
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
      gardenId: '1'
    }
    const navigateTo = jest.fn()
    return registerUser(user, navigateTo)
      .then(() => {
        expect(navigateTo).not.toHaveBeenCalled()
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('Not authenticated')
        return null
      })
  })

  it('dispatches error if register rejects', () => {
    expect.assertions(2)
    register.mockImplementation(() => Promise.reject(new Error('mock error')))
    const user = {
      username: 'baduser',
      password: 'badpassword',
      gardenId: '3'
    }
    const navigateTo = jest.fn()
    return registerUser(user, navigateTo)
      .then(() => {
        expect(navigateTo).not.toHaveBeenCalled()
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        return null
      })
  })
})

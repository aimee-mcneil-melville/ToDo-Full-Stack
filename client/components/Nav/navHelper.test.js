import { CLEAR_USER } from '../../actions/user'
import { logOff } from '../../auth'
import { dispatch } from '../../store'

import { logOut, getLinks } from './navHelper'

jest.mock('../../auth')
jest.mock('../../store')

describe('logOut', () => {
  it('calls logOff and dispatches the clear user action', () => {
    logOut()
    expect(logOff).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_USER })
  })
})

describe('getLinks', () => {
  it('returns "register" and "home" on the "/signin" route', () => {
    const links = getLinks('/signin')
    expect(links).toHaveLength(2)
    expect(links[0].name).toBe('Register')
    expect(links[1].to).toBe('/')
  })

  it('returns "sign in" and "home" on the "/register" route', () => {
    const links = getLinks('/register')
    expect(links).toHaveLength(2)
    expect(links[0].name).toBe('Sign in')
    expect(links[1].to).toBe('/')
  })

  it('returns "register" and "sign in" on the "/" route', () => {
    const links = getLinks('/')
    expect(links).toHaveLength(2)
    expect(links[0].name).toBe('Sign in')
    expect(links[1].to).toBe('/register')
  })
})

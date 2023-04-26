import { isUserAdmin } from '../../../functions/5-stretch-extending-interfaces'

describe('isUserAdmin', () => {
  it('returns true if the user is an admin', () => {
    const user = {
      name: 'Josh',
      email: 'joshmygosh@hello.com',
      role: 'admin' as 'admin',
    }

    expect(isUserAdmin(user)).toBe(true)
  })

  it('returns false if the user is NOT an admin', () => {
    const user = {
      name: 'Josh',
      email: 'joshmygosh@hello.com',
      role: 'user' as 'user',
    }

    expect(isUserAdmin(user)).toBe(false)
  })
})

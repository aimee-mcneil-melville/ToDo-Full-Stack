import { describe, it, expect } from 'vitest'
import { isUserAdmin } from '../../../functions/5-stretch-extending-interfaces'

describe('isUserAdmin', () => {
  it('returns true if the user is an admin', () => {
    const user = {
      name: 'Josh',
      email: 'joshmygosh@hello.com',
      role: 'admin',
    } as const

    expect(isUserAdmin(user)).toBe(true)
  })

  it('returns false if the user is NOT an admin', () => {
    const user = {
      name: 'Josh',
      email: 'joshmygosh@hello.com',
      role: 'user',
    } as const

    expect(isUserAdmin(user)).toBe(false)
  })
})

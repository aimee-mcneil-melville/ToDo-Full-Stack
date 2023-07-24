import { describe, it, expect } from 'vitest'
import { getAdmins } from '../../../functions/5-stretch-extending-interfaces'

describe('getAdmins', () => {
  it('returns an array of admins', () => {
    const users = [
      { name: 'Hemi', email: 'hemi@hello.com', role: 'user' as const },
      { name: 'Marama', email: 'marama@hello.com', role: 'admin' as const },
      { name: 'Lucy', email: 'luckyducky@hello.com', role: 'user' as const },
      { name: 'Josh', email: 'joshmygosh@hello.com', role: 'admin' as const },
    ]

    const actual = getAdmins(users)

    expect(Array.isArray(actual)).toBe(true)
    expect(actual).toHaveLength(2)
    expect(actual[0].name).toBe('Marama')
    expect(actual[1].name).toBe('Josh')
  })

  it('returns an empty array if there are no admins', () => {
    const users = [
      { name: 'Hemi', email: 'hemi@hello.com', role: 'user' as const },
      { name: 'Marama', email: 'marama@hello.com', role: 'user' as const },
      { name: 'Lucy', email: 'luckyducky@hello.com', role: 'user' as const },
      { name: 'Josh', email: 'joshmygosh@hello.com', role: 'user' as const },
    ]

    const actual = getAdmins(users)

    expect(Array.isArray(actual)).toBe(true)
    expect(actual).toHaveLength(0)
  })
})

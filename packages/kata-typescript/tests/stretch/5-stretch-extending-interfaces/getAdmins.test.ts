import { getAdmins } from '../../../functions/5-stretch-extending-interfaces'

describe('getAdmins', () => {  
  it('returns an array of admins', () => {
    const users = [
      { name: 'Hemi', email: 'hemi@hello.com', role: 'user' as 'user' },
      { name: 'Marama', email: 'marama@hello.com', role: 'admin' as 'admin' },
      { name: 'Lucy', email: 'luckyducky@hello.com', role: 'user' as 'user' },
      { name: 'Josh', email: 'joshmygosh@hello.com', role: 'admin' as 'admin' },
    ]
    
    const actual = getAdmins(users)

    expect(Array.isArray(actual)).toBe(true)
    expect(actual).toHaveLength(2)
    expect(actual[0].name).toBe('Marama')
    expect(actual[1].name).toBe('Josh')
  })

  it('returns an empty array if there are no admins', () => {
    const users = [
      { name: 'Hemi', email: 'hemi@hello.com', role: 'user' as 'user' },
      { name: 'Marama', email: 'marama@hello.com', role: 'user' as 'user' },
      { name: 'Lucy', email: 'luckyducky@hello.com', role: 'user' as 'user' },
      { name: 'Josh', email: 'joshmygosh@hello.com', role: 'user' as 'user' },
    ]

    const actual = getAdmins(users)

    expect(Array.isArray(actual)).toBe(true)
    expect(actual).toHaveLength(0)
  })
})

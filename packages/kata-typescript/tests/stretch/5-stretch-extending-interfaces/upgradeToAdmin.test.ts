import { upgradeToAdmin } from '../../../functions/5-stretch-extending-interfaces'

describe('upgradeToAdmin', () => {
  it('returns an object with the correct properties', () => {
    const user = {
      name: 'Lucy',
      email: 'luckyducky@hello.com',
      picture: 'https://www.hello.com/luckyducky.jpg',
      role: 'user',
    } as const

    const actual = upgradeToAdmin(user)

    expect(actual).toHaveProperty('name')
    expect(actual).toHaveProperty('email')
    expect(actual).toHaveProperty('picture')
    expect(actual).toHaveProperty('role')
    expect(actual.name).toBe('Lucy')
    expect(actual.email).toBe('luckyducky@hello.com')
    expect(actual.picture).toBe('https://www.hello.com/luckyducky.jpg')
    expect(actual.role).toBe('admin')
  })
})

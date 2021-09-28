const { isAdmin } = require('./auth')

describe('auth0 roles', () => {
  it('should return true if admin exits', () => {
    const actual = isAdmin([{ name: 'admin' }, { name: 'other-role' }])
    expect(actual).toBeTruthy()
  })

  it('should return false if admin does not exist', () => {
    const actual = isAdmin([{ name: 'other-role' }])
    expect(actual).toBeFalsy()
  })

  it('should return false for an empty array', () => {
    const actual = isAdmin([])
    expect(actual).toBeFalsy()
  })
})

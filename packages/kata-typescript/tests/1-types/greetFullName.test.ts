import { greetFullName } from '../../functions/1-types'

describe('greetFullName (OPTIONAL PARAMETER)', () => {
  it('returns a string', () => {
    expect(typeof greetFullName('first', 'last')).toBe('string')
  })

  it('return contains the full name (no middle name)', () => {
    expect(greetFullName('first', 'last')).toBe('Hello first last')
    expect(greetFullName('Bruce', 'Wayne')).toBe('Hello Bruce Wayne')
  })

  it('return contains the full name (including middle)', () => {
    expect(greetFullName('first', 'last', 'middle')).toBe(
      'Hello first middle last'
    )
    expect(greetFullName('Bruce', 'Wayne', 'Thomas')).toBe(
      'Hello Bruce Thomas Wayne'
    )
  })
})

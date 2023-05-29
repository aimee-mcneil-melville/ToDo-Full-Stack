import { createUserObj } from '../../../functions/5-stretch-extending-interfaces'

describe('createUserObj', () => {
  it('returns an object with the correct properties (no picture supplied)', () => {
    const expected = {
      name: 'Marama',
      email: 'marama@hello.com',
      role: 'user',
    }

    expect(createUserObj('Marama', 'marama@hello.com')).toEqual(expected)
  })

  it('returns an object with the correct properties including picture', () => {
    const expected = {
      name: 'Hemi',
      email: 'hemi@hello.com',
      picture: 'https://www.hello.com/hemi.jpg',
      role: 'user',
    }

    const actual = createUserObj(
      'Hemi',
      'hemi@hello.com',
      'https://www.hello.com/hemi.jpg'
    )

    expect(actual).toEqual(expected)
  })
})

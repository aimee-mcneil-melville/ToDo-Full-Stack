import * as interfaces from '../files/3-interfaces'

const contacts = [
  { id: 1, name: 'John', address: '123 Main St' },
  { id: 2, name: 'Batman', address: 'Wayne Manor' },
  { id: 3, name: 'Minnie Mouse', address: 'Disneyland'},
  { id: 4, name: 'Kermit the Frog', address: 'Sesame St or the Swamp' },
]

describe('getAddress', () => {
  it('returns a string', () => {
    expect(typeof interfaces.getAddress(contacts[0])).toBe('string')
  })

  it('returns the correct address of the contacts', () => {
    contacts.forEach((contact) => {
      expect(interfaces.getAddress(contact)).toBe(contact.address)
    })
  })
})

describe('howManyFriends', () => {
  it('returns a number', () => {
    expect(typeof interfaces.howManyFriends(contacts)).toBe('number')
  })

  it('returns the correct number of contacts', () => {
    expect(interfaces.howManyFriends(contacts)).toBe(4)
  })
})

describe('findTheBat', () => {
  it('returns null if there is no Batman', () => {
    const normalPeople = contacts.filter((contact) => contact.name !== 'Batman')
    expect(interfaces.findTheBat(normalPeople)).toBeNull()
  })

  it('returns a string if Batman is present', () => {
    expect(typeof interfaces.findTheBat(contacts)).toBe('string')
  })

  it('returns the address of Batman', () => {
    expect(interfaces.findTheBat(contacts)).toBe('Wayne Manor')
  })
})

describe('generateNewUser', () => {
  it('returns an object', () => {
    expect(typeof interfaces.generateNewUser('John')).toBe('object')
  })

  it('returns an object with the correct properties', () => {
    const user = interfaces.generateNewUser('John')
    expect(user.name).toBe('John')
    expect(user.verified).toBe(false)
    expect(user.picture).toBeUndefined()
    expect(user.email).toBeUndefined()
  })
})

describe('verifyUser', () => {
  const user = {
    name: 'Amy',
    verified: false,
  }
  const actual = interfaces.verifyUser(user, 'amy@hello.com')

  it('returns a (new) object', () => {
    expect(typeof actual).toBe('object')
    expect(actual).not.toBe(user)
  })

  it('returns an object with the correct properties', () => {
    expect(actual.name).toBe('Amy')
    expect(actual.verified).toBe(true)
    expect(actual.email).toBe('amy@hello.com')
    expect(actual.picture).toBeUndefined()
  })
})

describe('updateUserPhoto', () => {
  const user = {
    name: 'Amy',
    verified: false,
  }
  const actual = interfaces.updateUserPhoto(user, 'https://example.com/amy.jpg')

  it('returns a (new) object', () => {
    expect(typeof actual).toBe('object')
    expect(actual).not.toBe(user)
  })

  it('returns an object with the correct properties', () => {
    expect(actual.name).toBe('Amy')
    expect(actual.verified).toBe(false)
    expect(actual.picture).toBe('https://example.com/amy.jpg')
    expect(actual.email).toBeUndefined()
  })
})

describe('getUserPhoto', () => {
  it('returns a string containing the users photo', () => {
    const user = {
      name: 'Amy',
      verified: false,
      picture: 'https://example.com/amy.jpg',
    }
    expect(typeof interfaces.getUserPhoto(user)).toBe('string')
    expect(interfaces.getUserPhoto(user)).toBe('https://example.com/amy.jpg')
  })

  it('returns a string containing a kitten if the user has no photo', () => {
    const user = {
      name: 'Amy',
      verified: false,
    }
    expect(typeof interfaces.getUserPhoto(user)).toBe('string')
    expect(interfaces.getUserPhoto(user)).toBe('https://placekitten.com/200/300')
  })
})

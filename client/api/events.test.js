import { postEvent, patchEvent, getEventById } from './events'

jest.mock('../store')

test('postEvent', () => {
  const consume = () => Promise.resolve({
    body: {
      id: 1,
      title: 'testevent'
    }
  })
  return postEvent({}, consume)
    .then((event) => {
      expect(event.id).toBe(1)
      return null
    })
})

test('patchEvent', () => {
  const consume = () => Promise.resolve({
    body: {
      id: 1,
      title: 'title',
      date: '01/12/2020',
      description: 'this is the description',
      volunteers_needed: 9

    }
  })
  return patchEvent({}, consume)
    .then((event) => {
      expect(event.id).toBe(1)
      return null
    })
})

test('getEventById return a id', () => {
  const consume = () => Promise.resolve({
    body: {
      id: 1,
      title: 'Patrick'
    }
  })
  const id = consume.id
  return getEventById(id, consume)
    .then((event) => {
      expect(event.id).toBe(1)
      expect(event.title).toBe('Patrick')
      return null
    })
})

import { getEvents } from '../../server/db/event'
import { addEvent, getEventsById } from './events'

test('addEvent', () => {
  const consume = () => Promise.resolve({
    body: {
      id: 1,
      title: 'testevent'
    }
  })
  return addEvent({}, consume)
    .then((event) => {
      expect(event.id).toBe(1)
      return null
    })
})

test('getEvents return a id', () => {
  const consume = () => Promise.resolve({
    body: {
      id: 1,
      title : 'Patrick'
    }
  })
  const id = consume.id
  return getEventsById(id, consume)
    .then((event) => {
      expect(event.id).toBe(1)
      return null
    })
})

import { addEvent } from './events'

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

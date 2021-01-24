import {
  postEvent,
  patchEvent,
  getEventById
} from './events'

describe('getEventById', () => {
  it('builds url correctly and returns res.body', () => {
    expect.assertions(2)
    function consume (url) {
      expect(url).toBe('/events/1')
      return Promise.resolve({
        body: {
          title: 'Patricks event'
        }
      })
    }
    return getEventById(1, consume)
      .then((event) => {
        expect(event.title).toBe('Patricks event')
        return null
      })
  })
})

describe('postEvent', () => {
  it('calls consume correctly and returns res.body', () => {
    expect.assertions(4)
    function consume (url, method, event) {
      expect(url).toBe('/events')
      expect(method).toBe('post')
      expect(event.title).toBe('test event')
      return Promise.resolve({
        body: {
          id: 2,
          title: 'test event'
        }
      })
    }
    return postEvent({ title: 'test event' }, consume)
      .then((newEvent) => {
        expect(newEvent.id).toBe(2)
        return null
      })
  })
})

describe('patchEvent', () => {
  it('builds url correctly and returns res.body', () => {
    function consume (url, method, event) {
      expect(url).toBe('/events/1')
      expect(method).toBe('patch')
      expect(event.title).toBe('epic event')
      return Promise.resolve({
        body: {
          id: 1,
          title: 'epic event'
        }
      })
    }
    return patchEvent({ id: 1, title: 'epic event' }, consume)
      .then((event) => {
        expect(event.id).toBe(1)
        return null
      })
  })
})

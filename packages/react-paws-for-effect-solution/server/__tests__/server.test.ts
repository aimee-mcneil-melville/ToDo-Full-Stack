import request from 'supertest'

import server from '../server'

describe('server', () => {
  it('serves the index.html', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toContain('text/html')
  })
})

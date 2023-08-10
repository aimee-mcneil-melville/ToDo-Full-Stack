import { describe, test, expect } from 'vitest'
import nock from 'nock'
import request from 'supertest'

import server from './server.ts'

describe('Reddit API', () => {
  test('GET /api/v1/reddit/subreddit', async () => {
    const scope = nock('https://www.reddit.com')
      .get('/r/bananas.json')
      .reply(200, { data: { children: { msg: 'yay, bananas' } } })

    const res = await request(server)
      .get('/api/v1/reddit/subreddit/bananas')
      .expect(200)
      
    expect(scope.isDone()).toBe(true)
    expect(res.body.msg).toBe('yay, bananas')
  })
})

// @vitest-environment jsdom
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { renderRoute } from '../test-setup.tsx'
import nock from 'nock'

const EXAMPLE_POST = {
  author: {
    id: 1,
    self: '/api/v1/users/1',
    posts: '/api/v1/postsby/gerard',
    user_name: 'gerard',
    display_name: 'jombo',
    bio: 'Living on the beach',
  },
  id: 123,
  self: '/api/v1/posts/123',
  text: 'not much rn',
  created_at: 1705455270000,
  reply_count: 0,
  replies: '/api/v1/posts/1/replies',
}

beforeEach(() => {
  // This fakes that we are already logged in
  localStorage.clear()
  localStorage.setItem(
    'korihi-credentials',
    JSON.stringify({
      username: 'testing',
      password: 'testing',
    }),
  )
})

// rendering the timestamps is time sensitive
vi.setSystemTime(1705538770253)

describe('The post page', () => {
  it('shows a loading indicator', async () => {
    const scope = nock('https://korihi.devacademy.life')
      .get('/api/v1/posts')
      .reply(200, { items: [EXAMPLE_POST] })

    const screen = renderRoute('/')
    // You've got to login to see anything
    // vi.runAllTimers()

    const loadingIndicator = await screen.findByLabelText('Loading...')
    expect(loadingIndicator).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })

  it('renders a list of posts', async () => {
    const scope = nock('https://korihi.devacademy.life')
      .get('/api/v1/posts')
      .reply(200, { items: [EXAMPLE_POST] })

    const screen = renderRoute('/')
    // You've got to login to see anything

    const profilePic = await screen.findByAltText('portrait of gerard')
    expect(profilePic).toBeVisible()
    const selfLink = await screen.findByRole('link', { name: '11 hr ago' })
    expect(selfLink).toBeVisible()
    expect(await screen.findByText('not much rn')).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})

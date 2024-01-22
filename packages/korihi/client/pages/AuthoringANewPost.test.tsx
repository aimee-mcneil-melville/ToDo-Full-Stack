// @vitest-environment jsdom
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { renderRoute } from '../test-setup.tsx'
import { waitFor, within } from '@testing-library/react/pure'
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

const NEW_POST = {
  author: {
    id: 1,
    self: '/api/v1/users/1',
    posts: '/api/v1/postsby/gerard',
    user_name: 'gerard',
    display_name: 'jombo',
    bio: 'Living on the beach',
  },
  id: 124,
  self: '/api/v1/posts/123',
  text: 'This is a test',
  created_at: 1705538770253,
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

vi.setSystemTime(1705538770253)

describe('Authoring a post', () => {
  it('sends data to the API', async () => {
    const initialLoad = nock('https://korihi.devacademy.life')
      .get('/api/v1/posts')
      .reply(200, { items: [EXAMPLE_POST] })

    const { user, ...screen } = renderRoute('/')
    await waitFor(() => {
      expect(initialLoad.isDone()).toBe(true)
    })

    const postScope = nock('https://korihi.devacademy.life')
      .post('/api/v1/posts', { text: 'This is a test' })
      .reply(201)

    const refreshScope = nock('https://korihi.devacademy.life')
      .get('/api/v1/posts')
      .reply(200, {
        items: [EXAMPLE_POST, NEW_POST],
      })
    const composeForm = await screen.findByRole('form', {
      name: 'Compose post',
    })

    expect(composeForm).toBeVisible()
    const textarea = within(composeForm).getByRole('textbox')
    const button = within(composeForm).getByRole('button')
    await user.type(textarea, 'This is a test')
    await user.click(button)
    expect(postScope.isDone()).toBe(true)

    expect(await screen.findByText('This is a test'))
    expect(refreshScope.isDone()).toBe(true)
  })
})

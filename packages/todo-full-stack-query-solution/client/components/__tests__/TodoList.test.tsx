// @vitest-environment jsdom
import nock from 'nock'
import {
  screen,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react/pure'
import { describe, it, expect, afterEach, afterAll, vi } from 'vitest'
import { renderRoute } from '../../test-utils.tsx'

afterEach(() => {
  nock.cleanAll()
})

afterAll(() => {
  nock.restore()
})

const todos = [
  {
    id: 100,
    task: 'Laundry',
    completed: 0,
    priority: 2,
  },
  {
    id: 101,
    task: 'Dishes',
    completed: 0,
    priority: 1,
  },
  {
    id: 102,
    task: 'Sleep',
    completed: 1,
    priority: 3,
  },
]

describe('TodoList', () => {
  it('renders a loading indicator', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    renderRoute()

    const loading = await screen.queryByText(/loading/i)
    expect(loading).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    expect(scope.isDone()).toBeTruthy()
  })

  it('renders a list of todos', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const list = screen.getByRole('list', { name: /todo/i })
    const listItems = within(list).getAllByRole('listitem')

    expect(listItems).toHaveLength(3)
    expect(scope.isDone()).toBeTruthy()
  })

  it('renders a list of active todos', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    renderRoute('/active')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const list = screen.getByRole('list', { name: /todo/i })
    const listItems = within(list).getAllByRole('listitem')

    expect(listItems).toHaveLength(2)
    expect(scope.isDone()).toBeTruthy()
  })

  it('renders a list of completed todos', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    renderRoute('/completed')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const list = screen.getByRole('list', { name: /todo/i })
    const listItems = within(list).getAllByRole('listitem')

    expect(listItems).toHaveLength(1)
    expect(scope.isDone()).toBeTruthy()
  })

  it('renders an Error message', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const scope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(500, { message: 'Internal Server Error' })

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const error = screen.getByText(/internal server error/i)

    expect(error).toBeInTheDocument()
    expect(scope.isDone()).toBeTruthy()
  })
})

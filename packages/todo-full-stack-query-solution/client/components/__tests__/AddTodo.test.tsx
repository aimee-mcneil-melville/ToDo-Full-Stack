// @vitest-environment jsdom
import nock from 'nock'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react/pure'
import { describe, it, expect, afterEach, afterAll } from 'vitest'
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
]

describe('AddTodo', () => {
  it('adds a todo', async () => {
    const fetchScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    const addRequest = nock('http://localhost').post('/api/v1/todos').reply(200)

    const refetchScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, [
        ...todos,
        {
          id: 102,
          task: 'Sleep',
          completed: 1,
          priority: 3,
        },
      ])

    const { user } = renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    const input = screen.getByRole('textbox', { name: /Add task to do/i })
    const list = screen.getByRole('list', { name: /todo/i })
    const items = within(list).getAllByRole('listitem')

    expect(input).toBeInTheDocument()
    expect(items).toHaveLength(2)
    expect(fetchScope.isDone()).toBeTruthy()

    user.type(input, 'Test{enter}')

    await waitFor(() =>
      expect(screen.findAllByText(/sleep/i)).resolves.toBeTruthy()
    )
    const refetchItems = within(list).getAllByRole('listitem')

    expect(refetchItems).toHaveLength(3)
    expect(refetchScope.isDone()).toBeTruthy()
    expect(addRequest.isDone()).toBeTruthy()
  })
})

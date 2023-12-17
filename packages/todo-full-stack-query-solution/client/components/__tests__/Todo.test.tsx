// @vitest-environment jsdom
import nock from 'nock'
import {
  screen,
  within,
  waitForElementToBeRemoved,
  waitFor,
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
]

describe('Todo', () => {
  it('renders a list item', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const list = screen.getByRole('list', { name: /todo/i })
    const items = within(list).getAllByRole('listitem')
    const firstItem = items[0]

    expect(firstItem).toBeInTheDocument()
    expect(firstItem).toMatchInlineSnapshot(`
      <li
        class=""
      >
        <div
          class="view"
        >
          <label
            class="sr-only"
            for="toggle Laundry"
          >
            Laundry
          </label>
          <input
            class="toggle"
            id="toggle Laundry"
            type="checkbox"
          />
          <label
            for="Laundry"
            tabindex="0"
          >
            Laundry
          </label>
          <button
            aria-label="delete Laundry task"
            class="destroy"
          />
        </div>
        <form>
          <input
            class="edit"
            id="Laundry"
            type="text"
            value="Laundry"
          />
        </form>
      </li>
    `)
    expect(scope.isDone()).toBeTruthy()
  })
  it('marks a todo as complete', async () => {
    const fetchScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    const updateRequest = nock('http://localhost')
      .patch('/api/v1/todos/100')
      .reply(200)

    const refetchScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, [
        {
          ...todos[0],
          completed: 1,
        },
      ])

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(fetchScope.isDone()).toBeTruthy()

    const list = screen.getByRole('list', { name: /todo/i })
    const items = within(list).getAllByRole('listitem')
    const firstItem = items[0]
    const checkbox = within(firstItem).getByRole('checkbox')

    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()

    checkbox.click()

    await waitFor(() => {
      expect(checkbox).toBeChecked()
    })

    expect(updateRequest.isDone()).toBeTruthy()
    expect(refetchScope.isDone()).toBeTruthy()
  })
  it('deletes a todo', async () => {
    const fetchScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    const deleteRequest = nock('http://localhost')
      .delete('/api/v1/todos/100')
      .reply(200)

    const refetchScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, [])

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(fetchScope.isDone()).toBeTruthy()

    const list = screen.getByRole('list', { name: /todo/i })
    const items = within(list).getAllByRole('listitem')
    const firstItem = items[0]

    const deleteButton = within(firstItem).getByRole('button', {
      name: /delete/i,
    })

    expect(deleteButton).toBeInTheDocument()

    deleteButton.click()

    await waitFor(() => {
      expect(deleteButton).not.toBeInTheDocument()
    })

    expect(deleteRequest.isDone()).toBeTruthy()
    expect(refetchScope.isDone()).toBeTruthy()
  })
})

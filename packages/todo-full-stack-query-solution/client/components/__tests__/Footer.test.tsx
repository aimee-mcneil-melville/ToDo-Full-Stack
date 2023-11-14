// @vitest-environment jsdom
import nock from 'nock'
import { screen, waitForElementToBeRemoved } from '@testing-library/react/pure'
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
    completed: 1,
    priority: 1,
  },
]

describe('Footer', () => {
  it('renders a footer when there are todos', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const footer = screen.getByRole('contentinfo')

    expect(footer).toBeInTheDocument()
    expect(scope.isDone()).toBeTruthy()
  })

  it('does not render a footer when there are no todos', async () => {
    const scope = nock('http://localhost').get('/api/v1/todos').reply(200, [])

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const footer = screen.queryByRole('contentinfo')

    expect(footer).not.toBeInTheDocument()
    expect(scope.isDone()).toBeTruthy()
  })

  it('renders the correct number of items left', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, todos)

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const count = screen.getByText(/1*item left/i)

    expect(count).toBeInTheDocument()
    expect(scope.isDone()).toBeTruthy()
  })
})

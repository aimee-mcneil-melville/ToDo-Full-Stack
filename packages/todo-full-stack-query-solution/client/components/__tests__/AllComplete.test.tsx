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
]

describe('AllComplete', () => {
  it('renders a checkbox', async () => {
    const scope = nock('http://localhost')
      .persist()
      .get('/api/v1/todos')
      .reply(200, todos)

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const checkbox = screen.getByRole('checkbox', {
      name: /mark all as complete/i,
    })

    expect(checkbox).toBeInTheDocument()
    expect(scope.isDone()).toBeTruthy()
  })

  it('marks all as complete', async () => {
    nock.disableNetConnect()
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
          id: 100,
          task: 'Laundry',
          completed: 1,
          priority: 2,
        },
      ])

    const { user } = renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    expect(fetchScope.isDone()).toBeTruthy()

    const checkbox = screen.getByRole('checkbox', {
      name: /mark all as complete/i,
    })
    const list = screen.getByRole('list', { name: /todo/i })
    const tickBox = within(list).getByRole('checkbox') as HTMLInputElement

    expect(checkbox).toBeInTheDocument()
    expect(tickBox).not.toBeChecked()
    expect(fetchScope.isDone()).toBeTruthy()

    await user.click(checkbox)
    await waitFor(() => expect(tickBox).toBeChecked())

    expect(updateRequest.isDone()).toBeTruthy()
    expect(refetchScope.isDone()).toBeTruthy()
  })
})

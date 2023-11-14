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

describe('App', () => {
  it('renders a heading', async () => {
    const scope = nock('http://localhost').get('/api/v1/todos').reply(200, [])

    renderRoute()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const header = screen.getByRole('heading', { name: /todos/i })

    expect(header).toBeInTheDocument()
    expect(scope.isDone()).toBeTruthy()
  })
})

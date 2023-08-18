// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import nock from 'nock'
import { screen, waitFor } from '@testing-library/react'
import setupApp from '../test-utils.tsx'

const testWidget = {
  id: 1,
  name: 'Test Widget',
  price: 10.0,
  mfg: 'Test',
  inStock: 2,
  rating: 5,
}

describe('App', () => {
  it('renders widgets from the API', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [testWidget])

    setupApp()

    const widget = await screen.findByRole('heading', { name: 'Test Widget' })

    expect(widget).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('gives an error message when the API is down', async () => {
    const scope = nock('http://localhost').get('/api/v1/widgets/').reply(500)

    setupApp()

    const errorMessage = await screen.findByText(/Error/i)
    expect(scope.isDone()).toBe(true)

    expect(errorMessage).toBeInTheDocument()
  })

  it('shows a form when the Add Widget button is clicked', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [])

    const { user } = setupApp()
    const button = await screen.findByRole('button', { name: /Add Widget/i })
    await user.click(button)

    const form = await screen.findByRole('form', { name: /Widget form/i })

    expect(form).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('closes the form when the Cancel button is clicked', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [])

    const { user } = setupApp()

    const button = await screen.findByRole('button', { name: /Add Widget/i })
    await user.click(button)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()

    const cancelButton = screen.getByRole('button', { name: /Cancel/i })
    await user.click(cancelButton)

    await waitFor(() => {
      expect(form).not.toBeInTheDocument()
    })

    expect(scope.isDone()).toBe(true)
  })
})

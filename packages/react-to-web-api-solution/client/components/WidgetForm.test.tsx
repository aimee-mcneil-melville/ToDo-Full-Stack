// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import nock from 'nock'
import { render, screen, waitFor } from '@testing-library/react'
import setupApp from '../test-utils.tsx'

const testWidget = {
  id: 1,
  name: 'Test Widget',
  price: 10.0,
  mfg: 'Test',
  inStock: 2,
  rating: 5,
}

describe('WidgetForm', () => {
  it('adds a widget', async () => {
    const loadScope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [])

    const postScope = nock('http://localhost')
      .post('/api/v1/widgets/')
      .reply(200, [testWidget])

    const { user } = setupApp()
    const button = await screen.findByRole('button', { name: /Add Widget/i })
    await user.click(button)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()
    expect(loadScope.isDone()).toBe(true)

    const nameInput = screen.getByLabelText(/Name/i)
    const priceInput = screen.getByLabelText(/Price/i)
    const mfgInput = screen.getByLabelText(/Manufacturer/i)
    const inStockInput = screen.getByLabelText(/In stock/i)
    const ratingInput = screen.getByLabelText(/Rating/i)

    await user.type(nameInput, 'Test Widget')
    await user.type(priceInput, '10.0')
    await user.type(mfgInput, 'Test')
    await user.type(inStockInput, '2')
    await user.type(ratingInput, '5')

    const submitButton = screen.getByRole('button', { name: /Submit/i })
    await user.click(submitButton)

    await waitFor(() => expect(postScope.isDone()).toBe(true))

    const widget = await screen.findByRole('heading', { name: 'Test Widget' })

    expect(widget).toBeInTheDocument()
    expect(postScope.isDone()).toBe(true)
  })

  it('shows an error message when adding a widget fails', async () => {
    const loadScope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [])

    const postScope = nock('http://localhost')
      .post('/api/v1/widgets/')
      .reply(500)

    const { user } = setupApp()
    const button = await screen.findByRole('button', { name: /Add Widget/i })
    await user.click(button)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()
    expect(loadScope.isDone()).toBe(true)

    const submitButton = screen.getByRole('button', { name: /Submit/i })
    await user.click(submitButton)

    await waitFor(() => expect(postScope.isDone()).toBe(true))

    const errorMessage = await screen.findByText(/Error/i)

    expect(errorMessage).toBeInTheDocument()
    expect(postScope.isDone()).toBe(true)
  })
})

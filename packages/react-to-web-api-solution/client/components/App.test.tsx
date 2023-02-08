import nock from 'nock'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

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

    render(<App />)

    const widget = await screen.findByRole('heading', { name: 'Test Widget' })

    expect(widget).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('gives an error message when the API is down', async () => {
    const scope = nock('http://localhost').get('/api/v1/widgets/').reply(500)

    render(<App />)

    await waitFor(() => {
      expect(scope.isDone()).toBe(true)
    })

    const errorMessage = await screen.findByText(/Error/i)

    expect(errorMessage).toBeInTheDocument()
  })

  it('shows a form when the Add Widget button is clicked', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [])

    render(<App />)
    const button = await screen.findByRole('button', { name: /Add Widget/i })
    fireEvent.click(button)

    const form = await screen.findByRole('form', { name: /Widget form/i })

    expect(form).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('closes the form when the Cancel button is clicked', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [])

    render(<App />)
    const button = await screen.findByRole('button', { name: /Add Widget/i })
    fireEvent.click(button)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()

    const cancelButton = screen.getByRole('button', { name: /Cancel/i })
    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(form).not.toBeInTheDocument()
    })

    expect(scope.isDone()).toBe(true)
  })

  it('adds a widget', async () => {
    const loadScope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [])

    const postScope = nock('http://localhost')
      .post('/api/v1/widgets/')
      .reply(200, [testWidget])

    render(<App />)

    const button = await screen.findByRole('button', { name: /Add Widget/i })
    fireEvent.click(button)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()
    expect(loadScope.isDone()).toBe(true)

    const nameInput = screen.getByLabelText(/Name/i)
    const priceInput = screen.getByLabelText(/Price/i)
    const mfgInput = screen.getByLabelText(/Manufacturer/i)
    const inStockInput = screen.getByLabelText(/In stock/i)
    const ratingInput = screen.getByLabelText(/Rating/i)

    userEvent.type(nameInput, 'Test Widget')
    userEvent.type(priceInput, '10.0')
    userEvent.type(mfgInput, 'Test')
    userEvent.type(inStockInput, '2')
    userEvent.type(ratingInput, '5')

    const submitButton = screen.getByRole('button', { name: /Submit/i })
    fireEvent.click(submitButton)

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

    render(<App />)

    const button = await screen.findByRole('button', { name: /Add Widget/i })
    fireEvent.click(button)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()
    expect(loadScope.isDone()).toBe(true)

    const submitButton = screen.getByRole('button', { name: /Submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => expect(postScope.isDone()).toBe(true))

    const errorMessage = await screen.findByText(/Error/i)

    expect(errorMessage).toBeInTheDocument()
    expect(postScope.isDone()).toBe(true)
  })
})

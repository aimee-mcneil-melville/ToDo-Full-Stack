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

describe('Widget', () => {
  it('deletes a widget', async () => {
    const loadScope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [testWidget])

    const deleteScope = nock('http://localhost')
      .delete('/api/v1/widgets/1')
      .reply(200)

    render(<App />)

    const widget = await screen.findByRole('heading', { name: 'Test Widget' })
    expect(widget).toBeInTheDocument()
    expect(loadScope.isDone()).toBe(true)

    const deleteButton = screen.getByRole('button', { name: /Delete/i })
    fireEvent.click(deleteButton)

    await waitFor(() => expect(widget).not.toBeInTheDocument())

    expect(deleteScope.isDone()).toBe(true)
  })
  it('renders a widget with a form when the edit button is clicked', async () => {
    const loadScope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [testWidget])

    render(<App />)
    const widget = await screen.findByRole('heading', { name: 'Test Widget' })
    expect(widget).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: /Edit/i })
    fireEvent.click(editButton)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()

    expect(loadScope.isDone()).toBe(true)
  })
  it('renders a widget without a form when the cancel button is clicked', async () => {
    const loadScope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [testWidget])

    render(<App />)

    const widget = await screen.findByRole('heading', { name: 'Test Widget' })
    expect(widget).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: /Edit/i })
    fireEvent.click(editButton)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()

    const cancelButton = screen.getByRole('button', { name: /Cancel/i })
    fireEvent.click(cancelButton)

    expect(form).not.toBeInTheDocument()
    expect(loadScope.isDone()).toBe(true)
  })
  it('renders a widget with updated data when the save button is clicked', async () => {
    const loadScope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [testWidget])

    const updateScope = nock('http://localhost')
      .patch('/api/v1/widgets/1')
      .reply(200, { ...testWidget, name: 'Updated Widget' })

    render(<App />)
    const widget = await screen.findByRole('heading', { name: 'Test Widget' })
    expect(widget).toBeInTheDocument()
    expect(loadScope.isDone()).toBe(true)

    const editButton = screen.getByRole('button', { name: /Edit/i })
    fireEvent.click(editButton)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()

    const nameInput = screen.getByLabelText(/Name/i)
    userEvent.type(nameInput, 'Updated Widget')

    const submitButton = screen.getByRole('button', { name: /Submit/i })
    fireEvent.click(submitButton)

    const updatedWidget = await screen.findByRole('heading', {
      name: 'Updated Widget',
    })
    expect(updatedWidget).toBeInTheDocument()
    expect(form).not.toBeInTheDocument()
    expect(updateScope.isDone()).toBe(true)
  })
  it('renders an error message when deleting the widget fails', async () => {
    const loadScope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [testWidget])

    const deleteScope = nock('http://localhost')
      .delete('/api/v1/widgets/1')
      .reply(500)

    render(<App />)

    await screen.findByRole('heading', { name: 'Test Widget' })
    expect(loadScope.isDone()).toBe(true)

    const deleteButton = await screen.getByRole('button', { name: /Delete/i })
    fireEvent.click(deleteButton)

    const errorMessage = await screen.findByText(/Error/i)
    expect(errorMessage).toBeInTheDocument()
    expect(deleteScope.isDone()).toBe(true)
  })
  it('renders an error message when updating the widget fails', async () => {
    const loadScope = nock('http://localhost')
      .get('/api/v1/widgets/')
      .reply(200, [testWidget])

    const updateScope = nock('http://localhost')
      .patch('/api/v1/widgets/1')
      .reply(500)

    render(<App />)

    await screen.findByRole('heading', { name: 'Test Widget' })
    expect(loadScope.isDone()).toBe(true)

    const editButton = await screen.getByRole('button', { name: /Edit/i })
    fireEvent.click(editButton)

    const form = await screen.findByRole('form', { name: /Widget form/i })
    expect(form).toBeInTheDocument()

    const nameInput = screen.getByLabelText(/Name/i)
    userEvent.type(nameInput, 'Updated Widget')

    const submitButton = screen.getByRole('button', { name: /Submit/i })
    fireEvent.click(submitButton)

    const errorMessage = await screen.findByText(/Error/i)
    expect(errorMessage).toBeInTheDocument()
    expect(updateScope.isDone()).toBe(true)
  })
})

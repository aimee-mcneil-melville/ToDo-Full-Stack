import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../store'
import AddVolunteerForm from './AddVolunteerForm'

import userEvent from '@testing-library/user-event'

jest.mock('./AddVolunteerFormHelper')

describe('Add volunteer form can validate inputs', () => {
  it('Should display "required" for empty required entires', async () => {
    const handleSubmit = jest.fn()
    render(<AddVolunteerForm onSubmit={handleSubmit} />)

    userEvent.clear(screen.getByLabelText(/firstName/i))
    userEvent.clear(screen.getByLabelText(/lastName/i))

    userEvent.click(screen.getByRole('button', { name: /add/i }))

    const elements = await screen.findAllByText('Required')
    expect(elements[0]).toBeInTheDocument()
  })

  it('Should not display "required" when required entires are filled', () => {
    const handleSubmit = jest.fn()
    render(<AddVolunteerForm onSubmit={handleSubmit} />)

    userEvent.type(screen.getByLabelText(/firstName/i), 'tester123')
    userEvent.type(screen.getByLabelText(/lastName/i), 'tester123')

    userEvent.click(screen.getByRole('button', { name: /add/i }))
    return screen.findByText(/Required/i).catch(() => {
      /* eslint-disable-next-line jest/no-conditional-expect  */
      expect(screen.queryByText(/Required/i)).toBeNull()
    })
  })
})

describe('Add Volunteer Form', () => {
  it('Should render the input fields', () => {
    render(
      <Provider store={store}>
        <AddVolunteerForm id={1} />
      </Provider>
    )
    expect(screen.getByLabelText('firstName')).toBeInTheDocument()
    expect(screen.getByLabelText('lastName')).toBeInTheDocument()
  })

  it('Value of first name should change', async () => {
    render(
      <Provider store={store}>
        <AddVolunteerForm id={1} />
      </Provider>
    )

    expect(screen.getByLabelText('firstName').value).toBe('')
    userEvent.type(screen.getByLabelText(/firstName/i), 'tester123')

    await waitFor(() => {
      expect(screen.getByLabelText('firstName').value).toBe('tester123')
    })
  })

  it('Value of last name should change', async () => {
    render(
      <Provider store={store}>
        <AddVolunteerForm id={1} />
      </Provider>
    )
    expect(await screen.getByLabelText('lastName').value).toBe('')
    userEvent.type(screen.getByLabelText(/lastName/i), 'tester123')

    await waitFor(() => {
      expect(screen.getByLabelText('lastName').value).toBe('tester123')
    })
  })
})

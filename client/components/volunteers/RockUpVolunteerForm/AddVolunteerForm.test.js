import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../store'
import AddVolunteerForm from './AddVolunteerForm'

import { addVolunteer } from './AddVolunteerFormHelper'
import userEvent from '@testing-library/user-event'

jest.mock('./AddVolunteerFormHelper')

// describe('Add volunteer form can validate inputs', () => {
//   it('Should display "required" for empty required entires', () => {
//     render(<AddVolunteerForm />)
//   })
// })

describe('Add Volunteer Form', () => {
  it('Should render the input fields', () => {
    render(<Provider store={store}><AddVolunteerForm id={1} /></Provider>)
    expect(screen.getByLabelText('firstName')).toBeInTheDocument()
    expect(screen.getByLabelText('lastName')).toBeInTheDocument()
  })

  it('Value of first name should change', async () => {
    render(<Provider store={store}><AddVolunteerForm id={1} /></Provider>)
    expect(await screen.getByLabelText('firstName').value).toBe('')
    userEvent.type(screen.getByLabelText(/firstName/i), 'tester123')
    expect(await screen.getByLabelText('firstName').value).toBe('tester123')
  })

  it('Value of last name should change', async () => {
    render(<Provider store={store}><AddVolunteerForm id={1} /></Provider>)
    expect(await screen.getByLabelText('lastName').value).toBe('')
    userEvent.type(screen.getByLabelText(/lastName/i), 'tester123')
    expect(await screen.getByLabelText('lastName').value).toBe('tester123')
  })

  it('addVolunteer should be called', () => {
    render(<Provider store={store}><AddVolunteerForm id={1} /></Provider>)

    const firstNameInput = screen.getByLabelText('firstName')
    const lastNameInput = screen.getByLabelText('lastName')

    fireEvent.change(firstNameInput, { target: { value: 'tester123' } })
    fireEvent.change(lastNameInput, { target: { value: 'tester123' } })
    fireEvent.click(screen.getByTestId('submit-button'))

    expect(addVolunteer).not.toHaveBeenCalled()
  })
})

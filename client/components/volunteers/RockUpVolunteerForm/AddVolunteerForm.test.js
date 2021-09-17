import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import store from '../../../store'
import { renderWithRouter } from '../../../test-utils'
import AddVolunteerForm from './AddVolunteerForm'

import { addVolunteer } from './AddVolunteerFormHelper'

jest.mock('./AddVolunteerFormHelper')

describe('Add Volunteer Form', () => {
  it('Should render the input fields', () => {
    render(<Provider store={store}><AddVolunteerForm id={1} /></Provider>)
    expect(screen.getByLabelText('firstName')).toBeInTheDocument()
    expect(screen.getByLabelText('lastName')).toBeInTheDocument()
  })

  it('Value of first name should change', () => {
    render(<Provider store={store}><AddVolunteerForm id={1} /></Provider>)
    const firstNameInput = screen.getByLabelText('firstName')
    expect(firstNameInput.value).toBe('')
    fireEvent.change(firstNameInput, { target: { value: 'tester123' } })
    expect(firstNameInput.value).toBe('tester123')
  })

  it('Value of last name should change', () => {
    render(<Provider store={store}><AddVolunteerForm id={1} /></Provider>)
    const lastNameInput = screen.getByLabelText('lastName')
    expect(lastNameInput.value).toBe('')
    fireEvent.change(lastNameInput, { target: { value: 'tester123' } })
    expect(lastNameInput.value).toBe('tester123')
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
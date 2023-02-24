/**
 * @jest-environment jsdom
 *
 * Integration test for the AddWombats component
 */
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'

import App from '../App'
import { store } from '../../store'

describe('AddWombats', () => {
  it('allows the user to add a wombat', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const wombatInput = screen.getByLabelText('Name')
    fireEvent.change(wombatInput, { target: { value: 'Wallace' } })
    expect(wombatInput).toHaveValue('Wallace')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    const newWombat = screen.getByText('Wallace')
    expect(newWombat).toBeInTheDocument()
  })
})

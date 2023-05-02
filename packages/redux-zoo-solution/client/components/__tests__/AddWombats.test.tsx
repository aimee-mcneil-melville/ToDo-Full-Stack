// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { Provider } from 'react-redux'

expect.extend(matchers)

import App from '../App'
import { store } from '../../store'

describe('AddWombats', () => {
  it('allows the user to add a wombat', async () => {
    const user = userEvent.setup()
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const wombatInput = screen.getByLabelText('Name')
    await user.type(wombatInput, 'Wallace')
    expect(wombatInput).toHaveValue('Wallace')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    const newWombat = screen.getByText('Wallace')
    expect(newWombat).toBeInTheDocument()
  })
})

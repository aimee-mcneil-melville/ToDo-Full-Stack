// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import setupApp from '../../test-setup'

describe('AddWombats', () => {
  it('allows the user to add a wombat', async () => {
    const { user, ...screen } = setupApp()
    const wombatInput = screen.getByLabelText('Name')
    await user.type(wombatInput, 'Wallace')
    expect(wombatInput).toHaveValue('Wallace')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    const newWombat = screen.getByText('Wallace')
    expect(newWombat).toBeInTheDocument()
  })
})

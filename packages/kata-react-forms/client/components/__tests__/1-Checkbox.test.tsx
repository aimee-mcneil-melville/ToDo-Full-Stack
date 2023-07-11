// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderRoute } from '../../test/utils'

describe('<CheckboxForm />', () => {
  it.skip('should allow user to check a checkbox', async () => {
    const { user } = renderRoute('/1')

    const checkbox = screen.getByLabelText(/is checked/i)
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it.skip('should allow user to check/uncheck a checkbox', async () => {
    const { user } = renderRoute('/1')

    const checkbox = screen.getByLabelText(/is checked/i)
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it.skip('should allow user to add a checked value to the list', async () => {
    const { user } = renderRoute('/1')

    const checkbox = screen.getByLabelText(/is checked/i)
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    const list = screen.getByRole('list')
    const listItems = within(list)
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItems).toEqual(['true'])
  })

  it.skip('should allow user to add an unchecked value to the list', async () => {
    const { user } = renderRoute('/1')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    const list = screen.getByRole('list')
    const listItems = within(list)
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItems).toEqual(['false'])
  })
})

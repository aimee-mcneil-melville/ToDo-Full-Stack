// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderRoute } from '../../test/utils.tsx'

describe('<TextAndCheckboxForm />', () => {
  it.skip('should allow user to fill in all inputs', async () => {
    const { user } = renderRoute('/2')

    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const hobbyInput = screen.getByRole('textbox', { name: /hobby/i })
    const checkbox = screen.getByLabelText(/is student/i)

    await user.clear(nameInput)
    await user.type(nameInput, 'Avery')
    await user.clear(hobbyInput)
    await user.type(hobbyInput, 'Coding')

    await user.click(checkbox)

    expect(nameInput).toHaveValue('Avery')
    expect(hobbyInput).toHaveValue()
    expect(checkbox).toBeChecked()
  })

  it.skip('should allow user to submit all inputs', async () => {
    const { user } = renderRoute('/2')

    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const hobbyInput = screen.getByRole('textbox', { name: /hobby/i })
    const checkbox = screen.getByLabelText(/is student/i)

    await user.clear(nameInput)
    await user.type(nameInput, 'Avery')
    await user.clear(hobbyInput)
    await user.type(hobbyInput, 'Coding')

    await user.click(checkbox)

    const submitButton = screen.getByRole('button', { name: /add person/i })

    await user.click(submitButton)

    const list = screen.getByRole('list')
    const listItems = within(list)
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItems).toEqual(['Avery - Coding - Student'])
  })

  it.skip('should allow user to submit as not a student', async () => {
    const { user } = renderRoute('/2')

    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const hobbyInput = screen.getByRole('textbox', { name: /hobby/i })

    await user.clear(nameInput)
    await user.type(nameInput, 'Avery')
    await user.clear(hobbyInput)
    await user.type(hobbyInput, 'Coding')

    const submitButton = screen.getByRole('button', { name: /add person/i })

    await user.click(submitButton)

    const updatedList = screen.getByRole('list')
    const updatedListItems = within(updatedList)
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(updatedListItems).toEqual(['Avery - Coding - Not a student'])
  })

  it.skip('should clear all inputs after submit', async () => {
    const { user } = renderRoute('/2')

    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const hobbyInput = screen.getByRole('textbox', { name: /hobby/i })
    const checkbox = screen.getByLabelText(/is student/i)

    await user.clear(nameInput)
    await user.type(nameInput, 'Avery')
    await user.clear(hobbyInput)
    await user.type(hobbyInput, 'Coding')

    await user.click(checkbox)

    const submitButton = screen.getByRole('button', { name: /add person/i })

    await user.click(submitButton)

    expect(nameInput).toHaveValue('')
    expect(hobbyInput).toHaveValue('')
    expect(checkbox).not.toBeChecked()
  })
})

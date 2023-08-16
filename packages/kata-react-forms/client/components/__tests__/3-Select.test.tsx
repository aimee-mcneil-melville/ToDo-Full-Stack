// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderRoute } from '../../test/utils.tsx'

describe('<SelectForm />', () => {
  it.skip('should be empty by default', () => {
    renderRoute('/3')

    const select = screen.getByRole('combobox', { name: /select/i })
    expect(select).toHaveValue('')

    const text = screen.getByText(/selected car:/i)
    expect(text).toHaveTextContent('Selected car:')
  })

  it.skip('should allow user to select an option', async () => {
    const { user } = renderRoute('/3')

    const select = screen.getByRole('combobox', { name: /select/i })
    const text = screen.getByText(/Selected car:/i)

    await user.selectOptions(select, 'Aston Martin')
    expect(select).toHaveValue('aston-martin')
    expect(text).toHaveTextContent('Selected car: aston-martin')

    await user.selectOptions(select, 'Mercedes')
    expect(select).toHaveValue('mercedes')
    expect(text).toHaveTextContent('Selected car: mercedes')
  })

  it.skip('should allow user to deselect an option', async () => {
    const { user } = renderRoute('/3')

    const select = screen.getByRole('combobox', { name: /select/i })

    await user.selectOptions(select, 'Aston Martin')
    expect(select).toHaveValue('aston-martin')

    await user.selectOptions(select, '')
    expect(select).toHaveValue('')
  })

  it.skip('should allow user to submit a selected option', async () => {
    const { user } = renderRoute('/3')

    const select = screen.getByRole('combobox', { name: /select/i })
    await user.selectOptions(select, 'Ferrari')

    const submitButton = screen.getByRole('button', { name: /add car/i })
    await user.click(submitButton)

    const list = screen.getByRole('list')
    const listItems = within(list)
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItems).toEqual(['ferrari'])
  })

  it.skip('should clear select upon submissino', async () => {
    const { user } = renderRoute('/3')

    const select = screen.getByRole('combobox', { name: /select/i })
    await user.selectOptions(select, 'Ferrari')

    const submitButton = screen.getByRole('button', { name: /add car/i })
    await user.click(submitButton)

    const list = screen.getByRole('list')
    const listItems = within(list)
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItems).toEqual(['ferrari'])

    expect(select).toHaveValue('')
  })
})

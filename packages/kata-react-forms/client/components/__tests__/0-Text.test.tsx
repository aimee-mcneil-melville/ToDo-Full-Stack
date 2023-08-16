// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderRoute } from '../../test/utils.tsx'

describe('<TextForm />', () => {
  it.skip('should allow user to type text into input', async () => {
    const { user } = renderRoute('/0')

    const input = screen.getByLabelText(/new item/i)

    await user.clear(input)
    await user.type(input, 'Hello')

    expect(screen.getByLabelText(/new item/i)).toHaveValue('Hello')
  })

  it.skip('should not make an HTTP request on submission', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { user } = renderRoute('/0')

    const input = screen.getByLabelText(/new item/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })

    await user.clear(input)
    await user.type(input, 'Do the dishes')
    await user.click(submitButton)

    // If this fails, that means your <form> is not preventing the default behaviour for submission
    expect(console.error).not.toHaveBeenCalled()
  })

  it.skip('should allow user to add a single item to rendered list', async () => {
    const { user } = renderRoute('/0')

    const input = screen.getByLabelText(/new item/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })

    await user.clear(input)
    await user.type(input, 'Do the dishes')
    await user.click(submitButton)

    const list = screen.getByRole('list')

    const listItems = within(list)
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItems).toEqual(['Do the dishes'])
  })

  it.skip('should let the user use the {Enter} key to submit', async () => {
    const { user } = renderRoute('/0')

    const input = screen.getByLabelText(/new item/i)

    await user.clear(input)
    await user.type(input, 'Do the dishes')
    await user.keyboard('{Enter}')

    const list = screen.getByRole('list')
    const listItems = within(list)
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItems).toEqual(['Do the dishes'])
  })

  it.skip('should clear the input field automatically when the user submits an item', async () => {
    const { user } = renderRoute('/0')

    const input = screen.getByLabelText(/new item/i)

    await user.clear(input)
    await user.type(input, 'Do the dishes')
    await user.keyboard('{Enter}')

    expect(screen.getByLabelText(/new item/i)).toHaveValue('')
  })

  it.skip('should let the user submit multiple items one after each other', async () => {
    const { user } = renderRoute('/0')

    const input = screen.getByLabelText(/new item/i)

    await user.clear(input)
    await user.type(input, 'Do the dishes')
    await user.keyboard('{Enter}')

    const listItemsAfterFirstSubmission = within(screen.getByRole('list'))
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItemsAfterFirstSubmission).toEqual(['Do the dishes'])

    await user.clear(input)
    await user.type(input, 'Walk the dog')
    await user.keyboard('{Enter}')

    const listItemsAfterSecondSubmission = within(screen.getByRole('list'))
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItemsAfterSecondSubmission).toEqual([
      'Do the dishes',
      'Walk the dog',
    ])

    expect(screen.getByLabelText(/new item/i)).toHaveValue('')
  })
})

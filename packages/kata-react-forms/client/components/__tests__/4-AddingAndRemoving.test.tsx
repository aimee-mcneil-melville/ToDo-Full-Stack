// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderRoute } from '../../test/utils.tsx'

describe('<TextAndCheckboxForm />', () => {
  it.skip('should allow user to submit an item', async () => {
    const { user } = renderRoute('/4')

    const itemInput = screen.getByRole('textbox', { name: /item/i })
    const submitButton = screen.getByRole('button', { name: /add item/i })

    await user.type(itemInput, 'Milk')
    await user.click(submitButton)

    const list = screen.getByRole('list')
    const listItems = within(list).getAllByRole('listitem')

    expect(listItems).toHaveLength(1)
    expect(listItems[0]).toMatchInlineSnapshot(`
      <li>
        Milk
         
        <button>
          Delete
        </button>
      </li>
    `)
  })

  it.skip('should clear the form upon submission', async () => {
    const { user } = renderRoute('/4')

    const itemInput = screen.getByRole('textbox', { name: /item/i })
    const submitButton = screen.getByRole('button', { name: /add item/i })

    await user.type(itemInput, 'Milk')
    await user.click(submitButton)

    expect(itemInput).toHaveValue('')
  })

  it.skip('should allow user to delete an item', async () => {
    const { user } = renderRoute('/4')

    // first add an item
    const itemInput = screen.getByRole('textbox', { name: /item/i })
    const submitButton = screen.getByRole('button', { name: /add item/i })

    await user.type(itemInput, 'Milk')
    await user.click(submitButton)

    const list = screen.getByRole('list')
    const listItems = within(list).getAllByRole('listitem')

    expect(listItems).toHaveLength(1)
    expect(listItems[0]).toMatchInlineSnapshot(`
      <li>
        Milk
         
        <button>
          Delete
        </button>
      </li>
    `)

    // and then delete the item
    const deleteButton = screen.getByRole('button', { name: /delete/i })

    await user.click(deleteButton)

    const updatedList = screen.getByRole('list')
    expect(updatedList).toBeEmptyDOMElement()
  })
})

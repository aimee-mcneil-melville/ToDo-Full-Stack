import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import CartItem from './CartItem'

test('renders cart item correctly, with quantity in input', async () => {
  const mockItem = { id: 1, quantity: 4, name: 'mock cart item' }

  const tableBody = document.createElement('tbody')
  const { asFragment } = render(<CartItem item={mockItem} />, {
    container: document.body.appendChild(tableBody)
  })

  const itemName = await screen.getAllByRole('cell')[0]
  const quantityInput = await screen.getByRole('textbox', { name: 'quantity' })
  const deleteButton = await screen.getByRole('button', { name: 'delete' })

  expect(itemName).toHaveTextContent('mock cart item')
  expect(quantityInput.value).toBe('4')
  expect(deleteButton).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

test('renders empty input if quantity is 0', async () => {
  const mockItem = { id: 2, quantity: 0, name: 'mock cart item 2' }

  const tableBody = document.createElement('tbody')
  const { asFragment } = render(<CartItem item={mockItem} />, {
    container: document.body.appendChild(tableBody)
  })

  const quantityInput = await screen.getByRole('textbox', { name: 'quantity' })

  expect(quantityInput.value).toBe('')
  expect(asFragment()).toMatchSnapshot()
})

test('calls deleteFromCart on delete button click ', async () => {
  const mockItem = { id: 1, quantity: 4, name: 'mock cart item' }
  const deleteFromCart = jest.fn()

  const tableBody = document.createElement('tbody')
  render(<CartItem item={mockItem} deleteFromCart={deleteFromCart} />, {
    container: document.body.appendChild(tableBody)
  })

  const deleteButton = await screen.getByRole('button', { name: 'delete' })
  fireEvent.click(deleteButton)

  expect(deleteFromCart).toHaveBeenCalledWith(mockItem.id)
})

test('calls update on quantity field input change', async () => {
  const mockItem = { id: 1, quantity: 4, name: 'mock cart item' }
  const update = jest.fn()

  const tableBody = document.createElement('tbody')
  render(<CartItem item={mockItem} update={update} />, {
    container: document.body.appendChild(tableBody)
  })

  const quantityInput = await screen.getByRole('textbox', { name: 'quantity' })
  fireEvent.change(quantityInput, { target: { value: '5' } })

  expect(update).toHaveBeenCalledWith(mockItem.id, '5')
})

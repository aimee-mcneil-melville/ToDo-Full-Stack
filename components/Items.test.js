import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import Items from './Items'
import localDbMock from '../localDbMock'

test('Shows a list of items', async () => {
  // render the component
  render(<Items db={localDbMock()}/>)

  // assert it displays the correct items
  const items = await screen.findAllByTestId('item')
  expect(items).toHaveLength(3)

  expect(items[0]).toHaveTextContent('test name 1')
  expect(items[0]).toHaveTextContent('test description 1')
  expect(items[0].lastChild).toHaveStyle('background-color: burlywood')

  expect(items[1]).toHaveTextContent('test name 2')
  expect(items[1]).toHaveTextContent('test description 2')
  expect(items[1].lastChild).toHaveStyle('background-color: tomato')

  expect(items[2]).toHaveTextContent('test name 3')
  expect(items[2]).toHaveTextContent('test description 3')
  expect(items[2].lastChild).toHaveStyle('background-color: thistle')
})

test('Can select an item', async () => {
  // render the component
  render(<Items db={localDbMock()}/>)

  // click the first item
  const items = await screen.findAllByTestId('item')
  fireEvent.click(items[0])

  // assert the item is being shown in the form
  expect(await screen.findByTestId('form')).toHaveFormValues({
    color: 'burlywood',
    name: 'test name 1',
    description: 'test description 1'
  })
})

test('Can edit an item (and rejects invalid data)', async () => {
  // render the component
  render(<Items db={localDbMock()}/>)

  // click on the second item
  const items = await screen.findAllByTestId('item')
  fireEvent.click(items[1])

  // change one or more of the values to invalid data (could be multiple tests)
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { name: 'name', value: ''}
  })

  // submit the form
  fireEvent.click(screen.getByTestId('submit'))

  // assert it was rejected with the correct error messages
  expect(screen.getByText(/field cannot be empty/i)).toBeVisible()

  // complete a form with different, valid data
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { name: 'name', value: 'acceptable test user'}
  })

  // submit the form
  fireEvent.click(screen.getByTestId('submit'))

  // assert the error disappears
  expect(screen.queryByText(/field cannot be empty/i)).toBeNull()

  // assert the items have the new values
  const updatedItems = await screen.findAllByTestId('item')
  expect(updatedItems).toHaveLength(3)
  expect(updatedItems[1]).toHaveTextContent('acceptable test user')
  expect(updatedItems[1]).toHaveTextContent('test description 2')
  expect(updatedItems[1].lastChild).toHaveStyle('background-color: tomato')
})

test('Can add an item (and rejects invalid data)', async () => {
  // render the `Items` component
  render(<Items db={localDbMock()}/>)

  // complete a form with invalid data (could be multiple tests)
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { name: 'name', value: 'acceptable test user'}
  })
  fireEvent.change(screen.getByLabelText('Colour'), {
    target: { name: 'color', value: 'chartreuse'}
  })

  // submit the form
  fireEvent.click(screen.getByTestId('submit'))

  // assert it was rejected with the correct error messages
  expect(screen.getByText(/nobody likes chartreuse/i)).toBeVisible()

  // complete a form with valid data
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { name: 'name', value: 'acceptable test user'}
  })
  fireEvent.change(screen.getByLabelText('Description'), {
    target: { name: 'description', value: 'acceptable test description'}
  })
  fireEvent.change(screen.getByLabelText('Colour'), {
    target: { name: 'color', value: 'darkgoldenrod'}
  })

  // submit the form
  fireEvent.click(screen.getByTestId('submit'))

  // assert the error disappears
  expect(screen.queryByText(/nobody likes chartreuse/i)).toBeNull()

  // assert it was accepted
  const items = await screen.findAllByTestId('item')
  expect(items).toHaveLength(4)
  expect(items[3]).toHaveTextContent('acceptable test user')
  expect(items[3]).toHaveTextContent('acceptable test description')
  expect(items[3].lastChild).toHaveStyle('background-color: darkgoldenrod')
})

test('Can delete an item', async () => {
  // render the `Items` component
  render(<Items db={localDbMock()}/>)

  // assert the correct number of items are showing
  let items = screen.getAllByTestId('item')
  expect(items).toHaveLength(3)

  // select the second item
  fireEvent.click(items[1])

  // select the delete button
  fireEvent.click(screen.getByTestId('delete'))

  // assert the item is no longer listed
  items = await screen.findAllByTestId('item')
  expect(items).toHaveLength(2)
  expect(items[1]).toHaveTextContent('test name 3')
  expect(items[1]).toHaveTextContent('test description 3')
  expect(items[1].lastChild).toHaveStyle('background-color: thistle')

  // Note: you can also delete an item by right-clicking
  // it in the item list. I couldn't get click({button: 2})
  // to work on the <tr> with the event handler. I didn't
  // troubleshoot. It just didn't delete the item - didn't
  // seem to call the event handler. For another time.
})

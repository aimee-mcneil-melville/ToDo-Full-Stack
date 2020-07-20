import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import ItemForm from './ItemForm'
import localDbMock from '../localDbMock'

test('Can reset the form from <em>added</em> form inputs', async () => {
  const resetMock = jest.fn()

  // render the `ItemForm` component
  render(<ItemForm editItem={null} reset={resetMock}/>)

  // enter [in]valid data (could be none or multiple of these tests)
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { name: 'name', value: 'new name for 2nd item'}
  })
  fireEvent.change(screen.getByLabelText('Description'), {
    target: { name: 'description', value: 'new description for 2nd item'}
  })
  fireEvent.change(screen.getByLabelText('Colour'), {
    target: { name: 'color', value: 'mediumaquamarine'}
  })
  expect(screen.getByTestId('form')).toHaveFormValues({
    name: 'new name for 2nd item',
    description: 'new description for 2nd item',
    color: 'mediumaquamarine'
  })

  // reset the form
  fireEvent.click(screen.getByTestId('reset'))

  // assert the form fields were reset to expected values
  expect(await screen.findByTestId('form')).toHaveFormValues({
    name: '',
    description: '',
    color: 'aliceblue'
  })

  // this next assertion is too invasive (not from user perspective)
  expect(resetMock).toBeCalledTimes(1)
})

test('Can reset the form from <em>edited</em> form inputs', async () => {
  const editItem = localDbMock().getItems()[0]
  const resetMock = jest.fn()

  // render the `ItemForm` component with an editItem
  render(<ItemForm editItem={editItem} reset={resetMock}/>)

  // assert the editItem is showing in the form
  expect(await screen.findByTestId('form')).toHaveFormValues({
    name: 'test name 1',
    description: 'test description 1',
    color: 'burlywood'
  })

  // reset the form
  fireEvent.click(screen.getByTestId('reset'))

  // assert the form fields were reset to expected values
  expect(await screen.findByTestId('form')).toHaveFormValues({
    name: '',
    description: '',
    color: 'aliceblue'
  })

  // this next assertion is too invasive (not from user perspective)
  expect(resetMock).toBeCalledTimes(1)
})

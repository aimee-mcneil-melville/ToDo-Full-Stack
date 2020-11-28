import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { renderWithRedux } from '../test-utils'
import Error from './Error.jsx'
import { hide } from './errorHelper'

jest.mock('./errorHelper')

test('shows error message if there is one in the redux store', () => {
  renderWithRedux(<Error />, {
    initialState: { error: 'mock error message' }
  })
  const error = screen.getByRole('alert')
  expect(error).toHaveTextContent('mock error')
})

test('renders null if no error in the store', () => {
  renderWithRedux(<Error />)
  const error = screen.queryByRole('alert')
  expect(error).toBeNull()
})

test('calls hide on hide error button click', () => {
  renderWithRedux(<Error />, {
    initialState: { error: 'mock error message' }
  })

  const hideErrorButton = screen.getByRole('button', { name: 'Hide Error' })
  fireEvent.click(hideErrorButton)

  expect(hide).toHaveBeenCalled()
})

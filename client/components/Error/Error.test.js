import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRedux } from '../../test-utils'
import Error from './Error.jsx'
import { hide } from './errorHelper'

jest.mock('./errorHelper')

describe('error banner', () => {
  it('is displayed if there is an error in redux store', () => {
    renderWithRedux(<Error />, {
      initialState: { error: 'mock error message' },
    })
    const error = screen.getByRole('alert')
    expect(error).toHaveTextContent('mock error')
  })

  it('shows nothing if no error in the store', () => {
    renderWithRedux(<Error />)
    const error = screen.queryByRole('alert')
    expect(error).toBeNull()
  })
})

describe('hide error button', () => {
  it('calls hide helper function on click', () => {
    renderWithRedux(<Error />, {
      initialState: { error: 'mock error message' },
    })
    const hideErrorButton = screen.getByText('✕')
    userEvent.click(hideErrorButton)
    expect(hide).toHaveBeenCalled()
  })
})

import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../test-utils'
import WaitIndicator from './WaitIndicator.jsx'

describe('wait indicator', () => {
  it('displays if waiting is true in redux store', () => {
    renderWithRedux(<WaitIndicator />, {
      initialState: { waiting: true }
    })
    const waitIndicator = screen.getByText('loading...')
    expect(waitIndicator).toBeInTheDocument()
  })

  it('does not display if waiting is false in redux store', () => {
    renderWithRedux(<WaitIndicator />)
    const waitIndicator = screen.queryByText('loading...')
    expect(waitIndicator).toBeNull()
  })
})

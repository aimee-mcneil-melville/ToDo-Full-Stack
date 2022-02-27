import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../../test-utils'
import WaitIndicator from './WaitIndicator.jsx'

describe('wait indicator', () => {
  it('displays if waiting is true in redux store', () => {
    renderWithRedux(<WaitIndicator />, {
      initialState: { waiting: true },
    })
    const waitIndicators = screen.getAllByAltText('loading indicator')
    expect(waitIndicators).toHaveLength(3)
  })

  it('does not display if waiting is false in redux store', () => {
    renderWithRedux(<WaitIndicator />)
    const waitIndicators = screen.queryAllByAltText('loading indicator')
    expect(waitIndicators).toHaveLength(0)
  })
})

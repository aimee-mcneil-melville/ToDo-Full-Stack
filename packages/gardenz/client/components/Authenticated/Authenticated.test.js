import React from 'react'
import { screen, render } from '@testing-library/react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.jsx'
import { getIsAuthenticated } from '../../auth-utils'

jest.mock('../../auth-utils')

describe('IfAuthenticated', () => {
  it('displays children if isAuthenticated returns true', () => {
    getIsAuthenticated.mockImplementation(() => true)

    render(
      <IfAuthenticated>
        <p>child</p>
      </IfAuthenticated>
    )
    const children = screen.getByText('child')
    expect(children).toBeInTheDocument()
  })
  it('does not display children if isAuthenticated returns false', () => {
    getIsAuthenticated.mockImplementation(() => false)

    render(
      <IfAuthenticated>
        <p>child</p>
      </IfAuthenticated>
    )
    const children = screen.queryByText('child')
    expect(children).toBeNull()
  })
})

describe('IfNotAuthenticated', () => {
  it('displays children if isAuthenticated returns false', () => {
    getIsAuthenticated.mockImplementation(() => false)

    render(
      <IfNotAuthenticated>
        <p>child</p>
      </IfNotAuthenticated>
    )
    const children = screen.getByText('child')
    expect(children).toBeInTheDocument()
  })
  it('does not display children if isAuthenticated returns true', () => {
    getIsAuthenticated.mockImplementation(() => true)

    render(
      <IfNotAuthenticated>
        <p>child</p>
      </IfNotAuthenticated>
    )
    const children = screen.queryByText('child')
    expect(children).toBeNull()
  })
})

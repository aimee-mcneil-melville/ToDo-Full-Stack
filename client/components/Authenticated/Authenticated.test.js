import React from 'react'
import { screen, render } from '@testing-library/react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.jsx'
// import { isAuthenticated } from '../../auth'  <---- WILL CHANGE BECAUSE OF AUTH0????

jest.mock('../../auth')

describe('IfAuthenticated', () => {
  it('displays children if isAuthenticated returns true', () => {
    isAuthenticated.mockImplementation(() => true)
    render(
      <IfAuthenticated>
        <p>child</p>
      </IfAuthenticated>
    )
    const children = screen.getByText('child')
    expect(children).toBeInTheDocument()
  })
  it('does not display children if isAuthenticated returns false', () => {
    isAuthenticated.mockImplementation(() => false)
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
    isAuthenticated.mockImplementation(() => false)
    render(
      <IfNotAuthenticated>
        <p>child</p>
      </IfNotAuthenticated>
    )
    const children = screen.getByText('child')
    expect(children).toBeInTheDocument()
  })
  it('does not display children if isAuthenticated returns true', () => {
    isAuthenticated.mockImplementation(() => true)
    render(
      <IfNotAuthenticated>
        <p>child</p>
      </IfNotAuthenticated>
    )
    const children = screen.queryByText('child')
    expect(children).toBeNull()
  })
})

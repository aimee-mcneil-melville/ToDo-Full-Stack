import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRedux } from '../../test-utils'
import { getIsAuthenticated, getLogoutFn } from '../../auth-utils'
import Nav from './Nav'

jest.mock('../../auth-utils')

describe('when user is authenticated', () => {
  it('displays "My Garden", "Log Out" and "Home" when authenticated', () => {
    getIsAuthenticated.mockImplementation(() => true)

    renderWithRedux(<Nav location={{ pathname: '/' }} />, {
      initialState: {
        user: {
          isAdmin: 0,
          gardenId: 1,
          id: 2,
        },
      },
    })
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
    expect(links[0]).toHaveTextContent('Home')
    expect(links[1]).toHaveTextContent('My Garden')
    expect(links[1].href).toMatch('/gardens/1')
    expect(links[2]).toHaveTextContent('My Profile')
    expect(links[3]).toHaveTextContent('Log out')
  })
})

describe('Log Out link', () => {
  it('calls logOut helper on click', () => {
    const logout = jest.fn()
    getIsAuthenticated.mockImplementation(() => true)
    getLogoutFn.mockImplementation(() => logout)

    renderWithRedux(<Nav location={{ pathname: '/' }} />, {
      initialState: {
        user: {
          isAdmin: 0,
          gardenId: 1,
          id: 2,
        },
      },
    })
    const logOutLink = screen.getByRole('link', { name: 'Log out' })
    userEvent.click(logOutLink)
    expect(logout).toHaveBeenCalled()
  })
})

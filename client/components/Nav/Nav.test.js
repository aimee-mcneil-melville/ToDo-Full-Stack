import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRedux } from '../../test-utils'

import Nav from './Nav'

import { isAuthenticated } from '../../auth'
import { logOut, getLinks } from './navHelper'

jest.mock('../../auth')
jest.mock('./navHelper')

describe('nav links', () => {
  describe('-> when user not authenticated', () => {
    it('maps and displays links from getLinks helper', () => {
      getLinks.mockImplementation(() => [
        { to: '/signin', name: 'Sign in' },
        { to: '/register', name: 'Register' }
      ])
      renderWithRedux(<Nav location={{ pathname: '/' }}/>, {
        initialState: {
          user: {
            id: null,
            username: '',
            isAdmin: false,
            gardenId: null
          }
        }
      })
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveTextContent('Sign in')
      expect(links[1]).toHaveTextContent('Register')
    })
  })
  describe('-> when user is authenticated', () => {
    it('displays "My Garden", "Log Out" and "Home" when authenticated', () => {
      isAuthenticated.mockImplementation(() => true)
      renderWithRedux(<Nav location={{ pathname: '/' }}/>, {
        initialState: {
          user: {
            username: 'member',
            isAdmin: 0,
            gardenId: 1,
            id: 2
          }
        }
      })
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(3)
      expect(links[0]).toHaveTextContent('My Garden')
      expect(links[0].href).toMatch('/gardens/1')
      expect(links[1]).toHaveTextContent('Log out')
      expect(links[2]).toHaveTextContent('Home')
    })
  })
})

describe('Log Out link', () => {
  it('calls logOut helper on click', () => {
    isAuthenticated.mockImplementation(() => true)
    renderWithRedux(<Nav location={{ pathname: '/' }}/>, {
      initialState: {
        user: {
          username: 'member',
          isAdmin: 0,
          gardenId: 1,
          id: 2
        }
      }
    })
    const logOutLink = screen.getByRole('link', { name: 'Log out' })
    userEvent.click(logOutLink)
    expect(logOut).toHaveBeenCalled()
  })
})

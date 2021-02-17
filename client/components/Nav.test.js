import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from '../test-utils'

import Nav from './Nav'

import { isAuthenticated } from '../auth'
import { logOut, getLinks } from './navHelper'

jest.mock('../auth')
jest.mock('./navHelper')

describe('nav links', () => {
  describe('-> when user not authenticated', () => {
    it('maps and displays links from getLinks helper', () => {
      getLinks.mockImplementation(() => [
        { to: '/signin', name: 'Sign in' },
        { to: '/register', name: 'Register' }
      ])
      renderWithRouter(<Nav location={{ pathname: '/' }}/>)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveTextContent('Sign in')
      expect(links[1]).toHaveTextContent('Register')
    })
  })
  describe('-> when user is authenticated', () => {
    it('displays "Log Out" and "Home" when authenticated', () => {
      isAuthenticated.mockImplementation(() => true)
      renderWithRouter(<Nav location={{ pathname: '/' }}/>)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveTextContent('Log out')
      expect(links[1]).toHaveTextContent('Home')
    })
  })
})

describe('Log Out link', () => {
  it('calls logOut helper on click', () => {
    isAuthenticated.mockImplementation(() => true)
    renderWithRouter(<Nav location={{ pathname: '/' }}/>)
    const logOutLink = screen.getByRole('link', { name: 'Log out' })
    userEvent.click(logOutLink)
    expect(logOut).toHaveBeenCalled()
  })
})

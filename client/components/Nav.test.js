import React from 'react'
import { fireEvent, screen } from '@testing-library/react'

import { renderWithRouter } from '../test-utils'

import Nav from './Nav'

import { isAuthenticated } from '../auth'
import { logOut } from './navHelper'

jest.mock('../auth')
jest.mock('./navHelper')

describe('nav links', () => {
  describe('-> when user not authenticated', () => {
    it('displays "register" and "sign in" on the "/" route', () => {
      renderWithRouter(<Nav location={{ pathname: '/' }}/>)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveTextContent('Sign in')
      expect(links[1]).toHaveTextContent('Register')
    })

    it('displays "register" and "home" on the "/signin" route', () => {
      renderWithRouter(<Nav location={{ pathname: '/signin' }}/>)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveTextContent('Register')
      expect(links[1]).toHaveTextContent('Home')
    })

    it('displays "sign in" and "home" on the "/register" route', () => {
      renderWithRouter(<Nav location={{ pathname: '/register' }}/>)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveTextContent('Sign in')
      expect(links[1]).toHaveTextContent('Home')
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
    fireEvent.click(logOutLink)
    expect(logOut).toHaveBeenCalled()
  })
})

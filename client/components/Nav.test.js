import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Nav from './Nav'
import { isAuthenticated } from '../auth'
import { logOut } from './navHelper'

jest.mock('../auth')
jest.mock('./navHelper')

test('renders "register" and "sign in" links on the "/" route', () => {
  render(<Router><Nav location={{ pathname: '/' }}/></Router>)
  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(2)
  expect(links[0]).toHaveTextContent('Sign in')
  expect(links[1]).toHaveTextContent('Register')
})

test('renders "register" and "home" links on the "/signin" route', () => {
  render(<Router><Nav location={{ pathname: '/signin' }}/></Router>)
  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(2)
  expect(links[0]).toHaveTextContent('Register')
  expect(links[1]).toHaveTextContent('Home')
})

test('renders "sign in" and "home" links on the "/register" route', () => {
  render(<Router><Nav location={{ pathname: '/register' }}/></Router>)
  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(2)
  expect(links[0]).toHaveTextContent('Sign in')
  expect(links[1]).toHaveTextContent('Home')
})

test('renders "Log Out" and "Home" links when authenticated', () => {
  isAuthenticated.mockImplementation(() => true)
  render(<Router><Nav location={{ pathname: '/' }}/></Router>)
  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(2)
  expect(links[0]).toHaveTextContent('Log out')
  expect(links[1]).toHaveTextContent('Home')
})

test('calls logOut on Log out link click', () => {
  isAuthenticated.mockImplementation(() => true)
  render(<Router><Nav location={{ pathname: '/' }}/></Router>)
  const logOutLink = screen.getByRole('link', { name: 'Log out' })
  fireEvent.click(logOutLink)
  expect(logOut).toHaveBeenCalled()
})

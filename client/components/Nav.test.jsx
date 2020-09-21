import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { HashRouter as Router } from 'react-router-dom'

import Nav from './Nav'

test('<Nav> renders a "register" and a "sign in" link on the "/" route', () => {
  render(
    <Router>
      <Nav location={{ pathname: '/' }}/>
    </Router>)
  expect(screen.getByText('Register')).toHaveTextContent('Register')
  expect(screen.getByText('Sign in')).toHaveTextContent('Sign in')
})

test('<Nav> renders a "register" and a "home" link on the "/signin" route', () => {
  render(
    <Router>
      <Nav location={{ pathname: '/signin' }}/>
    </Router>)
  expect(screen.getByText('Register')).toHaveTextContent('Register')
  expect(screen.getByText('Home')).toHaveTextContent('Home')
})

test('<Nav> renders a "sign in" and a "home" link on the "/register" route', () => {
  render(
    <Router>
      <Nav location={{ pathname: '/register' }}/>
    </Router>)
  expect(screen.getByText('Sign in')).toHaveTextContent('Sign in')
  expect(screen.getByText('Home')).toHaveTextContent('Home')
})

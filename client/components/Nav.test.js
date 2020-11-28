import React from 'react'
import { screen } from '@testing-library/react'

import Nav from './Nav'
import { renderWithRedux } from '../test-utils'

test('<Nav> renders a "register" and a "sign in" link on the "/" route', () => {
  renderWithRedux(<Nav location={{ pathname: '/' }}/>)
  expect(screen.getByText('Register')).toHaveTextContent('Register')
  expect(screen.getByText('Sign in')).toHaveTextContent('Sign in')
})

test('<Nav> renders a "register" and a "home" link on the "/signin" route', () => {
  renderWithRedux(<Nav location={{ pathname: '/signin' }}/>)
  expect(screen.getByText('Register')).toHaveTextContent('Register')
  expect(screen.getByText('Home')).toHaveTextContent('Home')
})

test('<Nav> renders a "sign in" and a "home" link on the "/register" route', () => {
  renderWithRedux(<Nav location={{ pathname: '/register' }}/>)
  expect(screen.getByText('Sign in')).toHaveTextContent('Sign in')
  expect(screen.getByText('Home')).toHaveTextContent('Home')
})

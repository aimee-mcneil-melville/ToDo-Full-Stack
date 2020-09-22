import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import { HashRouter as Router } from 'react-router-dom'

import Nav from './Nav'

describe('<Nav> renders correctly', () => {
  it('renders correctly on the "/" route', () => {
    const tree = renderer
      .create(
        <Router>
          <Nav location={{ pathname: '/' }}/>
        </Router>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly on the "/signin" route', () => {
    const tree = renderer
      .create(
        <Router>
          <Nav location={{ pathname: '/signin' }}/>
        </Router>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly on the "/register" route', () => {
    const tree = renderer
      .create(
        <Router>
          <Nav location={{ pathname: '/register' }}/>
        </Router>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

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

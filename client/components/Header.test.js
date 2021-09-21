import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Header from './Header'

describe('<Header /> component tests', () => {
  test('Header renders with closed nav', () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <Header />
      </Router>
    )
    // const link = screen.getByRole('button')
    const nav = screen.getByRole('navigation')
    expect(nav.textContent).toContain('My friends')
    expect(nav.classList).not.toContain('nav--open')
  })

  test('Open / close toggle works as expected', () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <Header />
      </Router>
    )

    const nav = screen.getByRole('navigation')
    const toggleButton = screen.getByRole('button')
    expect(nav.classList).not.toContain('nav--open')
    userEvent.click(toggleButton)
    expect(nav.classList).toContain('nav--open')
    userEvent.click(toggleButton)
    expect(nav.classList).not.toContain('nav--open')
  })
})

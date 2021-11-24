import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Logo from './Logo'

describe('<Logo /> component tests', () => {
  test('Logo renders', () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <Logo />
      </Router>
    )
    const link = screen.getByRole('link')
    expect(link.textContent).toEqual('rcmndr.')
  })

  test('Clicking on logo results in a redirect to /', () => {
    const history = createMemoryHistory()

    history.push = jest.fn()

    render(
      <Router history={history}>
        <Logo />
      </Router>
    )
    const link = screen.getByRole('link')
    userEvent.click(link)
    expect(history.push).toHaveBeenCalledWith('/')
  })
})

import React from 'react'
import { screen, render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import Tagline from './Tagline'
import userEvent from '@testing-library/user-event'

describe('<Tagline /> tests', () => {
  test('Tagline renders with correct text', () => {
    render(<Tagline />)
    const tagline = screen.getByRole('banner')
    const children = tagline.children
    expect(tagline.textContent).toContain('discover.')
    expect(children[0].textContent).toEqual('collate.')
    expect(children[1].textContent).toEqual('recommend.')
    expect(children[2].textContent).toEqual('discover.')
  })

  test('Button clicks work as expected for login and register', () => {
    const history = createMemoryHistory()
    history.push = jest.fn()

    render(
      <Router history={history}>
        <Tagline />
      </Router>
    )

    const loginButton = screen.getByRole('button', { name: /login/i })
    const registerButton = screen.getByRole('button', { name: /register/i })
    userEvent.click(loginButton)
    expect(history.push).toHaveBeenCalledWith('/login')
    userEvent.click(registerButton)
    expect(history.push).toHaveBeenCalledWith('/register')
  })
})

import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from './Button'

describe('<Button/> component tests', () => {
  test('Component renders with all props supplied', () => {
    render(<Button style='primary' buttonText='Test button' />)
    const button = screen.getByRole('button')
    expect(button.textContent).toEqual('Test button')
    expect(button.classList).toContain('btn--primary')
  })

  test('Component renders a default button if no type supplied', () => {
    render(<Button buttonText='Test button' />)
    const button = screen.getByRole('button')
    expect(button.classList).toContain('btn--default')
  })

  test('clickFunction fires on button click', () => {
    const testFunc = jest.fn()

    render(<Button buttonText='Test button' clickFunction={testFunc} />)
    const button = screen.getByRole('button')

    userEvent.click(button)
    expect(testFunc).toHaveBeenCalled()
  })
})

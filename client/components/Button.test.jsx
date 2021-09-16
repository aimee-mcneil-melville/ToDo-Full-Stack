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
    let testVar = 0
    const upTestVar = () => {
      testVar += 1
    }

    render(<Button buttonText='Test button' clickFunction={upTestVar} />)
    const button = screen.getByRole('button')

    expect(testVar).toEqual(0)
    userEvent.click(button)
    expect(testVar).toEqual(1)
  })
})

import React from 'react'
import { screen, render } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import Icon from './Icon'

describe('<Icon /> component tests', () => {
  test('Icon button displays correct glyph', () => {
    render(
      <>
        <Icon />
        <Icon style="play" />
        <Icon style="delete" />
        <Icon style="edit" />
        <Icon style="user" />
      </>
    )
    const buttons = screen.getAllByRole('button')
    // console.log('buttons', buttons)
    expect(buttons[0].classList).toContain('icon--music')
    expect(buttons[1].classList).toContain('icon--play')
    expect(buttons[2].classList).toContain('icon--delete')
    expect(buttons[3].classList).toContain('icon--edit')
    expect(buttons[4].classList).toContain('icon--user')
  })

  test('Icon display runs function when clicked', () => {
    const clickFunc = jest.fn()

    render(<Icon clickFunction={clickFunc} style="play" />)
    const button = screen.getByRole('button')
    userEvent.click(button)
    expect(clickFunc).toHaveBeenCalled()
  })
})

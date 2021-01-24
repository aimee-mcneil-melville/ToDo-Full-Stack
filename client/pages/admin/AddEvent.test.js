import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AddEvent from './AddEvent'
import { addEvent } from './addEventHelper'

jest.mock('./addEventHelper')

describe('submit button', () => {
  it('calls addEvent helper on click', () => {
    const fakeHistory = {
      push: () => {}
    }
    addEvent.mockImplementation((event, navigateTo) => {
      expect(navigateTo).toBe(fakeHistory.push)
      expect(event).toHaveProperty('title')
    })
    render(<AddEvent history={fakeHistory} />)
    const addButton = screen.getByRole('button')
    fireEvent.click(addButton)
    expect(addEvent).toHaveBeenCalled()
  })
})

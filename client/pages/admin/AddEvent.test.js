import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import AddEvent from './AddEvent'
import { addEvent } from './addEventHelper'

jest.mock('./addEventHelper')

test('calls addEvent with correct values on submit', () => {
  expect.assertions(5)
  const fakeHistory = {
    push: jest.fn()
  }
  addEvent.mockImplementation((event, navigateTo) => {
    expect(navigateTo).toBe(fakeHistory.push)
    expect(event).toHaveProperty('title')
    expect(event).toHaveProperty('date')
    expect(event).toHaveProperty('volunteersNeeded')
    expect(event).toHaveProperty('description')
  })
  const { getByRole } = render(<AddEvent history={fakeHistory} />)
  const addButton = getByRole('button')
  fireEvent.click(addButton)
})

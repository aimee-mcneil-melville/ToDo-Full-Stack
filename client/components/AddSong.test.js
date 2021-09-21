import React from 'react'
import { renderWithRedux } from '../testUtils'
import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react'

import AddSong from './AddSong'

test('Display text of h1 tag', () => {
  renderWithRedux(<AddSong/>,
    {
      initialEntries: ['/songs/add'],
      route: '/songs/add'
    })
  return screen.findByText('Add new song')
    .then(paragraph => {
      expect(paragraph).toBeVisible()
      return null
    })
})

test('Button has the right text content', () => {
  renderWithRedux(<AddSong/>)
  const button = screen.getByRole('button')
  expect(button.textContent).toEqual('Save')
})

test('Adding new song redirect to song listing', () => {
  expect.assertions(1)

  const history = {
    push: (path) => {
      expect(path).toBe('/songs')
    }
  }
  // render <App />
  renderWithRedux(
    <AddSong history={history}/>
  )

  // click the button
  fireEvent.click(screen.getByRole('button'))
})

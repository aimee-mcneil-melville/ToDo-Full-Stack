import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'

import reducer from './reducers'

export function renderWithRouter (
  ui,
  {
    initialEntries = ['/']
  } = {}
) {
  return {
    ...render(
      <Router initialEntries={initialEntries} initialIndex={0}>
        {ui}
      </Router>
    )
  }
}

export function renderWithRedux (
  ui,
  {
    initialState,
    initialEntries = ['/'],
    store = createStore(reducer, initialState)
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router initialEntries={initialEntries} initialIndex={0}>
          {ui}
        </Router>
      </Provider>
    ),
    store
  }
}

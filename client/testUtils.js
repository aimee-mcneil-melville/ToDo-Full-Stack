import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { render } from '@testing-library/react'
import reducer from './reducers'

export function renderWithRedux (
  ui,
  {
    initialEntries = ['/'],
    route = '/',
    initialState,
    store = createStore(reducer, initialState)
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router initialEntries={initialEntries} initialIndex={0}>
          <Route path={route}>
            {ui}
          </Route>
        </Router>
      </Provider>
    ),
    store
  }
}

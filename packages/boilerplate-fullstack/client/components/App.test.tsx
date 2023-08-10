// @vitest-environment jsdom
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import { test, expect, vi} from 'vitest'

import App from './App.tsx'
import store from '../store.ts'
import { fetchFruits } from '../actions/index.ts'

vi.mock('../actions')

vi
  .mocked(fetchFruits)
  .mockImplementation(() => async () => {})

test('page header includes fruit', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const heading = screen.getByRole('heading')
  expect(heading.innerHTML).toMatch(/Fruit/)
})

test('renders an <li> for each fruit', () => {
  const fruits = ['orange', 'persimmons', 'kiwi fruit']
  vi.spyOn(store, 'getState')
  vi.mocked(store).getState.mockImplementation(() => ({ fruits }))

  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const li = screen.getAllByRole('listitem')
  expect(li).toHaveLength(3)
})

test('dispatches fetchFruits action', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(fetchFruits).toHaveBeenCalled()
})

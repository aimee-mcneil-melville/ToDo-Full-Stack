import { configureStore } from '@reduxjs/toolkit'
import wombats from './reducers/wombats'

const store = configureStore({
  reducers: {
    wombats,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }

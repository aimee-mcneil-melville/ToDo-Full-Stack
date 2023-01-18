import { configureStore } from '@reduxjs/toolkit'

import machine from './slices/machine'

const store = configureStore({
  reducer: {
    machine,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

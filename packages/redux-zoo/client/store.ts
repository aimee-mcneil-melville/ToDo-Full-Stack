import { createStore } from 'redux'
import reducers from './reducers'
import { devToolsEnhancer } from '@redux-devtools/extension'

export function initialiseStore() {
  return createStore(reducers, devToolsEnhancer())
}

const store = initialiseStore()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }

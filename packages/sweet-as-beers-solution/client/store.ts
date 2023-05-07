import { createStore } from 'redux'
import { devToolsEnhancer } from '@redux-devtools/extension'
import reducers from './reducers'

export function initialiseStore() {
  return createStore(reducers, devToolsEnhancer())
}

const store = initialiseStore()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }

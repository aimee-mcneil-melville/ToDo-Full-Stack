import { createStore } from 'redux'
import reducers from './reducers'
import { devToolsEnhancer } from '@redux-devtools/extension'

const store = createStore(reducers, devToolsEnhancer())
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }

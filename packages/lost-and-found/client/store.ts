/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import type { ThunkDispatch, ThunkAction } from 'redux-thunk'
import reducers from './reducers'
import type { Action } from './actions/auth'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, Action>
export type AppThunkAction<T = any> = ThunkAction<T, RootState, never, Action>

export default store

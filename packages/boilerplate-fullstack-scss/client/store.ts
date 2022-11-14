import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import type { Action } from './actions'
import type { ThunkDispatch, ThunkAction as BaseThunkAction } from 'redux-thunk'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, Action>
export type ThunkAction = BaseThunkAction<
  Promise<unknown>,
  RootState,
  never,
  Action
>
export default store

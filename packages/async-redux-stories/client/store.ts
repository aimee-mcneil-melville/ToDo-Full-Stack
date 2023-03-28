import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

import type { ThunkAction as BaseThunkAction } from 'redux-thunk'
import type { AnyAction } from 'redux'

import reducers from './reducers'

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type ThunkAction<T = void> = BaseThunkAction<
  Promise<T>,
  RootState,
  void,
  AnyAction
>

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store

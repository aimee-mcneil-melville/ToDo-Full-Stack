import { configureStore } from '@reduxjs/toolkit'

import products from './slices/products'
import errorMessage from './slices/errorMessage'
import cart from './slices/cart'
import waiting from './slices/waiting'

export const store = configureStore({
  reducer: {
    cart,
    products,
    errorMessage,
    waiting,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

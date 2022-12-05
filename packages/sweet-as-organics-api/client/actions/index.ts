import type { CartAction } from './cart'
import type { ErrorAction } from './error'
import type { ProductAction } from './products'

export type AppAction = CartAction | ErrorAction | ProductAction

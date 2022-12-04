import type * as cart from './cart'
import type * as error from './error'
import type * as products from './products'

export type Action = cart.Action | error.Action | products.Action

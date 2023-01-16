import type { UIEvent } from 'react'

type Cart = { id: number; name: string; quantity: number }[]
type Product = { id: number; name: string }

export function addToCart(cart: Cart, product: Product) {
  const match = cart.map((item) =>
    item.id === product.id
      ? { ...item, quantity: Number(item.quantity) + 1 }
      : item
  )
  const newItem = { ...product, quantity: 1 }
  const updatedCart = [...cart, newItem]
  if (cart.find((item) => item.id === product.id)) {
    return match
  } else {
    return updatedCart
  }
}

export function updateCart(
  e: UIEvent<HTMLInputElement>,
  item: Product,
  setCart: (cart: Cart) => void,
  cart: Cart
) {
  const newQuantity = e.currentTarget.value
  const newCart = cart.map((product) =>
    product.id === item.id
      ? { ...product, quantity: Number(newQuantity) }
      : product
  )
  setCart(newCart)
}

export function addToCart(cart, product) {
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

export function updateCart(e, item, setCart, cart) {
  const newQuantity = e.target.value
  const newCart = cart.map((product) =>
    product.id === item.id ? { ...product, quantity: newQuantity } : product
  )
  setCart(newCart)
}

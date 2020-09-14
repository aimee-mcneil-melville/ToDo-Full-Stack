export function addCartItem (item, history, addToCart) {
  addToCart(item)
  history.push('/cart')
}

export function updateCartItem (updatedInfo, cart, updateCart) {
  const { id, quantity } = updatedInfo
  const newCart = cart.map(item => {
    const newQuantity = (item.id === id) ? Number(quantity) : item.quantity
    return { ...item, quantity: newQuantity }
  })
  updateCart(newCart)
  return newCart
}

export function deleteCartItem (id, cart, deleteFromCart) {
  const newCart = cart.filter(item => item.id !== id)
  deleteFromCart(id)
  return newCart
}

export function createOrder (cart) {
  return cart.map(item => {
    return {
      id: item.id,
      quantity: item.quantity
    }
  })
}

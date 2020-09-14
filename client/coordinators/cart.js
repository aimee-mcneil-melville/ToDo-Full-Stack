export function addCartItem (product, history, addToCart) {
  const { id, quantity, name } = product
  const newCartItem = { id, quantity, name }
  addToCart(newCartItem)
  history.push('/cart')
}

export function updateCartItem (updatedInfo, cart, updateCart) {
  const { id, quantity } = updatedInfo
  const newCart = cart.map(item => {
    const newQuantity = (item.id === id) ? Number(quantity) : item.quantity
    return { ...item, quantity: newQuantity }
  })
  updateCart(newCart)
}

export function createOrder (cart) {
  return cart.map(item => {
    return {
      id: item.id,
      quantity: item.quantity
    }
  })
}

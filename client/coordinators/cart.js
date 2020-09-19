export function addCartItem (product, history, addToCart) {
  const { id, name } = product
  const newCartItem = { id, name }
  addToCart(newCartItem)
  history.push('/cart')
}

export function updateCartItem (updatedInfo, cart, updateCart) {
  const isValid = !isNaN(Number(updatedInfo.quantity))
  if (isValid) {
    const newCart = createUpdatedCart(updatedInfo, cart)
    updateCart(newCart)
  }
}

function createUpdatedCart (updatedInfo, cart) {
  const { id, quantity } = updatedInfo
  return cart.map(item => {
    const newQuantity = (item.id === id) ? Number(quantity) : item.quantity
    return { ...item, quantity: newQuantity }
  })
}

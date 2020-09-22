export function addCartItem (product, history, addToCart) {
  const { id, name } = product
  const newCartItem = { id, name }
  addToCart(newCartItem)
  history.push('/cart')
}

export function updateCartItem (updateInfo, updateCartDispatcher) {
  const isValid = !isNaN(Number(updateInfo.quantity))
  isValid && updateCartDispatcher(updateInfo)
}

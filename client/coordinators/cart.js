export function updateCartItem (updateInfo, updateCartDispatcher) {
  const isValid = !isNaN(Number(updateInfo.quantity))
  isValid && updateCartDispatcher(updateInfo)
}

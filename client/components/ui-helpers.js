import { addOrder } from '../api-helpers'

export const placeOrder = (cart, history, dispatch) => {
  return addOrder(cart, dispatch)
    .then(() => history.push('/orders'))
}

export const deleteCartItem = (id, cart, componentThis) => {
  const newCart = cart.filter(item => item.id !== id)
  componentThis.setState({ cart: newCart })
  componentThis.props.deleteFromCart(id)
}

export const updateCartItem = (updatedInfo, cart, componentThis) => {
  const { id, quantity } = updatedInfo
  const newCart = cart.map(item => {
    const newQuantity = (item.id === id) ? Number(quantity) : item.quantity
    return { ...item, quantity: newQuantity }
  })
  componentThis.setState({ cart: newCart })
  componentThis.props.updateCart(newCart)
}

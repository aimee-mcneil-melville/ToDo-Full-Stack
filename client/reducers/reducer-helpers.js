/*
 * Returns a new cart array.
 * If the id already exists, the quantity will be incremented.
 * If the id doesn't exists, it will be added with a quantity of 1.
 */
export function getNewCart (cart, product) {
  let exists = false
  const newCart = cart.map(item => {
    if (item.id === product.id) {
      item.quantity += 1
      exists = true
    }
    return item
  })

  if (exists) {
    return newCart
  } else {
    newCart.push({ ...product, quantity: 1 })
    return newCart
  }
}

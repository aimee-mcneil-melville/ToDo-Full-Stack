import requestor from '../consume'

export function getProducts (dispatchers, consume = requestor) {
  const { fetchProductsPending, fetchProductsSuccess, showError } = dispatchers
  fetchProductsPending()
  return consume('/products')
    .then(res => {
      const products = res.body
      fetchProductsSuccess(products)
      return null
    })
    .catch(err => {
      showError(err.message)
    })
}

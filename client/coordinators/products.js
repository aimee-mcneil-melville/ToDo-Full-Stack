import requestor from '../consume'

export function getProducts (dispatchers, consume = requestor) {
  const { fetchProductsPending, fetchProductsSuccess, showError } = dispatchers
  fetchProductsPending()
  return consume('/products')
    .then(res => {
      const products = res.body
      fetchProductsSuccess(products)
    })
    .catch(err => {
      showError(err.message)
    })
}

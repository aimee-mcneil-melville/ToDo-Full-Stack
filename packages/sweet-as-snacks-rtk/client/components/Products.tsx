import sample from '../products'
import ProductItem from './ProductItem'

function Products() {
  // TODO: use the products from global state
  const products = sample

  return (
    <ul className="flex flex-row flex-wrap justify-center mt-10">
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem {...product} />
        </li>
      ))}
    </ul>
  )
}

export default Products

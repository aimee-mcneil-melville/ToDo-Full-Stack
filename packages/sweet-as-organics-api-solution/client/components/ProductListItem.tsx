<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/components/ProductListItem.tsx
import { Product } from '../../common/interfaces'

interface Props {
  addToCart: (product: Product) => void
  product: Product
}
=======
import type { Product } from '../../common/Product'

interface Props {
  product: Product
  addToCart: (product: { id: number; name: string }) => void
}

function ProductListItem(props: Props) {
  const product = props.product

  function addToCart() {
    props.addToCart(product)
  }
>>>>>>> main:packages/sweet-as-organics-api/client/components/ProductListItem.tsx

function ProductListItem({ addToCart, product }: Props) {
  return (
    <div className="product">
      <p className="name">{product.name}</p>
      <p className="description">{product.description}</p>
      <p>
        <span className="country">Lovingly made in {product.country}</span>
        <button className="cart-link" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </p>
    </div>
  )
}

export default ProductListItem

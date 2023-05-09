import { Product } from '../../models/product'

interface Props {
  addToCart: (product: Product) => void
  product: Product
}

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

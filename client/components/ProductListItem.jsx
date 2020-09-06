import React from 'react'

const ProductListItem = (props) => {
  const product = props.product
  return (
    <div className='product'>
      <p className='name'>{product.name}</p>
      <p className='description'>{product.description}</p>
      <p>
        <span className='country'>Lovingly made in {product.country}</span>
        <a href='#'
          className='cart-link'
          onClick={() => props.addToCart(product)}>Add to cart</a>
      </p>
    </div>
  )
}

export default ProductListItem

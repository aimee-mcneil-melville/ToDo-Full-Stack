import React from 'react'

function ProductListItem (props) {
  const product = props.product

  function addToCart () {
    props.addToCart(product)
  }

  return (
    <div className='product'>
      <p className='name'>{product.name}</p>
      <p className='description'>{product.description}</p>
      <p>
        <span className='country'>Lovingly made in {product.country}</span>
        <button
          className='cart-link'
          onClick={addToCart}>Add to cart</button>
      </p>
    </div>
  )
}

export default ProductListItem

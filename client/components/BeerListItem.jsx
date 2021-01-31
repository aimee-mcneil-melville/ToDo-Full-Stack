import React from 'react'

function BeerListItem (props) {
  const { name, brewery, country, abv } = props.beer
  return (
    <div className='beer'>
      <p className='name'>{name}</p>
      <p className='description'>{brewery}</p>
      <p>
        <span className='country'>{country}</span>
        <span className='abv'>{abv} abv</span>
        <a href='#' className='cart-link'>Add to cart</a>
      </p>
    </div>
  )
}

export default BeerListItem

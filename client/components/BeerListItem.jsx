import React from 'react'

function BeerListItem (props) {
  const beer = props.beer
  return (
    <div className='beer'>
      <p className='name'>{beer.name}</p>
      <p className='description'>{beer.brewery}</p>
      <p>
        <span className='country'>{beer.country}</span>
        <span className='abv'>{beer.abv} abv</span>
        <a href='#' className='cart-link'>Add to cart</a>
      </p>
    </div>
  )
}

export default BeerListItem

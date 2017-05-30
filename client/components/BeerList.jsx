import React from 'react'

import BeerListItem from './BeerListItem'

const BeerList = (props) => {
  return (
    <div className='beerlist'>
      <p className='welcome'>Welcome! Please select from our delicious selection and don't hesitate to let us know if we can answer any of your questions.</p>
      {props.beers.map(beer => {
        return (
          <BeerListItem key={beer.id} beer={beer} addToCart={props.addToCart} />
        )
      })}
    </div>
  )
}

export default BeerList

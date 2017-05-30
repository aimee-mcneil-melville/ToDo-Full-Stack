import React from 'react'

import beerData from '../../data/beers'

const Cart = (props) => {
  return (
    <div className='cart'>
      <table>
        <thead>
          <tr>
            <td>Beer</td>
            <td>Quantity</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {props.cart.map((item, id) => {
            const name = getNameFromId(item.id)
            return (
              <tr key={id}>
                <td>{name}</td>
                <td><input className='update-input' value={item.quantity} /></td>
                <td><button><span className='fa fa-trash fa-2x' /></button></td>
                {/* TODO: implement deletes */}
              </tr>
            )
          })}
        </tbody>
      </table>

      <p className='actions'>
        <a href='#' onClick={props.keepShopping}>Continue shopping</a>
        <button>Update</button> {/* TODO: implement updates */}
        <button className='button-primary'>Checkout</button>
      </p>
    </div>
  )
}

function getNameFromId (id) {
  const beer = beerData.beers.find(beer => beer.id === id)
  return beer.name
}

export default Cart

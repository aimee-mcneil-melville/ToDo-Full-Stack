import React from 'react'

import beerData from '../../data/beers'

function Cart (props) {
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
          {props.cart.map(({ id, quantity }) => {
            return (
              <tr key={id}>
                <td>{getNameFromId(id)}</td>
                <td><input className='update-input' value={quantity} /></td>
                <td><button><span className='fa fa-trash fa-2x' /></button></td>
                {/* TODO: implement deletes */}
              </tr>
            )
          })}
        </tbody>
      </table>

      <p className='actions'>
        <a href='#'>Continue shopping</a>
        <button>Update</button> {/* TODO: implement updates */}
        <button className='button-primary'>Checkout</button>
      </p>
    </div>
  )
}

function getNameFromId (id) {
  return beerData.beers.find((beer) => beer.id === id).name
}

export default Cart

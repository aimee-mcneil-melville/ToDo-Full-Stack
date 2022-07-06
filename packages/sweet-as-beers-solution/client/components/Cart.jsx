import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { navigate, trashBeer, updateMultiple } from '../actions'

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [changes, setChanges] = useState({})

  const goBack = () => {
    dispatch(navigate('home'))
  }

  const remove = (id) => {
    dispatch(trashBeer(id))
  }

  const saveChanges = () => {
    dispatch(updateMultiple(changes))
  }

  const handleType = (id, evt) => {
    setChanges({
      ...changes,
      [id]: Number(evt.target.value),
    })
  }

  return (
    <div className="cart">
      <table>
        <thead>
          <tr>
            <td>Beer</td>
            <td>Quantity</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {cart.map(({ id, name, quantity }) => {
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  <input
                    className="update-input"
                    onChange={(e) => handleType(id, e)}
                    value={changes[id] || quantity}
                  />
                </td>
                <td>
                  <button onClick={() => remove(id)}>
                    <span className="fa fa-trash fa-2x" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <p className="actions">
        <a onClick={goBack}>Continue shopping</a>
        <button onClick={saveChanges}>Update</button>
        <button className="button-primary">Checkout</button>
      </p>
    </div>
  )
}

export default Cart

import { useState, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'

import { navigate, trashBeer, updateMultiple } from '../actions'

interface ChangeItem {
  id: number
  quantity: number
}

function Cart() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)
  const [changes, setChanges] = useState([] as ChangeItem[])

  const goBack = () => {
    dispatch(navigate('home'))
  }

  const remove = (id: number) => {
    dispatch(trashBeer(id))
  }

  const saveChanges = () => {
    dispatch(updateMultiple(changes))
  }

  const handleType = (id: number, evt: ChangeEvent<HTMLInputElement>) => {
    setChanges([...changes, { id: id, quantity: Number(evt.target.value) }])
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
                    value={
                      changes.find((item) => item.id === id)?.quantity ||
                      quantity
                    }
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

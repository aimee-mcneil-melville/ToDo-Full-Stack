import { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from '../slices/activePage'
import { selectCart, updateQuantity } from '../slices/cart'

function Cart() {
  const cart = useSelector(selectCart)
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(navigate({ page: 'home' }))
  }

  function handleChange(e: FormEvent, id: number) {
    const target = e.target as HTMLInputElement
    const quantity = parseInt(target.value)
    if (!isNaN(quantity)) {
      dispatch(updateQuantity({ id, quantity }))
    }
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
                    value={quantity}
                    onChange={(e: FormEvent) => handleChange(e, id)}
                  />
                </td>
                {/* TODO: implement deletes */}
                <td>
                  <button>
                    <span className="fa fa-trash fa-2x" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <p className="actions">
        <a onClick={handleClick}>Continue shopping</a>
        <button>Update</button> {/* TODO: implement updates */}
        <button className="button-primary">Checkout</button>
      </p>
    </div>
  )
}

export default Cart

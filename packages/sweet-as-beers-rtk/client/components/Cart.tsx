import { Beer } from './BeerList'

type CartItem = Pick<Beer, 'id' | 'name'> & { quantity: number }

function Cart() {
  const cart: CartItem[] = []

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
                  <input className="update-input" value={quantity} />
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
        <a>Continue shopping</a> {/* TODO: implement */}
        <button>Update</button> {/* TODO: implement */}
        <button className="button-primary">Checkout</button>
      </p>
    </div>
  )
}

export default Cart

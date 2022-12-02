import { useDispatch, useSelector } from 'react-redux'

import { addBeer, updateBeerAmount, navigate } from '../actions'

function BeerListItem(props) {
  const { id, name, brewery, country, abv } = props.beer
  const dispatch = useDispatch()

  const beerInCart = useSelector((state) =>
    state.cart.find((item) => item.id === id)
  )

  const handleClick = () => {
    const cartAction = !beerInCart
      ? addBeer(id, name)
      : updateBeerAmount(id, beerInCart.quantity + 1)

    dispatch(cartAction)
    dispatch(navigate('cart'))
  }

  return (
    <div className="beer">
      <p className="name">{name}</p>
      <p className="description">{brewery}</p>
      <p>
        <span className="country">{country}</span>
        <span className="abv">{abv} abv</span>
        <a onClick={handleClick} className="cart-link">
          Add to cart
        </a>
      </p>
    </div>
  )
}

export default BeerListItem

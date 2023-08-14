interface Props {
  beer: {
    id: number
    name: string
    brewery: string
    country: string
    style: string
    abv: string
  }
}

import { useAppDispatch, useAppSelector } from '../hooks.ts'

import { addBeer, updateBeerAmount, navigate } from '../actions/index.ts'

function BeerListItem(props: Props) {
  const { id, name, brewery, country, abv } = props.beer
  const dispatch = useAppDispatch()

  const beerInCart = useAppSelector((state) =>
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

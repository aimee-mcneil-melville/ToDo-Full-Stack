import type { Beer } from './BeerList'
import { useDispatch } from 'react-redux'
import { navigate } from '../slices/activePage'
import { addToCart } from '../slices/cart'
interface Props {
  beer: Beer
}

function BeerListItem(props: Props) {
  const { name, brewery, country, abv } = props.beer
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(navigate({ page: 'cart' }))
    dispatch(addToCart({ cartItem: props.beer }))
  }

  return (
    <div className="beer">
      <p className="name">{name}</p>
      <p className="description">{brewery}</p>
      <p>
        <span className="country">{country}</span>
        <span className="abv">{abv} abv</span>
        <a className="cart-link" onClick={handleClick}>
          Add to cart
        </a>
      </p>
    </div>
  )
}

export default BeerListItem

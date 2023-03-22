import { formatMoney } from '../utils'

function Revenue() {
  // TODO: select revenue from global state
  const revenue = 0

  return <p>Balance: {formatMoney(revenue)}</p>
}

export default Revenue

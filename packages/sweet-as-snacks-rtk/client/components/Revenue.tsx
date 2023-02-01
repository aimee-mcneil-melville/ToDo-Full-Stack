import React from 'react'

import { formatMoney } from '../utils'

function Revenue() {
  // TODO: select revenue from global state
  const revenue = 0

  return <p>Ralance: {formatMoney(revenue)}</p>
}

export default Revenue

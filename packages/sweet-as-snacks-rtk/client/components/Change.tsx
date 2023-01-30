import React from 'react'

import { formatMoney } from '../utils'

function Change() {
  // TODO: select the change value from global state
  const change = 0

  return (
    <section className="text-center">
      <p className="text-4xl cursor-default">CHANGE</p>
      <p className="text-4xl cursor-default">{formatMoney(change)}</p>
    </section>
  )
}

export default Change

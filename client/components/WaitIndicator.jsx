import React from 'react'
import { useSelector } from 'react-redux'

function WaitIndicator () {
  const waiting = useSelector(globalState => globalState.waiting)

  return <p className="waitIndicator"> { waiting ? 'loading...' : '\u00a0' }</p>
}

export default WaitIndicator

import React from 'react'
import { useSelector } from 'react-redux'

function WaitIndicator () {
  const waiting = useSelector(globalState => globalState.waiting)

  return (
    <>
      <div className="waitIndicator">
        { waiting
          ? <>
            <img src="/images/loadingv2.png" alt="loading indicator" className="waitIndicator--img"/>
            <img src="/images/loadingv2.png" alt="loading indicator" className="waitIndicator--img"/>
            <img src="/images/loadingv2.png" alt="loading indicator" className="waitIndicator--img"/>
          </>
          : '\u00a0' }
      </div>
    </>
  )
}

export default WaitIndicator

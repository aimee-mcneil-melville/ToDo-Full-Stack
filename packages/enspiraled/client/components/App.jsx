import React from 'react'

function App(props) {
  const circle = {
    cx: props.width / 2,
    cy: props.height / 2,
    level: 0,
    r: 256,
  }

  return (
    <svg width={props.width} height={props.height}>
      <circle cx={circle.cx} cy={circle.cy} r={circle.r} />
    </svg>
  )
}

export default App
